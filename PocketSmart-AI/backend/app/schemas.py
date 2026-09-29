from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field

class Expense(BaseModel):
    category: str = Field(min_length=1, max_length=60)
    amount: float = Field(ge=0)

class BudgetRequest(BaseModel):
    currency: str = Field(default="INR", min_length=1, max_length=8)
    monthly_income: float = Field(gt=0)
    savings_goal: float = Field(ge=0)
    expenses: list[Expense] = Field(default_factory=list)
    notes: str = Field(default="", max_length=1000)

class CategoryRecommendation(BaseModel):
    category: str
    current_amount: float
    suggested_amount: float
    reason: str

class BudgetRecommendation(BaseModel):
    summary: str
    recommended_savings: float
    recommended_spending_limit: float
    categories: list[CategoryRecommendation]
    tips: list[str]
    warnings: list[str]

class BudgetAnalysis(BaseModel):
    currency: str
    monthly_income: float
    savings_goal: float
    total_expenses: float
    remaining_before_savings: float
    projected_after_goal: float
    recommendation: BudgetRecommendation
    demo_mode: bool

class SavedPlan(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    currency: str
    monthly_income: float
    savings_goal: float
    total_expenses: float
    remaining: float
    created_at: datetime
    result: BudgetRecommendation


class RegisterRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: str = Field(min_length=5, max_length=160)
    password: str = Field(min_length=6, max_length=128)

class LoginRequest(BaseModel):
    email: str = Field(min_length=5, max_length=160)
    password: str = Field(min_length=1, max_length=128)

class UserResponse(BaseModel):
    id: int
    name: str
    email: str

class AuthResponse(BaseModel):
    token: str
    user: UserResponse

class SavedPlannerRequest(BaseModel):
    scenario: str = Field(min_length=1, max_length=40)
    title: str = Field(min_length=1, max_length=120)
    inputs: dict = Field(default_factory=dict)
    result: list[dict] = Field(default_factory=list)

class SavedPlannerResponse(BaseModel):
    id: int
    scenario: str
    title: str
    inputs: dict
    result: list[dict]
    created_at: datetime
