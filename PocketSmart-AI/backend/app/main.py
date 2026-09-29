import hashlib
import hmac
import json
import secrets
from fastapi import Depends, FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .ai import generate_recommendation
from .config import get_settings
from .database import get_db, init_db
from .models import BudgetPlan, User, SavedPlanner, AuthSession
from .schemas import (
    BudgetAnalysis, BudgetRecommendation, BudgetRequest, SavedPlan,
    RegisterRequest, LoginRequest, AuthResponse, UserResponse,
    SavedPlannerRequest, SavedPlannerResponse
)

settings = get_settings()
app = FastAPI(title="PocketSmart AI API", version="1.1.0")
app.add_middleware(
    CORSMiddleware, allow_origins=settings.cors_origin_list,
    allow_credentials=True, allow_methods=["*"], allow_headers=["*"]
)


def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 120000)
    return f"{salt.hex()}:{digest.hex()}"

def verify_password(password: str, stored: str) -> bool:
    try:
        salt_hex, digest_hex = stored.split(":", 1)
        digest = hashlib.pbkdf2_hmac("sha256", password.encode(), bytes.fromhex(salt_hex), 120000)
        return hmac.compare_digest(digest.hex(), digest_hex)
    except Exception:
        return False

def current_user(authorization: str | None = Header(default=None), db: Session = Depends(get_db)) -> User:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Please sign in first.")
    token = authorization.split(" ", 1)[1].strip()
    session = db.get(AuthSession, token)
    if not session:
        raise HTTPException(status_code=401, detail="Session expired. Please sign in again.")
    user = db.get(User, session.user_id)
    if not user:
        raise HTTPException(status_code=401, detail="User account not found.")
    return user

@app.on_event("startup")
def startup():
    init_db()

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "PocketSmart AI", "ai_configured": bool(settings.gemini_api_key.strip())}

@app.post("/api/auth/register", response_model=AuthResponse)
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    email = payload.email.strip().lower()
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(status_code=409, detail="An account with this email already exists.")
    user = User(name=payload.name.strip(), email=email, password_hash=hash_password(payload.password))
    db.add(user); db.commit(); db.refresh(user)
    token = secrets.token_urlsafe(32); db.add(AuthSession(token=token, user_id=user.id)); db.commit()
    return AuthResponse(token=token, user=UserResponse(id=user.id, name=user.name, email=user.email))

