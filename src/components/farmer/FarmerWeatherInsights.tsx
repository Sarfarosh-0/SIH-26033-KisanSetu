import React, { useState } from "react";
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  Thermometer, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight,
  Sun,
  CloudRain
} from "lucide-react";
import { User } from "../../types";
import { MOCK_WEATHER_FORECAST } from "../../data/mockAgriData";
import { AIPricingDashboard } from "../AIPricingDashboard";

interface FarmerWeatherInsightsProps {
  farmer: User;
  lang: "en" | "hi";
}

export const FarmerWeatherInsights: React.FC<FarmerWeatherInsightsProps> = ({
  farmer,
  lang
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const activeDay = MOCK_WEATHER_FORECAST[selectedDayIndex];

  const translateDay = (day: string) => {
    if (lang !== "hi") return day;
    const map: Record<string, string> = {
      "Today": "आज",
      "Tomorrow": "कल",
      "Wed": "बुध",
      "Thu": "गुरु",
      "Fri": "शुक्र",
      "Sat": "शनि",
      "Sun": "रवि",
      "Mon": "सोम",
      "Tue": "मंगल"
    };
    return map[day] || day;
  };

  const translateCondition = (cond: string) => {
    if (lang !== "hi") return cond;
    if (cond.includes("Sunny") || cond.includes("Clear")) return "साफ व धूप";
    if (cond.includes("Partly Cloudy")) return "आंशिक बादल";
    if (cond.includes("Rain") || cond.includes("Showers")) return "हल्की बारिश";
    if (cond.includes("Overcast")) return "घने बादल";
    return cond;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wide">
              {lang === "hi" ? "स्थानीय मौसम व मंडी भाव" : "Hyper-Local Weather & Mandi Intelligence"}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              • {lang === "hi" ? "एगमार्कनेट लाइव मानक" : "Agmarknet Live Benchmark"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2 font-display">
            {lang === "hi" ? "मौसम सलाह व मूल्य अंतर्दृष्टि" : "Harvest Weather Advisory & Mandi Price Insights"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
            {lang === "hi"
              ? `${farmer.district}, ${farmer.state} के लिए वास्तविक समय का मौसम पूर्वानुमान व राष्ट्रीय एगमार्कनेट मंडी भाव रुझान।`
              : `Real-time agro-meteorological forecasting for ${farmer.district}, ${farmer.state} paired with national Agmarknet price movements.`}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#F0FDF4] px-4 py-2 rounded-2xl border border-emerald-200 text-xs font-bold text-emerald-800">
          <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{lang === "hi" ? `मौसम केंद्र: ${farmer.district} कृषि वेधशाला` : `Station: ${farmer.district} Agromet Observatory`}</span>
        </div>
      </div>

      {/* 5-Day Agro-Weather Forecast Carousel */}
      <div className="bg-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-64 h-64 bg-emerald-700/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                {lang === "hi" ? "5-दिवसीय कृषि मौसम पूर्वानुमान" : "5-Day Agricultural Weather Forecast"}
              </span>
              <h3 className="text-xl font-bold font-display text-white mt-1">
                {lang === "hi" ? `${farmer.district}, ${farmer.state} में खेत की स्थिति` : `Field Conditions for ${farmer.district}, ${farmer.state}`}
              </h3>
            </div>
            <span className="text-xs bg-emerald-700 text-emerald-100 px-3 py-1 rounded-full border border-emerald-600 font-medium self-start sm:self-auto">
              {lang === "hi" ? "20 मिनट पहले अपडेट किया गया" : "Updated 20 mins ago"}
            </span>
          </div>

          {/* 5-Day Card Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {MOCK_WEATHER_FORECAST.map((item, idx) => {
              const isSelected = idx === selectedDayIndex;
              return (
                <button
                  key={item.day}
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-white text-slate-900 border-white shadow-md scale-[1.02]"
                      : "bg-emerald-900/60 text-emerald-100 border-emerald-700/60 hover:bg-emerald-700/60"
                  }`}
                >
                  <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                    <span>{translateDay(item.day)}</span>
                    <span className={isSelected ? "text-slate-400" : "text-emerald-300"}>
                      {item.date}
                    </span>
                  </div>

                  <div className="my-2">
                    {item.rainProbability > 40 ? (
                      <CloudRain className={`w-6 h-6 ${isSelected ? "text-blue-500" : "text-blue-300"}`} />
                    ) : item.rainProbability > 20 ? (
                      <CloudSun className={`w-6 h-6 ${isSelected ? "text-amber-500" : "text-amber-300"}`} />
                    ) : (
                      <Sun className={`w-6 h-6 ${isSelected ? "text-amber-400" : "text-amber-300"}`} />
                    )}
                  </div>

                  <div className="text-sm font-extrabold font-display">
                    {item.tempMax}° / <span className="font-normal text-xs">{item.tempMin}°C</span>
                  </div>
                  <div className={`text-[11px] mt-1 font-medium ${isSelected ? "text-slate-600" : "text-emerald-200"}`}>
                    {lang === "hi" ? "वर्षा" : "Rain"}: {item.rainProbability}%
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Day Advisory */}
          <div className="bg-emerald-900/80 backdrop-blur rounded-2xl p-5 border border-emerald-700/60 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-700/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">
                  {translateDay(activeDay.day)} ({activeDay.date}) {lang === "hi" ? "स्थिति:" : "Condition:"}
                </span>
                <span className="bg-emerald-700 text-amber-300 font-bold px-2.5 py-0.5 rounded-lg text-xs">
                  {translateCondition(activeDay.condition)}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-emerald-200 font-medium">
                <span className="flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-blue-300" />
                  <span>{lang === "hi" ? "आर्द्रता:" : "Humidity:"} {activeDay.humidity}%</span>
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{lang === "hi" ? "हवा:" : "Wind:"} {activeDay.windSpeedKmh} {lang === "hi" ? "किमी/घंटा" : "km/h"}</span>
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  {lang === "hi" ? "कृषि फसल कटाई सलाह:" : "Agronomic Harvesting Advisory:"}
                </span>
                <p className="text-xs text-white leading-relaxed font-medium mt-0.5">
                  {lang === "hi"
                    ? (activeDay.rainProbability > 30
                        ? "संभावित वर्षा को देखते हुए कटी हुई फसल को तुरंत तिरपाल से ढकें और सुरक्षित गोदाम में रखें।"
                        : "मौसम सूखा और अनुकूल है। कटाई, सुखाई और ग्रेडिंग का काम जारी रख सकते हैं।")
                    : activeDay.advisory}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Agmarknet Mandi Pricing & AI Fair Price Engine */}
      <div className="space-y-4 pt-2">
        <AIPricingDashboard lang={lang} />
      </div>
    </div>
  );
};

