import React, { useState } from "react";
import { 
  Building2, 
  MapPin, 
  Sparkles, 
  Package, 
  Calculator, 
  FileText, 
  CheckCircle2, 
  Send, 
  AlertCircle, 
  Scale, 
  Percent,
  Plus
} from "lucide-react";
import { BulkProcurementRequest, CropListing, QualityGrade, User } from "../../types";
import { t, translateCrop, translateGrade } from "../../i18n";

interface BuyerBulkOrdersProps {
  buyer: User;
  listings: CropListing[];
  lang: "en" | "hi";
  onOpenOrderModal: (listing: CropListing) => void;
}

export const BuyerBulkOrders: React.FC<BuyerBulkOrdersProps> = ({
  buyer,
  listings,
  lang,
  onOpenOrderModal
}) => {
  // Bulk Calculator State
  const [calcCrop, setCalcCrop] = useState<string>("Onion");
  const [calcQuantity, setCalcQuantity] = useState<number>(150);
  const [calcGrade, setCalcGrade] = useState<QualityGrade>("Grade A");

  // Custom RFQ Posting State
  const [showRfqForm, setShowRfqForm] = useState(false);
  const [rfqCrop, setRfqCrop] = useState("Tomato");
  const [rfqVariety, setRfqVariety] = useState("Kolar Hybrid 1057");
  const [rfqQuantity, setRfqQuantity] = useState<number>(100);
  const [rfqTargetPrice, setRfqTargetPrice] = useState<number>(1850);
  const [rfqGrade, setRfqGrade] = useState<QualityGrade>("Grade A");
  const [rfqPincode, setRfqPincode] = useState("400705");
  const [rfqAddress, setRfqAddress] = useState("Central Distribution Hub, Turbhe MIDC, Navi Mumbai");
  const [rfqUrgency, setRfqUrgency] = useState("Immediate (48h)");
  const [rfqNotes, setRfqNotes] = useState("Palletized crates required with temperature-controlled cold dispatch.");
  const [rfqSuccessMsg, setRfqSuccessMsg] = useState("");
  const [submittingRfq, setSubmittingRfq] = useState(false);

  // Active buyer RFQ demands posted
  const [myRfqs, setMyRfqs] = useState<BulkProcurementRequest[]>([
    {
      id: "RFQ-2026-081",
      cropName: "Onion",
      variety: "Nashik Red (Garwa)",
      quantityQuintals: 150,
      targetPricePerQuintal: 2300,
      qualityGrade: "Grade A",
      deliveryPincode: "400705",
      deliveryAddress: "Navi Mumbai Wholesale Hub",
      urgency: "Immediate (48h)",
      notes: "Direct farm loading required. Escrow funded in advance.",
      createdAt: "2026-08-29"
    },
    {
      id: "RFQ-2026-079",
      cropName: "Wheat",
      variety: "Sharbati Gold Premium",
      quantityQuintals: 250,
      targetPricePerQuintal: 2900,
      qualityGrade: "Grade A",
      deliveryPincode: "400705",
      deliveryAddress: "Central Storage Silo, Turbhe",
      urgency: "Weekly Supply",
      notes: "Certified high-gluten wheat with moisture < 11%.",
      createdAt: "2026-08-27"
    }
  ]);

  // Bulk Discount tiers: >50 Qtl = 3% off, >100 Qtl = 5% off, >200 Qtl = 7% off
  const getVolumeDiscount = (qty: number) => {
    if (qty >= 200) return 7;
    if (qty >= 100) return 5;
    if (qty >= 50) return 3;
    return 0;
  };

  const discountPct = getVolumeDiscount(calcQuantity);
  const baseRate = calcCrop === "Onion" ? 2300 : calcCrop === "Wheat" ? 2900 : calcCrop === "Tomato" ? 1850 : 2100;
  const discountedRate = Math.round(baseRate * (1 - discountPct / 100));
  const subtotal = discountedRate * calcQuantity;
  const savings = (baseRate - discountedRate) * calcQuantity;

  const handlePostRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingRfq(true);

    setTimeout(() => {
      const newRfq: BulkProcurementRequest = {
        id: "RFQ-2026-" + Math.floor(100 + Math.random() * 900),
        cropName: rfqCrop,
        variety: rfqVariety,
        quantityQuintals: Number(rfqQuantity),
        targetPricePerQuintal: Number(rfqTargetPrice),
        qualityGrade: rfqGrade,
        deliveryPincode: rfqPincode,
        deliveryAddress: rfqAddress,
        urgency: rfqUrgency,
        notes: rfqNotes,
        createdAt: new Date().toISOString().split("T")[0]
      };
      setMyRfqs(prev => [newRfq, ...prev]);
      setSubmittingRfq(false);
      setRfqSuccessMsg(
        lang === "hi"
          ? `${rfqQuantity} क्विंटल ${translateCrop(rfqCrop, lang)} की मांग 45+ प्रमाणित किसान उत्पादक संगठनों (FPO) को प्रसारित कर दी गई है!`
          : `Procurement request for ${rfqQuantity} Qtl ${rfqCrop} broadcasted to 45+ verified FPO Producer Collectives!`
      );
      setTimeout(() => {
        setShowRfqForm(false);
        setRfqSuccessMsg("");
      }, 2500);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wide">
              {lang === "hi" ? "थोक खरीद व आरएफक्यू इंजन" : "Bulk Procurement Engine"}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              • {lang === "hi" ? "थोक मात्रा छूट • सीधा FPO संपर्क" : "Tiered Volume Savings • FPO Match"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2 font-display">
            {t("buyerBulk.title", lang)}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
            {t("buyerBulk.subtitle", lang)}
          </p>
        </div>

        <button
          onClick={() => setShowRfqForm(!showRfqForm)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-2xl transition cursor-pointer shadow-xs flex items-center gap-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{showRfqForm ? (lang === "hi" ? "फ़ॉर्म बंद करें" : "Close Form") : t("buyerBulk.postRfqButton", lang)}</span>
        </button>
      </div>

      {/* RFQ Broadcast Form (Collapsible) */}
      {showRfqForm && (
        <div className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base font-display">
                {lang === "hi" ? "संस्थागत थोक खरीद मांग बनाएं" : "Create Institutional Procurement Demand"}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {lang === "hi" ? "यह मांग सत्यापित किसान उत्पादक संगठनों (FPO) को सीधे प्रसारित की जाएगी।" : "Broadcast this requirement across certified Farmer Producer Organizations (FPOs)."}
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              किसानSetu B2B Network
            </span>
          </div>

          {rfqSuccessMsg ? (
            <div className="p-6 text-center space-y-2 bg-[#F0FDF4] rounded-2xl border border-emerald-200">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-slate-900 text-sm">
                {lang === "hi" ? "मांग सफलतापूर्वक प्रसारित की गई!" : "Demand Published Successfully!"}
              </h4>
              <p className="text-xs text-slate-600 font-medium">{rfqSuccessMsg}</p>
            </div>
          ) : (
            <form onSubmit={handlePostRfqSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t("buyerBulk.rfqCropLabel", lang)} *
                  </label>
                  <select
                    value={rfqCrop}
                    onChange={(e) => setRfqCrop(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Onion">{translateCrop("Onion", lang)}</option>
                    <option value="Tomato">{translateCrop("Tomato", lang)}</option>
                    <option value="Wheat">{translateCrop("Wheat", lang)}</option>
                    <option value="Potato">{translateCrop("Potato", lang)}</option>
                    <option value="Red Chilli">{translateCrop("Red Chilli", lang)}</option>
                    <option value="Paddy (Basmati)">{translateCrop("Paddy (Basmati)", lang)}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t("buyerBulk.rfqVarietyLabel", lang)} *
                  </label>
                  <input
                    type="text"
                    value={rfqVariety}
                    onChange={(e) => setRfqVariety(e.target.value)}
                    required
                    placeholder="e.g. Kolar Hybrid, Nashik Red"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t("buyerBulk.rfqQtyLabel", lang)} *
                  </label>
                  <input
                    type="number"
                    min={10}
                    value={rfqQuantity}
                    onChange={(e) => setRfqQuantity(Math.max(10, Number(e.target.value)))}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-[11px] text-slate-500 mt-0.5 block font-medium">
                    = {(rfqQuantity * 100).toLocaleString()} kg ({lang === "hi" ? "न्यूनतम 10 क्विंटल" : "Min. 10 Qtl for bulk RFQ"})
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t("buyerBulk.rfqRateLabel", lang)} *
                  </label>
                  <input
                    type="number"
                    min={100}
                    value={rfqTargetPrice}
                    onChange={(e) => setRfqTargetPrice(Number(e.target.value))}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t("buyerBulk.rfqGradeLabel", lang)} *
                  </label>
                  <select
                    value={rfqGrade}
                    onChange={(e) => setRfqGrade(e.target.value as QualityGrade)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Grade A">{lang === "hi" ? "ग्रेड A (उत्कृष्ट व एक्सपोर्ट)" : "Grade A (Premium Export & Retail)"}</option>
                    <option value="Grade B">{lang === "hi" ? "ग्रेड B (मानक प्रोसेसिंग)" : "Grade B (Standard Processing)"}</option>
                    <option value="Grade C">{lang === "hi" ? "ग्रेड C (औद्योगिक/फ़ीड)" : "Grade C (Industrial/Animal Feed)"}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t("buyerBulk.rfqUrgencyLabel", lang)} *
                  </label>
                  <select
                    value={rfqUrgency}
                    onChange={(e) => setRfqUrgency(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Immediate (48h)">{lang === "hi" ? "तत्काल प्रेषण (48 घंटे)" : "Immediate Dispatch (48h)"}</option>
                    <option value="Weekly Supply">{lang === "hi" ? "साप्ताहिक निर्धारित आपूर्ति" : "Weekly Scheduled Supply"}</option>
                    <option value="Seasonal Contract">{lang === "hi" ? "मौसमी अनुबंध" : "Seasonal Forward Contract"}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t("buyerBulk.rfqAddressLabel", lang)} *
                </label>
                <input
                  type="text"
                  value={rfqAddress}
                  onChange={(e) => setRfqAddress(e.target.value)}
                  required
                  placeholder="e.g. Distribution Center, Whitefield, Bangalore"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t("buyerBulk.rfqNotesLabel", lang)}
                </label>
                <input
                  type="text"
                  value={rfqNotes}
                  onChange={(e) => setRfqNotes(e.target.value)}
                  placeholder="e.g. Crate packaging, max moisture 12%, cold transit preferred"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRfqForm(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  {t("common.cancel", lang)}
                </button>
                <button
                  type="submit"
                  disabled={submittingRfq}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-xs transition cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submittingRfq ? (lang === "hi" ? "मांग प्रकाशित हो रही है..." : "Publishing Demand...") : t("buyerBulk.submitRfq", lang)}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Two-Column Grid: Bulk Savings Calculator & Active RFQs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Volume Tier Calculator */}
        <div className="bg-white rounded-3xl border border-emerald-100 p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shadow-xs">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base font-display">
                {lang === "hi" ? "थोक मात्रा मूल्य कैलकुलेटर" : "Bulk Volume Pricing Simulator"}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {lang === "hi" ? "मात्रा के अनुसार स्वतः मिलने वाली थोक छूट के साथ भाव देखें।" : "Calculate wholesale farm-gate prices with automatic volume tiers."}
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">{t("farmerModal.selectCrop", lang)}:</label>
                <select
                  value={calcCrop}
                  onChange={(e) => setCalcCrop(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Onion">{translateCrop("Onion", lang)}</option>
                  <option value="Wheat">{translateCrop("Wheat", lang)}</option>
                  <option value="Tomato">{translateCrop("Tomato", lang)}</option>
                  <option value="Potato">{translateCrop("Potato", lang)}</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{t("common.grade", lang)}:</label>
                <select
                  value={calcGrade}
                  onChange={(e) => setCalcGrade(e.target.value as QualityGrade)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Grade A">{translateGrade("Grade A", lang)}</option>
                  <option value="Grade B">{translateGrade("Grade B", lang)}</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-700">{lang === "hi" ? "खरीद मात्रा:" : "Procurement Volume:"}</label>
                <span className="font-extrabold text-slate-900 font-display text-sm">
                  {calcQuantity} {lang === "hi" ? "क्विंटल" : "Quintals"} <span className="font-normal text-xs text-slate-500">({(calcQuantity * 100).toLocaleString()} kg)</span>
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={500}
                step={10}
                value={calcQuantity}
                onChange={(e) => setCalcQuantity(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-semibold">
                <span>20 Qtl ({lang === "hi" ? "मानक" : "Standard"})</span>
                <span>100 Qtl (FPO Tier 1: -5%)</span>
                <span>500 Qtl (Direct Haul: -7%)</span>
              </div>
            </div>

            {/* Calculated Breakdown Card */}
            <div className="bg-[#F0FDF4] p-4 rounded-2xl border border-emerald-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 font-medium">{lang === "hi" ? "मानक खेत भाव:" : "Standard Farm Rate:"}</span>
                <span className="font-semibold text-slate-700">₹{baseRate.toLocaleString()}/{lang === "hi" ? "क्विंटल" : "qtl"}</span>
              </div>
              <div className="flex justify-between items-center text-emerald-700 font-bold">
                <span className="flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5" />
                  <span>{lang === "hi" ? `थोक मात्रा छूट (${discountPct}%):` : `Volume Tier Discount (${discountPct}%):`}</span>
                </span>
                <span>-₹{(baseRate - discountedRate).toLocaleString()}/{lang === "hi" ? "क्विंटल" : "qtl"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 font-medium">{lang === "hi" ? "रियायती थोक भाव:" : "Negotiated Bulk Rate:"}</span>
                <span className="font-extrabold text-slate-900 text-sm font-display">
                  ₹{discountedRate.toLocaleString()}/{lang === "hi" ? "क्विंटल" : "qtl"}
                </span>
              </div>
              <div className="border-t border-emerald-200 pt-2 flex justify-between items-center font-extrabold text-sm text-emerald-900">
                <span>{lang === "hi" ? "कुल अनुबंध मूल्य:" : "Total Contract Value:"}</span>
                <span className="text-base font-display">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  {lang === "hi"
                    ? `आप मंडी थोक भाव की तुलना में ₹${savings.toLocaleString()} की बचत कर रहे हैं!`
                    : `You save ₹${savings.toLocaleString()} compared to standard mandi wholesale!`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Active Buyer RFQ Requirements */}
        <div className="bg-white rounded-3xl border border-emerald-100 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base font-display">
              {lang === "hi" ? `आपकी प्रसारित मांगें (${myRfqs.length})` : `Your Broadcasted RFQs (${myRfqs.length})`}
            </h3>
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
              {lang === "hi" ? "FPO नेटवर्क पर सक्रिय" : "Active on FPO network"}
            </span>
          </div>

          <div className="space-y-3">
            {myRfqs.map((rfq) => (
              <div
                key={rfq.id}
                className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200 space-y-2.5 text-xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-bold bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-700">
                      {rfq.id}
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-sm mt-1 font-display">
                      {translateCrop(rfq.cropName, lang)} ({rfq.variety})
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                    {rfq.urgency === "Immediate (48h)" && lang === "hi" ? "तत्काल (48 घंटे)" : rfq.urgency}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-white p-2 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block">{lang === "hi" ? "लक्षित मात्रा:" : "Target Volume:"}</span>
                    <strong className="text-slate-900">{rfq.quantityQuintals} {lang === "hi" ? "क्विंटल" : "Quintals"}</strong>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block">{lang === "hi" ? "लक्षित भाव:" : "Target Rate:"}</span>
                    <strong className="text-emerald-700">₹{rfq.targetPricePerQuintal}/{lang === "hi" ? "क्विंटल" : "Qtl"}</strong>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                  <span className="truncate max-w-[240px]">📍 {rfq.deliveryAddress}</span>
                  <span className="font-semibold text-slate-600">{lang === "hi" ? "3 FPO प्रस्ताव प्राप्त" : "3 FPO Offers Received"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

