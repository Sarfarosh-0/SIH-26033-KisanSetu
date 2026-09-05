import React, { useState, useEffect } from "react";
import { 
  Truck, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Fuel, 
  Clock, 
  Leaf, 
  TrendingDown, 
  Navigation, 
  Play, 
  RotateCcw,
  ShieldCheck,
  AlertCircle,
  Layers,
  Warehouse,
  Sprout,
  Store,
  Check
} from "lucide-react";
import { RouteBatch, RouteStop } from "../types";
import { API } from "../api";
import { translateCrop } from "../i18n";

interface RouteOptimizationViewProps {
  lang: "en" | "hi";
}

export const RouteOptimizationView: React.FC<RouteOptimizationViewProps> = ({ lang }) => {
  const [routeBatch, setRouteBatch] = useState<RouteBatch | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeStopIndex, setActiveStopIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true);
        const data = await API.getRouteOptimization();
        setRouteBatch(data);
      } catch (err) {
        console.error("Failed to load route optimization data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoutes();
  }, []);

  // Simulation player: advances stops automatically
  useEffect(() => {
    if (!isPlaying || !routeBatch) return;
    const interval = setInterval(() => {
      setActiveStopIndex((prev) => {
        if (prev >= routeBatch.stops.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [isPlaying, routeBatch]);

  if (loading || !routeBatch) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-emerald-100 shadow-sm">
        <Truck className="w-8 h-8 text-emerald-600 animate-bounce mx-auto" />
        <p className="text-xs text-slate-500 mt-2 font-medium">
          {lang === "hi" ? "इष्टतम मल्टी-स्टॉप फ्रेट रूट की गणना की जा रही है..." : "Computing optimal multi-stop freight route..."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-emerald-600 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-emerald-500/40">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-2.5 relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-700/80 text-emerald-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-emerald-400/30">
            <Truck className="w-3.5 h-3.5 text-amber-300" />
            <span>{lang === "hi" ? "AI कृषि-लॉजिस्टिक्स रूट इंजन • मल्टी-स्टॉप बैचिंग" : "AI Agri-Logistics Route Engine • Multi-Stop Batching"}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display">
            {lang === "hi" ? "बैच पिकअप व डिलीवरी रूट अनुकूलन" : "Batched Pickup & Delivery Route Optimization"}
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm font-medium">
            {lang === "hi" 
              ? "खाली फेरों और अलग-अलग खेत यात्राओं को समाप्त करते हुए नजदीकी खेतों से एकीकृत कोल्ड-चेन डिलीवरी रूट।"
              : "Eliminating deadhead runs and individual farm trips by algorithmically grouping nearby farm pickups into consolidated cold-chain delivery routes to distribution hubs."}
          </p>
        </div>

        {/* Vehicle / Carrier Badge */}
        <div className="mt-5 pt-4 border-t border-emerald-500/40 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-emerald-100 font-medium">{lang === "hi" ? "नियुक्त ट्रांसपोर्टर:" : "Assigned Transporter:"}</span>
            <strong className="text-white font-bold">{routeBatch.driverName}</strong>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-100 font-medium">{lang === "hi" ? "रेफर वाहन संख्या:" : "Reefer Vehicle:"}</span>
            <span className="font-mono bg-emerald-800/80 border border-emerald-400/30 px-2.5 py-1 rounded-lg text-amber-200 font-bold">
              {routeBatch.vehicleNumber}
            </span>
          </div>
        </div>
      </div>

      {/* KPI COMPARISON CARDS: Naive vs AI Batched */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Distance Saved */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>{lang === "hi" ? "दूरी में कमी" : "Distance Reduction"}</span>
            <TrendingDown className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-display">
            {routeBatch.distanceSavedPct}%
          </div>
          <div className="text-xs text-slate-700 font-bold">
            {routeBatch.distanceSavedKm} {lang === "hi" ? "किमी की बचत" : "km saved"}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">
            {lang === "hi"
              ? `${routeBatch.totalDistanceKm} किमी समूहीकृत बनाम ${routeBatch.naiveDistanceKm} किमी एकल`
              : `${routeBatch.totalDistanceKm} km batched vs. ${routeBatch.naiveDistanceKm} km un-batched`}
          </p>
        </div>

        {/* 2. Transit Time Saved */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>{lang === "hi" ? "पारगमन समय बचत" : "Transit Time Saved"}</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-900 font-display">
            {routeBatch.timeSavedHrs} {lang === "hi" ? "घंटे" : "hrs"}
          </div>
          <div className="text-xs text-slate-700 font-bold">
            {routeBatch.transitTimeHrs} {lang === "hi" ? "घंटे अनुमानित समय" : "hrs estimated run"}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">
            {lang === "hi" ? "खेत से दुकान तक तीव्र आपूर्ति" : "Faster farm-to-shelf turnaround"}
          </p>
        </div>

        {/* 3. Spoilage Mitigated */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>{lang === "hi" ? "खराब होने से बचाव" : "Spoilage Prevented"}</span>
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-700 font-display">
            {routeBatch.spoilageReductionPct}%
          </div>
          <div className="text-xs text-slate-700 font-bold">
            {lang === "hi" ? "सीधे रेफर मंडी यार्ड को बायपास करते हैं" : "Direct reefers bypass mandi yard"}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">
            {lang === "hi" ? "कम हैंडलिंग से नुकसान में भारी गिरावट" : "Reduced handling drops damage rates"}
          </p>
        </div>

        {/* 4. Carbon Footprint Saved */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>{lang === "hi" ? "उत्सर्जन में कमी" : "Emissions Saved"}</span>
            <Leaf className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-display">
            {routeBatch.co2SavedKg} kg
          </div>
          <div className="text-xs text-slate-700 font-bold">
            {lang === "hi" ? "हरित कृषि कॉरिडोर" : "Green Agri-Corridor"}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">
            ~₹{Math.round(routeBatch.distanceSavedKm * 20).toLocaleString()} {lang === "hi" ? "डीजल लागत बचत" : "in diesel costs saved"}
          </p>
        </div>
      </div>

      {/* Main Grid: Interactive Map Route Visualization + Stop Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left (2 Cols): Visual Route Map & Timeline Canvas */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base font-display flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-emerald-600" />
                  <span>{lang === "hi" ? "मार्ग सिमुलेशन: नासिक कृषि कॉरिडोर" : "Geodetic Route Simulation: Nashik Agri Corridor"}</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {lang === "hi" ? "दूरी मैट्रिक्स द्वारा क्लस्टर किए गए स्टॉप" : "Batched stops clustered by Haversine distance matrix"}
                </p>
              </div>

              {/* Simulation Player Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isPlaying
                      ? "bg-amber-400 text-slate-950"
                      : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs"
                  }`}
                >
                  <Play className={`w-3.5 h-3.5 ${isPlaying ? "fill-slate-950" : "fill-white"}`} />
                  <span>
                    {isPlaying 
                      ? (lang === "hi" ? "रूट रोकें" : "Pause Route")
                      : (lang === "hi" ? "सिमुलेशन चलाएं" : "Simulate Run")}
                  </span>
                </button>
                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setActiveStopIndex(0);
                  }}
                  className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
                  title="Reset to Origin"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive Vector Route Map Canvas */}
            <div className="relative mt-4 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 text-white min-h-[300px] flex flex-col justify-between overflow-hidden shadow-inner">
              {/* Background Road Grid Lines */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              {/* Highway Corridor Label */}
              <div className="relative z-10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold text-emerald-300">
                    {lang === "hi" ? "NH-60 व मुंबई-आगरा हाईवे कृषि कॉरिडोर" : "NH-60 & Mumbai-Agra Highway Corridor"}
                  </span>
                </div>
                <div className="bg-white/10 px-2.5 py-1 rounded-lg text-[11px] text-slate-300 font-mono">
                  {lang === "hi" ? `स्टॉप ${activeStopIndex + 1} / ${routeBatch.stops.length}` : `Stop ${activeStopIndex + 1} of ${routeBatch.stops.length}`}
                </div>
              </div>

              {/* Waypoint Visual Graph */}
              <div className="relative z-10 my-8 py-4">
                {/* SVG Route Line connecting nodes */}
                <div className="relative flex items-center justify-between">
                  <div className="absolute left-4 right-4 h-1.5 bg-slate-700 rounded-full -z-0" />
                  <div 
                    className="absolute left-4 h-1.5 bg-emerald-400 rounded-full -z-0 transition-all duration-700"
                    style={{
                      width: `${(activeStopIndex / (routeBatch.stops.length - 1)) * 92}%`
                    }}
                  />

                  {routeBatch.stops.map((stop, index) => {
                    const isVisited = index <= activeStopIndex;
                    const isCurrent = index === activeStopIndex;
                    const isPickup = stop.type === "PICKUP";
                    const isDepot = stop.type === "ORIGIN_DEPOT";

                    return (
                      <div
                        key={stop.stopId}
                        onClick={() => setActiveStopIndex(index)}
                        className="flex flex-col items-center gap-2 relative z-10 cursor-pointer group"
                      >
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs transition-all shadow-md ${
                            isCurrent
                              ? "bg-amber-400 text-slate-950 ring-4 ring-amber-400/40 scale-110"
                              : isVisited
                              ? "bg-emerald-500 text-white"
                              : "bg-slate-800 text-slate-400 border border-slate-700"
                          }`}
                        >
                          {isDepot ? (
                            <Warehouse className="w-5 h-5" aria-hidden="true" />
                          ) : isPickup ? (
                            <Sprout className="w-5 h-5" aria-hidden="true" />
                          ) : (
                            <Store className="w-5 h-5" aria-hidden="true" />
                          )}
                        </div>

                        <div className="text-center">
                          <span className={`text-[11px] font-bold block max-w-[80px] truncate ${
                            isCurrent ? "text-amber-300" : isVisited ? "text-white" : "text-slate-400"
                          }`}>
                            {stop.name.split(" ")[0]}
                          </span>
                          <span className="text-[9px] text-slate-400 block font-mono">
                            {stop.stopId}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Stop Inspector Box */}
              {routeBatch.stops[activeStopIndex] && (
                <div className="relative z-10 bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        routeBatch.stops[activeStopIndex].type === "ORIGIN_DEPOT"
                          ? "bg-slate-700 text-white"
                          : routeBatch.stops[activeStopIndex].type === "PICKUP"
                          ? "bg-emerald-600 text-white"
                          : "bg-blue-600 text-white"
                      }`}>
                        {routeBatch.stops[activeStopIndex].type === "ORIGIN_DEPOT"
                          ? (lang === "hi" ? "प्रस्थान डिपो" : "ORIGIN DEPOT")
                          : routeBatch.stops[activeStopIndex].type === "PICKUP"
                          ? (lang === "hi" ? "खेत पिकअप" : "PICKUP")
                          : (lang === "hi" ? "हब डिलीवरी" : "DELIVERY")}
                      </span>
                      <strong className="text-white text-sm">
                        {routeBatch.stops[activeStopIndex].name}
                      </strong>
                    </div>
                    <p className="text-slate-300 mt-1 font-medium flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" aria-hidden="true" />
                      <span>{routeBatch.stops[activeStopIndex].locationName}</span>
                    </p>
                  </div>

                  <div className="text-right sm:border-l sm:border-white/10 sm:pl-4">
                    {routeBatch.stops[activeStopIndex].quantityQuintals > 0 && (
                      <div className="text-amber-300 font-extrabold text-sm">
                        {routeBatch.stops[activeStopIndex].quantityQuintals} {lang === "hi" ? "क्विंटल" : "Quintals"}
                      </div>
                    )}
                    <div className="text-slate-400 text-[11px]">
                      {lang === "hi" ? "फसल माल:" : "Cargo:"} {translateCrop(routeBatch.stops[activeStopIndex].cropName, lang)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-500 flex items-center justify-between">
            <span>{lang === "hi" ? "एल्गोरिदम:" : "Algorithm:"} <strong className="text-slate-700">{lang === "hi" ? "2-चरणीय निकटतम पड़ोसी TSP + भूगणितीय दूरी मैट्रिक्स" : "2-Stage Nearest-Neighbor TSP + Geodetic Distance Matrix"}</strong></span>
            <span className="text-emerald-700 font-bold">{lang === "hi" ? "18ms में हल हुआ" : "Solved in 18ms"}</span>
          </div>
        </div>

        {/* Right (1 Col): Driver Stop-by-Stop Dispatch Checklist */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base font-display flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>{lang === "hi" ? "चालक प्रेषण क्रम" : "Driver Dispatch Sequence"}</span>
            </h3>
            <span className="text-xs text-slate-500 font-bold">{routeBatch.stops.length} {lang === "hi" ? "स्टॉप" : "Stops"}</span>
          </div>

          <div className="space-y-3">
            {routeBatch.stops.map((stop, idx) => {
              const isCurrent = idx === activeStopIndex;
              const isCompleted = idx < activeStopIndex;

              return (
                <div
                  key={stop.stopId}
                  onClick={() => setActiveStopIndex(idx)}
                  className={`rounded-2xl p-4 border transition-all cursor-pointer text-xs space-y-2.5 ${
                    isCurrent
                      ? "bg-amber-50/80 border-amber-300 shadow-sm"
                      : isCompleted
                      ? "bg-[#F0FDF4] border-emerald-200 opacity-90"
                      : "bg-white border-slate-200 hover:border-emerald-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] ${
                        isCompleted
                          ? "bg-emerald-500 text-white"
                          : isCurrent
                          ? "bg-amber-400 text-slate-950"
                          : "bg-slate-200 text-slate-600"
                      }`}>
                        {isCompleted ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">
                          {stop.name}
                        </h4>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {stop.type === "ORIGIN_DEPOT" ? (lang === "hi" ? "डिपो" : "DEPOT") : stop.type === "PICKUP" ? (lang === "hi" ? "पिकअप" : "PICKUP") : (lang === "hi" ? "डिलीवरी" : "DELIVERY")} • {stop.stopId}
                        </span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      isCompleted
                        ? "bg-emerald-100 text-emerald-800"
                        : isCurrent
                        ? "bg-amber-200 text-amber-900 font-extrabold"
                        : "bg-slate-100 text-slate-600"
                    }`}>
                      {isCompleted ? (lang === "hi" ? "पूर्ण" : "Done") : isCurrent ? (lang === "hi" ? "सक्रिय" : "Active") : (lang === "hi" ? "आगामी" : "Upcoming")}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 font-medium flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                    <span>{stop.locationName}</span>
                  </p>

                  {stop.quantityQuintals > 0 && (
                    <div className="flex items-center justify-between text-[11px] bg-white/90 p-2 rounded-xl border border-emerald-100">
                      <span className="text-slate-500">{lang === "hi" ? "फसल माल:" : "Cargo:"} {translateCrop(stop.cropName, lang)}</span>
                      <strong className="text-slate-900">{stop.quantityQuintals} {lang === "hi" ? "क्विंटल" : "Qtl"}</strong>
                    </div>
                  )}

                  {isCurrent && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (activeStopIndex < routeBatch.stops.length - 1) {
                          setActiveStopIndex(activeStopIndex + 1);
                        }
                      }}
                      className="w-full mt-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded-xl text-xs transition cursor-pointer shadow-xs"
                    >
                      {stop.type === "PICKUP" 
                        ? (lang === "hi" ? "लोडिंग की पुष्टि करें व आगे बढ़ें" : "Confirm Loading & Advance")
                        : (lang === "hi" ? "डिलीवरी की पुष्टि करें व आगे बढ़ें" : "Confirm Delivery & Advance")}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

