import React, { useState } from "react";
import { 
  Building2, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  ChevronRight,
  TrendingUp,
  PackageCheck,
  Calendar
} from "lucide-react";
import { BuyerRequest, CropListing, User } from "../../types";
import { MOCK_BUYER_REQUESTS } from "../../data/mockAgriData";
import { t, translateCrop, translateGrade } from "../../i18n";

interface FarmerBuyerRequestsProps {
  farmer: User;
  listings: CropListing[];
  lang: "en" | "hi";
  onCommitLot?: (requestId: number, cropName: string, quantity: number) => void;
}

export const FarmerBuyerRequests: React.FC<FarmerBuyerRequestsProps> = ({
  farmer,
  listings,
  lang,
  onCommitLot
}) => {
  const [requests, setRequests] = useState<BuyerRequest[]>(MOCK_BUYER_REQUESTS);
  const [filterCrop, setFilterCrop] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState<BuyerRequest | null>(null);
  const [commitQty, setCommitQty] = useState<number>(50);
  const [commitSuccessMsg, setCommitSuccessMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const farmerListings = listings.filter(l => l.farmerId === farmer.id);

  const filteredRequests = requests.filter(req => {
    if (filterCrop !== "All" && req.cropName !== filterCrop) return false;
    return true;
  });

  const handleOpenCommitModal = (req: BuyerRequest) => {
    setSelectedRequest(req);
    setCommitQty(Math.min(req.quantityRequiredQuintals, 50));
    setCommitSuccessMsg("");
  };

  const handleCommitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest) return;
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setCommitSuccessMsg(
        lang === "hi"
          ? `${selectedRequest.buyerCompany} को ${commitQty} क्विंटल का ऑफर भेजा गया! वे समीक्षा कर 24 घंटे में एस्क्रो जमा करेंगे।`
          : `Offer of ${commitQty} Qtl submitted to ${selectedRequest.buyerCompany}! They will review and fund escrow within 24h.`
      );
      if (onCommitLot) {
        onCommitLot(selectedRequest.id, selectedRequest.cropName, commitQty);
      }
      setTimeout(() => {
        setSelectedRequest(null);
        setCommitSuccessMsg("");
      }, 2500);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wide">
              {lang === "hi" ? "संस्थागत मांग" : "Verified Institutional Demand"}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              • {lang === "hi" ? "शून्य दलाली • सीधे अनुबंध" : "Zero Brokerage • Direct Contracts"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2 font-display">
            {lang === "hi" ? "सक्रिय खरीदार अनुरोध व RFQs" : "Active Buyer Procurement Requests"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
            {lang === "hi"
              ? "रिटेल चेन, संस्थागत रसोई और निर्यातकों द्वारा सीधे खेत से खरीद के लाइव ऑर्डर देखें।"
              : "Browse live purchase requirements from retail chains, institutional kitchens, and export houses seeking farm-gate supply."}
          </p>
        </div>

        {/* Quick Filter */}
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200">
          <span className="text-xs font-bold text-slate-600 pl-2">
            {lang === "hi" ? "फ़िल्टर:" : "Filter:"}
          </span>
          <select
            value={filterCrop}
            onChange={(e) => setFilterCrop(e.target.value)}
            aria-label="Filter procurement requests by crop type"
            className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">{lang === "hi" ? `सभी फसलें (${requests.length})` : `All Crops (${requests.length})`}</option>
            <option value="Onion">{translateCrop("Onion", lang)}</option>
            <option value="Tomato">{translateCrop("Tomato", lang)}</option>
            <option value="Wheat">{translateCrop("Wheat", lang)}</option>
            <option value="Potato">{translateCrop("Potato", lang)}</option>
            <option value="Red Chilli">{translateCrop("Red Chilli", lang)}</option>
          </select>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredRequests.map((req) => {
          const matchingInventory = farmerListings.find(
            l => l.cropName.toLowerCase() === req.cropName.toLowerCase()
          );

          return (
            <div
              key={req.id}
              className="bg-white rounded-3xl border border-emerald-100 p-6 shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header with Urgency & Grade */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shadow-xs">
                      <Building2 className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base font-display">
                        {translateCrop(req.cropName, lang)} {req.variety ? `(${req.variety})` : ""}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {req.buyerCompany}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase ${
                    req.urgency.includes("Immediate")
                      ? "bg-amber-100 text-amber-800 border border-amber-200"
                      : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                  }`}>
                    {lang === "hi" ? (req.urgency.includes("Immediate") ? "तत्काल आवश्यकता" : "नियमित खरीद") : req.urgency}
                  </span>
                </div>

                {/* Requirements details */}
                <div className="bg-[#F0FDF4] p-3.5 rounded-2xl border border-emerald-100 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">{lang === "hi" ? "आवश्यक मात्रा:" : "Volume Required:"}</span>
                    <span className="font-extrabold text-slate-900 text-sm">
                      {req.quantityRequiredQuintals} {t("common.quintals", lang)} <span className="text-[11px] font-normal text-slate-500">({(req.quantityRequiredQuintals * 100).toLocaleString()} kg)</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">{lang === "hi" ? "खरीदार का लक्षित भाव:" : "Buyer Target Rate:"}</span>
                    <span className="font-extrabold text-emerald-700 text-sm font-display">
                      ₹{req.targetPricePerQuintal.toLocaleString()}/{lang === "hi" ? "क्विंटल" : "qtl"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-500">{lang === "hi" ? "अपेक्षित ग्रेड:" : "Grade Required:"}</span>
                    <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                      {translateGrade(req.qualityGrade, lang)}
                    </span>
                  </div>
                </div>

                {/* Delivery Hub & Notes */}
                <div className="text-xs space-y-1 text-slate-600">
                  <div className="flex items-center gap-1.5 font-medium text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                    <span>{lang === "hi" ? "डिलीवरी स्थान:" : "Delivery:"} {req.deliveryLocation}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed italic pl-5">
                    "{req.notes}"
                  </p>
                </div>

                {/* Matching Inventory Badge */}
                {matchingInventory ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-between text-xs">
                    <span className="text-emerald-800 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>
                        {lang === "hi"
                          ? `आपकी इन्वेंटरी में ${matchingInventory.quantityQuintals} क्विंटल उपलब्ध है`
                          : `You have ${matchingInventory.quantityQuintals} Qtl in your inventory`}
                      </span>
                    </span>
                    <span className="text-[11px] text-emerald-700 font-medium">
                      {lang === "hi" ? "मांग:" : "Ask:"} ₹{matchingInventory.expectedPricePerQuintal}
                    </span>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-[11px] text-slate-500 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>
                      {lang === "hi"
                        ? "इस फसल के लिए कोई सक्रिय लिस्टिंग नहीं है। फिर भी आप सीधा ऑफर भेज सकते हैं।"
                        : "No active listing currently matching this crop. You can still submit an offer."}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleOpenCommitModal(req)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-xs transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{lang === "hi" ? "उपज ऑफर भेजें" : "Commit Lot / Submit Supply Offer"}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Commit Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-emerald-100 overflow-hidden">
            <div className="px-6 py-4 bg-[#F0FDF4] border-b border-emerald-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base font-display">
                  {lang === "hi" ? "सप्लाई ऑफर भेजें" : "Submit Supply Offer"}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {lang === "hi" ? `सीधे ${selectedRequest.buyerCompany} को` : `Direct to ${selectedRequest.buyerCompany}`}
                </p>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {commitSuccessMsg ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm font-display">
                  {lang === "hi" ? "ऑफर सफलतापूर्वक भेजा गया!" : "Supply Offer Submitted!"}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {commitSuccessMsg}
                </p>
              </div>
            ) : (
              <form onSubmit={handleCommitSubmit} className="p-6 space-y-4 text-xs">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-500">{lang === "hi" ? "अनुरोधित फसल:" : "Crop Requested:"}</span>
                    <span className="font-bold text-slate-900">{translateCrop(selectedRequest.cropName, lang)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-500">{lang === "hi" ? "खरीदार का भाव:" : "Target Rate:"}</span>
                    <span className="font-bold text-emerald-700 font-display">₹{selectedRequest.targetPricePerQuintal}/{lang === "hi" ? "क्विंटल" : "Qtl"}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-500">{lang === "hi" ? "कुल आवश्यकता:" : "Total Needed:"}</span>
                    <span className="font-bold text-slate-900">{selectedRequest.quantityRequiredQuintals} {t("common.quintals", lang)}</span>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {lang === "hi" ? "आप कितनी मात्रा देना चाहते हैं (क्विंटल):" : "Volume you want to commit (Quintals):"}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={selectedRequest.quantityRequiredQuintals}
                    value={commitQty}
                    onChange={(e) => setCommitQty(Math.max(1, Number(e.target.value)))}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block font-medium">
                    {lang === "hi"
                      ? `अनुमानित व्यापार मूल्य: ₹${(commitQty * selectedRequest.targetPricePerQuintal).toLocaleString()} (KisanEscrow द्वारा सुरक्षित)`
                      : `Estimated trade value: ₹${(commitQty * selectedRequest.targetPricePerQuintal).toLocaleString()} (settled via KisanEscrow)`}
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {lang === "hi" ? "खेत से प्रेषण (Dispatch) की अनुमानित तारीख:" : "Expected Dispatch Date from Farm:"}
                  </label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer shadow-xs flex items-center justify-center gap-2"
                >
                  {submitting 
                    ? (lang === "hi" ? "ऑफर भेजा जा रहा है..." : "Submitting Offer...") 
                    : (lang === "hi" ? "पुष्टि करें और खरीदार को भेजें" : "Confirm & Send Offer to Buyer")}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

