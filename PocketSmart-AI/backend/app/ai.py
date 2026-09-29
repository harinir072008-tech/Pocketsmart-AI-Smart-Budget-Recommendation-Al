import json
from google import genai
from google.genai import types
from .config import get_settings
from .schemas import BudgetRecommendation

SYSTEM_PROMPT = """
You are PocketSmart, a responsible budgeting assistant.
Create a practical monthly budget recommendation from the user's numbers.
Do not provide investment, loan, tax, or other regulated financial advice.
Do not claim certainty. Encourage the user to adjust the plan to their real needs.
Prioritize essentials, a realistic savings target, and flexible spending.
Use the exact categories supplied by the user when possible.
Return only data matching the requested schema.
"""

def _demo_recommendation(data):
    income = float(data["monthly_income"])
    goal = float(data["savings_goal"])
    expenses = data["expenses"]
    total = sum(float(x["amount"]) for x in expenses)
    remaining = income - total
    feasible_goal = min(max(goal, 0), max(remaining, 0))
    spending_limit = max(income - feasible_goal, 0)

    categories = []
    for item in expenses:
        amount = float(item["amount"])
        suggested = amount * 0.9 if total > 0 and amount / total > 0.35 else amount
        categories.append({
            "category": item["category"],
            "current_amount": amount,
            "suggested_amount": round(suggested, 2),
            "reason": "Review this category if it is flexible; keep essential costs realistic."
        })

    warnings = []
    if remaining < goal:
        warnings.append("The current expenses leave less than the requested savings goal.")
    if total > income:
        warnings.append("Current expenses are higher than monthly income.")

    return BudgetRecommendation(
        summary=f"Your listed expenses total {total:.2f}. After expenses, about {remaining:.2f} remains before the savings goal.",
        recommended_savings=round(feasible_goal, 2),
        recommended_spending_limit=round(spending_limit, 2),
        categories=categories,
        tips=[
            "Separate essential expenses from flexible spending.",
            "Set aside the savings amount near the start of the month when practical.",
            "Review the plan after tracking actual spending for one month."
        ],
        warnings=warnings,
    )

def generate_recommendation(data):
    settings = get_settings()
    if not settings.gemini_api_key.strip():
        return _demo_recommendation(data), True

    client = genai.Client(api_key=settings.gemini_api_key)
    prompt = f"""
{SYSTEM_PROMPT}

Currency: {data["currency"]}
Monthly income: {data["monthly_income"]}
Savings goal: {data["savings_goal"]}
Expenses:
{json.dumps(data["expenses"], indent=2)}
Additional notes:
{data.get("notes", "")}

Generate a monthly budget recommendation.
"""
    try:
        response = client.models.generate_content(
            model=settings.gemini_model,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=BudgetRecommendation,
                temperature=0.2,
            ),
        )
        return BudgetRecommendation.model_validate_json(response.text), False
    except Exception:
        return _demo_recommendation(data), True