@app.post("/api/auth/login", response_model=AuthResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    email = payload.email.strip().lower()
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Incorrect email or password.")
    token = secrets.token_urlsafe(32); db.add(AuthSession(token=token, user_id=user.id)); db.commit()
    return AuthResponse(token=token, user=UserResponse(id=user.id, name=user.name, email=user.email))

@app.get("/api/auth/me", response_model=UserResponse)
def me(user: User = Depends(current_user)):
    return UserResponse(id=user.id, name=user.name, email=user.email)

@app.post("/api/budget/analyze", response_model=BudgetAnalysis)
def analyze_budget(payload: BudgetRequest):
    total = round(sum(x.amount for x in payload.expenses), 2)
    remaining = round(payload.monthly_income - total, 2)
    projected = round(remaining - payload.savings_goal, 2)
    recommendation, demo_mode = generate_recommendation(payload.model_dump())
    return BudgetAnalysis(currency=payload.currency, monthly_income=payload.monthly_income, savings_goal=payload.savings_goal, total_expenses=total, remaining_before_savings=remaining, projected_after_goal=projected, recommendation=recommendation, demo_mode=demo_mode)

@app.post("/api/plans", response_model=SavedPlan)
def save_plan(payload: BudgetAnalysis, db: Session = Depends(get_db), user: User = Depends(current_user)):
    row = BudgetPlan(user_id=user.id, currency=payload.currency, monthly_income=payload.monthly_income, savings_goal=payload.savings_goal, total_expenses=payload.total_expenses, remaining=payload.remaining_before_savings, request_json=json.dumps({"currency": payload.currency, "monthly_income": payload.monthly_income, "savings_goal": payload.savings_goal}), result_json=payload.recommendation.model_dump_json())
    db.add(row); db.commit(); db.refresh(row)
    return SavedPlan(id=row.id, currency=row.currency, monthly_income=row.monthly_income, savings_goal=row.savings_goal, total_expenses=row.total_expenses, remaining=row.remaining, created_at=row.created_at, result=payload.recommendation)

@app.get("/api/plans", response_model=list[SavedPlan])
def list_plans(db: Session = Depends(get_db), user: User = Depends(current_user)):
    rows = db.query(BudgetPlan).filter(BudgetPlan.user_id == user.id).order_by(BudgetPlan.created_at.desc()).all()
    return [SavedPlan(id=r.id, currency=r.currency, monthly_income=r.monthly_income, savings_goal=r.savings_goal, total_expenses=r.total_expenses, remaining=r.remaining, created_at=r.created_at, result=BudgetRecommendation.model_validate_json(r.result_json)) for r in rows]

@app.post("/api/saved-planners", response_model=SavedPlannerResponse)
def save_planner(payload: SavedPlannerRequest, db: Session = Depends(get_db), user: User = Depends(current_user)):
    row = SavedPlanner(user_id=user.id, scenario=payload.scenario, title=payload.title, input_json=json.dumps(payload.inputs), result_json=json.dumps(payload.result))
    db.add(row); db.commit(); db.refresh(row)
    return SavedPlannerResponse(id=row.id, scenario=row.scenario, title=row.title, inputs=payload.inputs, result=payload.result, created_at=row.created_at)

@app.get("/api/saved-planners", response_model=list[SavedPlannerResponse])
def saved_planners(db: Session = Depends(get_db), user: User = Depends(current_user)):
    rows = db.query(SavedPlanner).filter(SavedPlanner.user_id == user.id).order_by(SavedPlanner.created_at.desc()).all()
    return [SavedPlannerResponse(id=r.id, scenario=r.scenario, title=r.title, inputs=json.loads(r.input_json), result=json.loads(r.result_json), created_at=r.created_at) for r in rows]

@app.get("/api/saved-planners/{plan_id}", response_model=SavedPlannerResponse)
def saved_planner(plan_id: int, db: Session = Depends(get_db), user: User = Depends(current_user)):
    row = db.query(SavedPlanner).filter(SavedPlanner.id == plan_id, SavedPlanner.user_id == user.id).first()
    if not row: raise HTTPException(status_code=404, detail="Saved plan not found.")
    return SavedPlannerResponse(id=row.id, scenario=row.scenario, title=row.title, inputs=json.loads(row.input_json), result=json.loads(row.result_json), created_at=row.created_at)

@app.delete("/api/saved-planners/{plan_id}")
def delete_saved_planner(plan_id: int, db: Session = Depends(get_db), user: User = Depends(current_user)):
    row = db.query(SavedPlanner).filter(SavedPlanner.id == plan_id, SavedPlanner.user_id == user.id).first()
    if not row: raise HTTPException(status_code=404, detail="Saved plan not found.")
    db.delete(row); db.commit()
    return {"message": "Saved plan deleted", "id": plan_id}

@app.get("/api/plans/{plan_id}", response_model=SavedPlan)
def get_plan(plan_id: int, db: Session = Depends(get_db), user: User = Depends(current_user)):
    row = db.query(BudgetPlan).filter(BudgetPlan.id == plan_id, BudgetPlan.user_id == user.id).first()
    if not row: raise HTTPException(status_code=404, detail="Plan not found")
    return SavedPlan(id=row.id, currency=row.currency, monthly_income=row.monthly_income, savings_goal=row.savings_goal, total_expenses=row.total_expenses, remaining=row.remaining, created_at=row.created_at, result=BudgetRecommendation.model_validate_json(row.result_json))

@app.delete("/api/plans/{plan_id}")
def delete_plan(plan_id: int, db: Session = Depends(get_db), user: User = Depends(current_user)):
    row = db.query(BudgetPlan).filter(BudgetPlan.id == plan_id, BudgetPlan.user_id == user.id).first()
    if not row: raise HTTPException(status_code=404, detail="Plan not found")
    db.delete(row); db.commit(); return {"message": "Plan deleted", "id": plan_id}
