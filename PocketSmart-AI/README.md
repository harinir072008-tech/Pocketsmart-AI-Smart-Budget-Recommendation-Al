# PocketSmart AI — Smart Budget & Recommendation Assistant

A complete full-stack reference implementation built from the project title in the supplied documentation.

IMPORTANT: The supplied PDF contains the PocketSmart project title and a link to its detailed Google Doc, but that linked document was not accessible during generation. Therefore this implementation is based on the documented title and clearly stated assumptions, rather than pretending unseen requirements were available.

## Stack
- Frontend: React + Vite
- Backend: FastAPI + Pydantic
- Database: SQLite + SQLAlchemy
- AI: Google Gemini via the official `google-genai` Python SDK
- REST/JSON API

## Requirements
- Python 3.11+
- Node.js 20+
- npm
- Gemini API key for live AI mode

## Backend
```bash
cd backend
python -m venv .venv
```

Windows:
```bash
.venv\Scripts\activate
```

macOS/Linux:
```bash
source .venv/bin/activate
```

Install:
```bash
pip install -r requirements.txt
```

Copy `.env.example` to `.env` and add your key:
```env
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-2.5-flash
DATABASE_URL=sqlite:///./pocketsmart.db
CORS_ORIGINS=http://localhost:5173
```

Run:
```bash
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

## Frontend
Open another terminal:
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## Test
Backend:
```bash
cd backend
pytest
```

Frontend:
```bash
cd frontend
npm run build
```

## Features
1. Enter monthly income.
2. Set a savings goal.
3. Add expense categories and amounts.
4. Calculate totals automatically.
5. Generate a structured Gemini recommendation.
6. Show category recommendations, tips and warnings.
7. Save plans to SQLite.
8. View and delete saved plans.
9. Demo fallback works even without a Gemini key.

Keep the Gemini key only in the backend `.env`; never place it in React code.

## New account and saved-plan features

- Registration and sign-in are stored in the SQLite database.
- Passwords are stored as salted PBKDF2-SHA256 hashes rather than plain text.
- A persistent session token keeps the user signed in across backend restarts.
- Each saved planner entry belongs to the signed-in user.
- Users can save planner details before or after generating a recommendation.
- History shows the user's saved Home Interior, Party, and Jewelry plans.
- Jewelry recommendations are displayed as shopping-style product cards with image, price, rating, reason, and a reference link.

### Run

Backend:
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```
