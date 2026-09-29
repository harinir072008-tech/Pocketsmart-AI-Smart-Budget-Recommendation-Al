from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_analyze():
    response = client.post("/api/budget/analyze", json={
        "currency": "INR",
        "monthly_income": 30000,
        "savings_goal": 5000,
        "expenses": [
            {"category": "Food", "amount": 4000},
            {"category": "Travel", "amount": 3000}
        ],
        "notes": "College student"
    })
    assert response.status_code == 200
    body = response.json()
    assert body["total_expenses"] == 7000
    assert "recommendation" in body
