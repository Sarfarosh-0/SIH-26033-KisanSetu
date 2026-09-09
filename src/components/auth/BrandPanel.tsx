import React from "react";
import { 
  Sprout, 
  MapPin, 
  Percent, 
  Lock, 
  ShieldCheck 
} from "lucide-react";

export const BrandPanel: React.FC = () => {
  return (
    <aside 
      aria-label="किसानSetu Overview & Value Proposition"
      className="relative hidden lg:flex lg:w-5/12 xl:w-1/2 flex-col justify-between p-6 sm:p-8 xl:p-10 bg-gradient-to-br from-[#06281E] via-[#083327] to-[#041A13] text-white overflow-hidden select-none border-r border-[#0E4233]"
    >
      {/* Subtle soft ambient glow in the corner */}
      <div 
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#10B981]/15 blur-3xl pointer-events-none" 
        aria-hidden="true"
      />
      <div 
        className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#059669]/10 blur-3xl pointer-events-none" 
        aria-hidden="true"
      />

      {/* Top Section: App Logo & Badge */}
      <div className="relative z-10 space-y-5 xl:space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#0F6A53] to-[#0B5745] flex items-center justify-center text-white shadow-xs border border-emerald-500/30 shrink-0">
            <Sprout className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" strokeWidth={2.2} aria-hidden="true" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white font-display">
              किसान<span className="text-[#4ADE80]">Setu</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#083024] text-emerald-300 rounded-full border border-emerald-500/30 shadow-2xs">
              National Agri-Exchange
            </span>
          </div>
        </div>

        {/* Hero Editorial Headline */}
        <div className="space-y-2.5 max-w-md">
          <h1 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-white leading-tight tracking-tight font-display">
            Fair Prices. Direct Trade. <br />
            <span className="text-[#4ADE80]">Guaranteed Payouts.</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#A7D7C5] leading-relaxed font-normal">
            Seamless agricultural trading, timely settlements, and direct connections between verified farmers, FPOs, and institutional buyers.
          </p>
        </div>
      </div>

      {/* Center Section: Minimalist 3-Stat Metric Strip */}
      <div className="relative z-10 my-4 xl:my-6">
        <div className="grid grid-cols-3 gap-2.5 py-4 border-y border-[#0E4233] max-w-md">
          {/* Stat 1 */}
          <div className="space-y-0.5">
            <div className="w-6 h-6 rounded-lg bg-[#0C382B] flex items-center justify-center text-[#4ADE80] mb-1.5 border border-emerald-500/20">
              <MapPin className="w-3 h-3" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
              2,400+
            </div>
            <div className="text-[11px] sm:text-xs text-[#A7D7C5] font-medium">
              Mandis Tracked
            </div>
          </div>

          {/* Stat 2 */}
          <div className="space-y-0.5 border-x border-[#0E4233] px-3 sm:px-4">
            <div className="w-6 h-6 rounded-lg bg-[#0C382B] flex items-center justify-center text-[#4ADE80] mb-1.5 border border-emerald-500/20">
              <Percent className="w-3 h-3" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#4ADE80] font-display tracking-tight">
              0%
            </div>
            <div className="text-[11px] sm:text-xs text-[#A7D7C5] font-medium">
              Commission Cut
            </div>
          </div>

          {/* Stat 3 */}
          <div className="space-y-0.5 pl-3 sm:pl-4">
            <div className="w-6 h-6 rounded-lg bg-[#0C382B] flex items-center justify-center text-[#4ADE80] mb-1.5 border border-emerald-500/20">
              <Lock className="w-3 h-3" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
              100%
            </div>
            <div className="text-[11px] sm:text-xs text-[#A7D7C5] font-medium">
              Escrow Protected
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Verified Trust Assurance */}
      <div className="relative z-10 pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-[#A7D7C5]">
        <div className="inline-flex items-center gap-1.5 bg-[#083024]/90 px-3 py-1 rounded-full border border-emerald-500/25 shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#4ADE80] shrink-0" aria-hidden="true" />
          <span className="font-semibold text-white text-[10px] sm:text-[11px]">
            Secured by RBI-compliant Escrow
          </span>
        </div>

        <span className="text-[10px] sm:text-[11px] text-[#A7D7C5]/80 font-medium">
          APMC Agmarknet Integrated
        </span>
      </div>
    </aside>
  );
};
