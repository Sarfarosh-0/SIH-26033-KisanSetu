# KisanSetu Backend — Direct Farmer-to-Consumer Agri-Marketplace
**Enterprise Digital Agricultural Exchange Engine**

Production-ready backend API built with **Python 3.10+**, **FastAPI**, **SQLAlchemy** (PostgreSQL / SQLite), and **Scikit-learn** for AI-based fair pricing and logistics route optimization.

---

## Tech Stack
- **API Framework**: FastAPI 0.110+ (Async, OpenAPI 3.0 auto-documentation)
- **Database ORM**: SQLAlchemy 2.0+ (Supports SQLite out-of-the-box and PostgreSQL via `DATABASE_URL`)
- **Validation**: Pydantic v2
- **Machine Learning**: Scikit-learn (Multi-feature regressor predicting fair price confidence ranges `[Min, Target, Max]` based on APMC mandi benchmarks, quality grades, quantity, and seasonality)
- **Route Optimization**: 2-Stage Geodetic Nearest-Neighbor TSP solver for batched farm pickups

---

## Quickstart Guide

### 1. Create and Activate Virtual Environment
```bash
cd backend
python3 -m venv venv

# On Linux/macOS:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Database Configuration (Optional)
By default, the backend runs instantly on a local SQLite database (`agrimarket.db`).
To connect to a PostgreSQL instance, set the `DATABASE_URL` environment variable:
```bash
export DATABASE_URL="postgresql://user:password@localhost:5432/agrimarket_db"
```

### 4. Seed Database with Realistic Agri Datasets
Populates verified farmers, buyers, crop listings (Nashik Onions, Punjab Wheat, Guntur Chillies), APMC Mandi rates, and demo orders:
```bash
python seed_data.py
```

### 5. Launch FastAPI Server
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

---

## API Documentation & Endpoints

Open your browser at:
- **Interactive Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc Viewer**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

### Core Endpoint Summary:
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Role-based login (FARMER, BUYER, LOGISTICS, GOVT) |
| `GET` | `/api/listings` | Search and filter listings by crop, grade, location, organic |
| `POST` | `/api/listings` | Farmer creates listing with automated AI price benchmarks |
| `POST` | `/api/pricing/recommend` | AI Fair Price Engine predicting `[Min, Target, Max]` fair price |
| `GET` | `/api/pricing/mandi-compare/{crop}` | Side-by-side: Mandi rate vs. AI Fair Price vs. Buyer offers |
| `GET` | `/api/orders` | Fetch orders for farmer or buyer with status tracking |
| `POST` | `/api/orders` | Place direct farm-to-table order |
| `PATCH` | `/api/orders/{id}/status` | Progress order status (Placed → Confirmed → In-Transit → Delivered) |
| `POST` | `/api/payments/upi-verify` | Sandbox UPI payment verification with escrow holding |
| `GET` | `/api/logistics/routes` | Route optimization batching demo (distance & fuel savings) |
| `GET` | `/api/analytics/summary` | Real-time market metrics: farmer realization, intermediary savings |
