# KisanSetu: Direct Farmer-to-Consumer Digital Agri-Marketplace

**KisanSetu (SIH 2026 - Problem Statement SIH26033)** is a Direct Farmer-to-Consumer/Buyer Digital Agri-Marketplace designed to eliminate unnecessary middleman layers, increase farmer profit realization, and offer lower rates to buyers through AI-driven pricing and optimized logistics.

---

## Key Features

* **Direct Farmer-to-Buyer Marketplace:** Peer-to-peer listing platform bypassing commission agents (arhatiyas) and wholesalers.
* **AI Pricing Engine:** Regression model trained on crop type, quality grade, location, and historical mandi feeds to output fair-price range recommendations.
* **Real-time Price Discovery:** Side-by-side comparison dashboard comparing nearby mandi rates against platform prices[cite: 1].
* **Buyer Verification & Trust Scoring:** Rating system and trust scores to de-risk transactions between strangers[cite: 1].
* **Route Optimization:** Multi-pickup and batch-delivery route calculation to lower last-mile delivery costs and produce spoilage[cite: 1].
* **Internationalization (i18n):** Multi-language interface support tailored for rural adoption[cite: 1].

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Frontend** | React, TypeScript, Vite, Tailwind CSS|
| **Backend** | Python, FastAPI, Uvicorn|
| **Database** | PostgreSQL|
| **AI / ML Stack** | Scikit-learn, Python ML Engine|
| **Localization & Auth** | Custom i18n module, JWT / Firebase Auth|

---

## Directory Architecture

```text
sarfarosh-0-sih-26033-kisansetu/
├── backend/                  # FastAPI Application & ML Engine
│   ├── main.py              # Application entrypoint & routes
│   ├── ml_engine.py          # AI fair price recommendation logic
│   ├── route_optimizer.py    # Multi-stop logistics route engine
│   ├── database.py           # DB connection & session configuration
│   ├── models.py             # ORM database models
│   ├── schemas.py            # Pydantic serialization models
│   └── seed_data.py          # Initial dataset seeder script
├── src/                      # React + TypeScript Frontend
│   ├── components/           # Core view dashboards & sub-components
│   │   ├── auth/             # Login, OTP verification & role workflows
│   │   ├── buyer/            # Bulk orders, contracts, escrow views
│   │   └── farmer/           # Inventory, payouts, weather insights
│   ├── data/                 # Mock datasets for prototyping
│   ├── i18n/                 # Localization & translation dictionaries
│   ├── api.ts                # Axios/Fetch backend API integrations
│   ├── App.tsx               # Main application route router
│   └── types.ts              # TypeScript interface definitions
├── setup_guide/              # Installation & execution manuals
├── package.json              # Frontend Node dependencies
├── vite.config.ts            # Vite bundling settings
└── server.ts                 # Dev server script
