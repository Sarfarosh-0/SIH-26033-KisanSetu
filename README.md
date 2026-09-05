# 🌾 किसानSetu (KisanSetu)
### Direct Farmer-to-Consumer Digital Agri-Marketplace
**Smart India Hackathon (SIH 2026) | Problem Statement: SIH26033**

[![React](https://img.shields.io/badge/Frontend-React%2019%20%2B%20TypeScript-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Bundler-Vite%206-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%200.110%2B-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![Machine Learning](https://img.shields.io/badge/ML-Scikit--Learn-F7931E?logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![Database](https://img.shields.io/badge/Database-SQLite%20%2F%20PostgreSQL-336791?logo=postgresql&logoColor=white)](https://www.sqlalchemy.org/)

---

## 📌 Overview

**KisanSetu** ("Farmer's Bridge") is an open, transparent digital agricultural marketplace designed to transform how produce moves from Indian farms to buyers.

In traditional agricultural marketing, farm produce passes through 4 to 6 layers of intermediaries—including village aggregators, commission agents (*arhatiyas*), wholesale mandis, transport brokers, and local retailers. Because of this fragmented chain:
- **Farmers** receive only **30% to 50%** of the final retail price and frequently face distress selling due to lack of market information.
- **Buyers** (retail consumers, FPOs, hotels, restaurants, and food processors) pay inflated prices to cover middleman margins.
- **Perishable food crops** suffer **15% to 25% post-harvest transit wastage** due to unoptimized, uncoordinated logistics.

**KisanSetu bridges this gap** by empowering farmers to list and sell directly to verified institutional and retail buyers. Built-in Machine Learning fair-pricing algorithms ensure farmers receive fair, market-tested rates, while smart logistics route optimization minimizes transit costs and food spoilage.

---

## 🚀 Key Features

### 🌾 1. Direct Farmer-to-Buyer Marketplace
- **Direct Trading**: Eliminates intermediary commission agents, allowing farmers to capture up to 85–90% of the produce value.
- **Rich Produce Listings**: Farmers can specify crop type, variety, harvest date, quality grade (Grade A/B/C), organic certification status, minimum order quantities, and pickup location.
- **Buyer Exploration**: Buyers can filter produce by location, price, organic badge, crop variety, and seller rating.

### 🤖 2. AI Fair Price Recommendation Engine
- **Data-Driven Valuation**: Powered by Scikit-Learn regression algorithms trained on historical APMC mandi feeds, crop seasonality, quality grades, and regional market indices.
- **Fair Price Band**: Automatically calculates a recommended `[Min, Target, Max]` price band per quintal to guard farmers against predatory underpricing.
- **Dynamic Markup Analytics**: Visualizes retail spread versus farm-gate realization so both sides trade with confidence.

### 📊 3. Live APMC Mandi Comparison Dashboard
- **Market Benchmarking**: Instant side-by-side comparison between local government APMC mandi benchmark rates and direct KisanSetu listing rates.
- **Real-time Price Insights**: Tracks current trading trends across top agricultural commodities (Nashik Red Onion, Sharbati Wheat, Kolar Tomatoes, Guntur Chillies, Basmati Paddy, etc.).

### 🚚 4. Smart Logistics & Route Optimization
- **Pooled Transport Route Optimization**: Employs a 2-stage geodetic nearest-neighbor Traveling Salesperson Problem (TSP) solver.
- **Multi-Farm Pickup**: Groups nearby farm pickups into consolidated transit batches, reducing transportation costs by up to 35% and cutting carbon emissions.
- **Live Transit Status**: Interactive routing maps showing pickup checkpoints, distance metrics, estimated transit time, and fuel conservation stats.

### 🛡️ 5. Trust Scoring & Secure Payments
- **Farmer & Buyer Verification**: Trust score mechanism based on transaction history, crop quality ratings, and prompt delivery records.
- **Payment Sandbox**: Simulated UPI QR code payments with escrow status tracking (`Placed` ➔ `Confirmed` ➔ `In-Transit` ➔ `Delivered` ➔ `Settled`).

### 🌐 6. Vernacular & Rural-First Design (i18n)
- **Multi-Language Accessibility**: Full localization support including **Hindi (हिंदी)** and **English**, designed specifically for high rural adoption and ease of use.
- **Responsive Layout**: Fast, mobile-friendly interface designed to work smoothly on low-bandwidth rural networks.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool & Bundler** | [Vite 6](https://vitejs.dev/) |
| **UI Styling & Icons** | [Tailwind CSS 4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/), [Motion](https://motion.dev/) |
| **Full-Stack Node Server** | [Express](https://expressjs.com/), [tsx](https://github.com/privatenumber/tsx), [esbuild](https://esbuild.github.io/) |
| **Backend API Framework** | [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+), [Uvicorn](https://www.uvicorn.org/) |
| **Database & ORM** | [SQLAlchemy 2.0](https://www.sqlalchemy.org/) (Default: SQLite `agrimarket.db` for instant local setup; PostgreSQL ready via `DATABASE_URL`) |
| **Machine Learning / AI** | [Scikit-learn](https://scikit-learn.org/), [NumPy](https://numpy.org/), [Pandas](https://pandas.pydata.org/), [Google Gemini API](https://ai.google.dev/) (`@google/genai`) |
| **Authentication & Schemas** | [Pydantic v2](https://docs.pydantic.dev/), JWT / Passlib (Bcrypt) |

---

## 📁 Directory Structure

```text
SIH-26033-KisanSetu/
│
├── backend/                      # Python FastAPI Backend & Machine Learning Engine
│   ├── main.py                   # FastAPI application entrypoint and REST API endpoints
│   ├── ml_engine.py              # Scikit-learn AI fair price recommendation model
│   ├── route_optimizer.py        # Logistics & multi-stop geodetic route optimization
│   ├── database.py               # Database engine, session maker & SQLite/PostgreSQL config
│   ├── models.py                 # SQLAlchemy ORM database models (Users, Listings, Orders)
│   ├── schemas.py                # Pydantic validation schemas for API requests/responses
│   ├── seed_data.py              # Sample dataset seeder (realistic crops, mandis, orders)
│   ├── requirements.txt          # Python library dependencies
│   └── README.md                 # Backend-specific architecture & API reference
│
├── src/                          # React + TypeScript Frontend
│   ├── components/               # UI components & dashboards
│   │   ├── AIPricingDashboard.tsx    # Live AI pricing and mandi rate comparison view
│   │   ├── BuyerMarketplace.tsx      # Produce catalog, filtering & ordering for buyers
│   │   ├── FarmerView.tsx            # Farmer inventory, listing creation & crop insights
│   │   ├── RouteOptimizationView.tsx # Logistics batching & multi-farm route planner
│   │   ├── OrdersAndPaymentModal.tsx # Order tracking, escrow status & UPI payment modal
│   │   ├── Header.tsx / Footer.tsx   # Navigation bar, language switcher & branding
│   │   ├── Sidebar.tsx               # Navigation sidebar
│   │   ├── ApiDocsModal.tsx          # In-app interactive API reference modal
│   │   ├── auth/                     # Authentication & role selection views
│   │   ├── buyer/                    # Specialized buyer sub-components
│   │   └── farmer/                   # Specialized farmer sub-components
│   ├── data/                     # Frontend datasets & fallback mock feeds
│   ├── i18n/                     # Internationalization dictionaries (Hindi & English)
│   │   ├── index.ts              # Translation hook & language helpers
│   │   └── translations.ts       # Comprehensive translation key-value mappings
│   ├── types/ & types.ts         # TypeScript data structures and interfaces
│   ├── api.ts                    # Frontend API client service
│   ├── App.tsx                   # Main application router and role state controller
│   ├── main.tsx                  # React DOM root mounting script
│   └── index.css                 # Global CSS and Tailwind directives
│
├── setup_guide/                  # Quick runtime reference guides
│   ├── Manual.txt                # Everyday run commands for developers
│   └── SetupManual.txt           # First-time installation walkthrough
│
├── server.ts                     # Full-stack Node/Express dev server with Vite integration
├── package.json                  # Node.js project manifest & scripts
├── vite.config.ts                # Vite frontend bundler configuration
├── tsconfig.json                 # TypeScript compiler configuration
├── .env.example                  # Environment variable configuration template
└── README.md                     # Project documentation (this file)
```

---

## ⚙️ Setup & Installation Guide

> [!TIP]
> **Detailed Setup Manuals Available:**  
> For comprehensive, step-by-step setup and everyday runtime instructions, please refer to the [`setup_guide/`](setup_guide/) directory:
> - 📄 **[`setup_guide/SetupManual.txt`](setup_guide/SetupManual.txt)** — Comprehensive first-time installation walkthrough for full-stack, frontend-only, and backend-only configurations.
> - 📄 **[`setup_guide/Manual.txt`](setup_guide/Manual.txt)** — Quick daily runtime reference commands for starting the frontend and backend servers.

Follow the quick steps below or consult the detailed manuals in the [`setup_guide/`](setup_guide/) directory to get KisanSetu running on your local machine.

### 📋 Prerequisites

Before starting, ensure you have the following installed:
1. **Node.js**: Version `18.0.0` or higher ([Download Node.js](https://nodejs.org/))
2. **Python**: Version `3.10` or higher ([Download Python](https://www.python.org/))
3. **Git**: ([Download Git](https://git-scm.com/))

Verify your installations by running:
```bash
node -v
npm -v
python --version
```

---

### 🚀 Running the Application (Full-Stack Mode)

To run the complete application, you will open **two terminal windows**: one for the Python FastAPI backend and one for the React frontend.

#### 🔹 Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/SIH-26033-KisanSetu.git
cd SIH-26033-KisanSetu
```

#### 🔹 Step 2: Set Up & Start the Backend Server (Terminal 1)

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Create a Python virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - **Windows (PowerShell / Command Prompt)**:
     ```powershell
     venv\Scripts\activate
     ```
     *(If PowerShell blocks script execution, run: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`)*
   - **macOS / Linux**:
     ```bash
     source venv/bin/activate
     ```

4. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Seed the database with sample agricultural data (crops, mandis, buyers, and sellers):
   ```bash
   python seed_data.py
   ```

6. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
   > 💡 The backend API is now running at **http://localhost:8000**  
   > 📖 View interactive Swagger API Docs at **http://localhost:8000/docs**

---

#### 🔹 Step 3: Set Up & Start the Frontend (Terminal 2)

1. Open a **new terminal window** and navigate to the project's root directory (`SIH-26033-KisanSetu`).

2. (Optional) Create your local environment file:
   ```bash
   cp .env.example .env
   ```
   *If you have a Google Gemini API key, paste it in `.env` as `GEMINI_API_KEY="your_api_key_here"`.*

3. Install frontend dependencies:
   ```bash
   npm install
   ```

4. Launch the frontend development server:
   ```bash
   npm run dev
   ```
   > 🌐 Open your web browser and navigate to: **http://localhost:3000**

---

### ⚡ Alternative: Frontend-Only Quickstart

If you only want to explore the UI, design, and marketplace views without running Python, KisanSetu includes a built-in development simulation server:

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser: http://localhost:3000
```

---

## 📡 API Endpoints Overview

The Python FastAPI backend provides robust REST endpoints with automated OpenAPI validation:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Role-based user authentication (`FARMER`, `BUYER`, `LOGISTICS`, `GOVT`) |
| `GET` | `/api/listings` | Fetch agricultural listings with filters (crop, grade, location, organic) |
| `POST` | `/api/listings` | Publish new farmer crop listing with AI price benchmarking |
| `POST` | `/api/pricing/recommend` | **AI Pricing Engine**: Computes fair price band `[Min, Target, Max]` |
| `GET` | `/api/pricing/mandi-compare/{crop}` | Side-by-side comparison: APMC Mandi rate vs. AI Fair Price |
| `GET` | `/api/orders` | Retrieve purchase orders and delivery tracking states |
| `POST` | `/api/orders` | Place a direct farm-to-buyer purchase order |
| `PATCH` | `/api/orders/{id}/status` | Update order progression (`Placed` ➔ `Confirmed` ➔ `In-Transit` ➔ `Delivered`) |
| `POST` | `/api/payments/upi-verify` | Sandbox digital UPI payment verification with escrow holding |
| `GET` | `/api/logistics/routes` | **Logistics Engine**: Multi-pickup route batching and fuel savings analysis |
| `GET` | `/api/analytics/summary` | Real-time market metrics: Farmer profit realization & middleman savings |

Interactive API documentation can be explored live at [http://localhost:8000/docs](http://localhost:8000/docs).

---

## ❓ Frequently Asked Questions & Troubleshooting

<details>
<summary><b>1. PowerShell script execution error when activating virtual environment on Windows?</b></summary>
<p>
Windows PowerShell blocks scripts by default for security. In your terminal, run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
venv\Scripts\activate
```
This enables script execution only for your current terminal session.
</p>
</details>

<details>
<summary><b>2. Port 3000 or 8000 is already in use?</b></summary>
<p>
If port 3000 or 8000 is occupied by another application:
- For frontend: You can change the port in <code>server.ts</code> or pass a custom port.
- For backend: Run uvicorn on another port, for example:
  <code>uvicorn main:app --reload --port 8001</code>
</p>
</details>

<details>
<summary><b>3. How do I switch the database from SQLite to PostgreSQL?</b></summary>
<p>
By default, the backend automatically creates and connects to a lightweight local SQLite database (<code>backend/agrimarket.db</code>). To use PostgreSQL instead:
Set the <code>DATABASE_URL</code> environment variable before running the backend:

```bash
export DATABASE_URL="postgresql://username:password@localhost:5432/kisansetu"
```
Or set it in your backend environment configuration.
</p>
</details>

<details>
<summary><b>4. How do I change the language in the application?</b></summary>
<p>
Click on the language selector button in the top navigation bar to toggle between <b>English</b> and <b>हिंदी (Hindi)</b>.
</p>
</details>

---

## 👥 Contributors & Acknowledgments

- Developed for **Smart India Hackathon (SIH 2026)** — Problem Statement: **SIH26033**.
- Built with dedication to empower Indian farmers with equitable market access, transparent price discovery, and sustainable logistics.
