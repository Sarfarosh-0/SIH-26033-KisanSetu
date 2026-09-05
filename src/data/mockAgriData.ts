import { BuyerContract, BuyerRequest, PayoutRecord, WeatherForecast } from "../types";

export const MOCK_BUYER_REQUESTS: BuyerRequest[] = [
  {
    id: 101,
    buyerId: 4,
    buyerName: "Priya Sharma",
    buyerCompany: "GreenBite Organics & Retail",
    cropName: "Onion",
    variety: "Nashik Red (Garwa)",
    quantityRequiredQuintals: 120,
    targetPricePerQuintal: 2350,
    qualityGrade: "Grade A",
    deliveryLocation: "Turbhe Agro Logistics Hub, Navi Mumbai",
    status: "OPEN",
    urgency: "Immediate (48h)",
    notes: "Requires uniform size (45mm+) and sun-cured lots. Palletized delivery preferred. Direct escrow payment guaranteed upon arrival.",
    createdAt: "2026-08-28T09:30:00Z"
  },
  {
    id: 102,
    buyerId: 5,
    buyerName: "Arun Verma",
    buyerCompany: "BigBasket B2B Institutional",
    cropName: "Tomato",
    variety: "Kolar Hybrid 1057",
    quantityRequiredQuintals: 80,
    targetPricePerQuintal: 1900,
    qualityGrade: "Grade A",
    deliveryLocation: "Whitefield Cold Hub, Bengaluru",
    status: "OPEN",
    urgency: "Weekly Supply",
    notes: "Firm pinkish-red tomatoes for retail display. Temperature controlled transit arranged or refrigerated unloading bay provided.",
    createdAt: "2026-08-29T11:15:00Z"
  },
  {
    id: 103,
    buyerId: 6,
    buyerName: "Siddharth Goenka",
    buyerCompany: "ITC Agri-Business Division",
    cropName: "Wheat",
    variety: "Sharbati Gold Premium",
    quantityRequiredQuintals: 300,
    targetPricePerQuintal: 2950,
    qualityGrade: "Grade A",
    deliveryLocation: "Pithampur Processing Center, Indore",
    status: "OPEN",
    urgency: "Seasonal Contract",
    notes: "High gluten grain for flour milling. Minimum 98.5% grain cleanliness certified by mandal lab report. Long-term contract offered.",
    createdAt: "2026-08-27T14:00:00Z"
  },
  {
    id: 104,
    buyerId: 7,
    buyerName: "Deepak Mehra",
    buyerCompany: "Zomato Hyperpure Kitchens",
    cropName: "Potato",
    variety: "Chipsona Processing",
    quantityRequiredQuintals: 100,
    targetPricePerQuintal: 1720,
    qualityGrade: "Grade A",
    deliveryLocation: "Chakan Central DC, Pune",
    status: "OPEN",
    urgency: "Immediate (48h)",
    notes: "High-solids low-sugar potatoes suitable for deep frying. Zero green skins acceptable.",
    createdAt: "2026-08-30T08:00:00Z"
  },
  {
    id: 105,
    buyerId: 8,
    buyerName: "Kavita Rao",
    buyerCompany: "Safal Fresh Fruits & Veg",
    cropName: "Red Chilli",
    variety: "Guntur Sannam S4",
    quantityRequiredQuintals: 50,
    targetPricePerQuintal: 19500,
    qualityGrade: "Grade A",
    deliveryLocation: "Mangolpuri Cold Storage, New Delhi",
    status: "OPEN",
    urgency: "Weekly Supply",
    notes: "Deep red pungency index 35k-40k SHU. Well-dried sun-cured crop.",
    createdAt: "2026-08-29T16:45:00Z"
  }
];

export const MOCK_PAYOUTS: PayoutRecord[] = [
  {
    id: "PAY-98231",
    orderId: 1,
    orderNumber: "ORD-2026-0801",
    cropName: "Nashik Red Onion",
    quantityQuintals: 60,
    amount: 132000,
    bankName: "Bank of Maharashtra (Kisan Credit)",
    accountMasked: "•••• •••• 4029",
    ifscCode: "MAHB0001092",
    utrNumber: "UPI/UTR/891274982142",
    status: "RELEASED",
    date: "2026-08-29"
  },
  {
    id: "PAY-98232",
    orderId: 2,
    orderNumber: "ORD-2026-0802",
    cropName: "Sharbati Gold Wheat",
    quantityQuintals: 40,
    amount: 112000,
    bankName: "State Bank of India (Agri Branch)",
    accountMasked: "•••• •••• 8102",
    ifscCode: "SBIN0004521",
    utrNumber: "UPI/UTR/884918239011",
    status: "RELEASED",
    date: "2026-08-28"
  },
  {
    id: "PAY-98233",
    orderId: 3,
    orderNumber: "ORD-2026-0803",
    cropName: "Kolar Hybrid Tomato",
    quantityQuintals: 25,
    amount: 45000,
    bankName: "Bank of Maharashtra (Kisan Credit)",
    accountMasked: "•••• •••• 4029",
    ifscCode: "MAHB0001092",
    utrNumber: "ESCROW-LOCKED-WAITING-OTP",
    status: "ESCROW_LOCKED",
    date: "2026-08-30"
  },
  {
    id: "PAY-98234",
    orderId: 4,
    orderNumber: "ORD-2026-0798",
    cropName: "Guntur Sannam Chilli",
    quantityQuintals: 15,
    amount: 285000,
    bankName: "Andhra Pragathi Grameena Bank",
    accountMasked: "•••• •••• 1198",
    ifscCode: "APGB0003011",
    utrNumber: "UPI/UTR/871092839412",
    status: "RELEASED",
    date: "2026-08-24"
  }
];

export const MOCK_WEATHER_FORECAST: WeatherForecast[] = [
  {
    day: "Today",
    date: "30 Aug",
    tempMax: 31,
    tempMin: 20,
    condition: "Clear Sky",
    rainProbability: 5,
    humidity: 48,
    windSpeedKmh: 12,
    advisory: "Ideal conditions for onion harvesting and sun-curing. Zero rainfall expected over next 36 hours."
  },
  {
    day: "Tomorrow",
    date: "31 Aug",
    tempMax: 32,
    tempMin: 21,
    condition: "Sunny",
    rainProbability: 10,
    humidity: 52,
    windSpeedKmh: 14,
    advisory: "Excellent weather for sorting, grading, and loading onto logistics vehicles."
  },
  {
    day: "Tue",
    date: "01 Sep",
    tempMax: 29,
    tempMin: 21,
    condition: "Partly Cloudy",
    rainProbability: 25,
    humidity: 64,
    windSpeedKmh: 18,
    advisory: "Moderate winds from west. Cover open trailers with waterproof tarpaulin sheets."
  },
  {
    day: "Wed",
    date: "02 Sep",
    tempMax: 27,
    tempMin: 20,
    condition: "Scattered Showers",
    rainProbability: 60,
    humidity: 78,
    windSpeedKmh: 22,
    advisory: "Monsoon showers anticipated post 2 PM. Avoid field drying; store harvested lots in covered sheds."
  },
  {
    day: "Thu",
    date: "03 Sep",
    tempMax: 30,
    tempMin: 19,
    condition: "Dry & Breezy",
    rainProbability: 15,
    humidity: 55,
    windSpeedKmh: 15,
    advisory: "Clear skies return. Normal farm operations and haulage can proceed safely."
  }
];

export const MOCK_BUYER_CONTRACTS: BuyerContract[] = [
  {
    contractId: "CON-2026-01",
    contractNumber: "AGRI-CT-2026-0881",
    buyerName: "Priya Sharma",
    buyerCompany: "GreenBite Organics Wholesale",
    farmerName: "Ramesh Patel",
    fpoName: "Sahyadri Krishi Vikas Producer Co.",
    cropName: "Nashik Red Onion",
    variety: "Garwa Premium",
    volumeQuintals: 150,
    contractValue: 337500,
    pricePerQuintal: 2250,
    startDate: "2026-08-15",
    deliveryDueDate: "2026-09-10",
    status: "ACTIVE",
    escrowStatus: "100% FUNDED"
  },
  {
    contractId: "CON-2026-02",
    contractNumber: "AGRI-CT-2026-0842",
    buyerName: "Priya Sharma",
    buyerCompany: "GreenBite Organics Wholesale",
    farmerName: "Sardar Gurpreet Singh",
    fpoName: "Malwa Agro Farmer Producer Org",
    cropName: "Sharbati Gold Wheat",
    variety: "Lokwan High-Gluten",
    volumeQuintals: 200,
    contractValue: 560000,
    pricePerQuintal: 2800,
    startDate: "2026-08-01",
    deliveryDueDate: "2026-08-25",
    status: "COMPLETED",
    escrowStatus: "FULLY_SETTLED"
  },
  {
    contractId: "CON-2026-03",
    contractNumber: "AGRI-CT-2026-0915",
    buyerName: "Priya Sharma",
    buyerCompany: "GreenBite Organics Wholesale",
    farmerName: "Ramesh Patel",
    fpoName: "Sahyadri Krishi Vikas Producer Co.",
    cropName: "Tomato",
    variety: "Kolar Hybrid 1057",
    volumeQuintals: 50,
    contractValue: 92500,
    pricePerQuintal: 1850,
    startDate: "2026-08-28",
    deliveryDueDate: "2026-09-05",
    status: "IN_FULFILLMENT",
    escrowStatus: "100% FUNDED"
  }
];
