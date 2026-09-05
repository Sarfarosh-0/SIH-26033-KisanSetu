import React from "react";
import { 
  Sprout, 
  TrendingUp, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight
} from "lucide-react";

export const BrandPanel: React.FC = () => {
  const featureCards = [
    {
      icon: TrendingUp,
      title: "AI Fair Pricing",
      description: "Live Agmarknet mandi intelligence and seasonal trend analysis protect your profit margins.",
      badge: "Real-time APMC"
    },
    {
      icon: ShieldCheck,
      title: "Verified Buyers",
      description: "Direct contracts with verified institutional buyers, processors, and retail chains with escrow guarantee.",
      badge: "Bank-Grade Escrow"
    },
    {
      icon: Truck,
      title: "Smart Logistics",
      description: "Consolidated multi-stop cold-chain routing minimizing transit loss and freight overhead.",
      badge: "Cold-Chain Ready"
    }
  ];

  return (
    <aside 
      aria-label="किसानSetu Overview & Value Proposition"
      className="relative hidden lg:flex lg:w-5/12 xl:w-1/2 flex-col justify-between p-8 xl:p-12 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-white overflow-hidden select-none"
    >
      {/* Subtle modern geometric background lattice */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
        aria-hidden="true"
      />

      {/* Decorative soft organic glow */}
      <div 
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-500/30 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Section: Brand Identity */}
      <div className="relative z-10 space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white text-brand-600 flex items-center justify-center shadow-lg font-bold">
            <Sprout className="w-6 h-6 text-brand-600" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight text-white font-display">
                किसान<span className="text-brand-200">Setu</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-brand-700/60 text-brand-100 rounded-full border border-brand-500/30">
                Agri-Exchange
              </span>
            </div>
            <p className="text-xs text-brand-100/90 font-medium">
              National Digital Agriculture Platform
            </p>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="space-y-4 max-w-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-700/60 border border-brand-500/40 text-xs font-semibold text-brand-100">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" aria-hidden="true" />
            <span>Eliminate Middlemen • 0% Commission on Crops</span>
          </div>

          <h1 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight tracking-tight font-display">
            Grow more. <br />
            Earn fair. <br />
            <span className="text-brand-200">Sell direct.</span>
          </h1>

          <p className="text-sm xl:text-base text-brand-100/95 leading-relaxed font-normal">
            Connecting certified farmers, FPOs, and institutional buyers on a transparent digital exchange with real-time APMC mandi benchmarking and dual-custody escrow protection.
          </p>
        </div>
      </div>

      {/* Center Section: Three Compact Feature Cards */}
      <div className="relative z-10 my-8 space-y-3.5 max-w-lg">
        {featureCards.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div 
              key={idx}
              className="group p-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-xs border border-white/15 transition-all duration-200 shadow-xs"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-sm font-bold text-white tracking-tight">
                      {feature.title}
                    </h2>
                    <span className="text-[10px] font-semibold text-brand-200 bg-brand-700/50 px-2 py-0.5 rounded-md border border-brand-500/30 whitespace-nowrap">
                      {feature.badge}
                    </span>
                  </div>
                  <p className="text-xs text-brand-100/90 mt-1 leading-normal">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section: Verified Trust Bar */}
      <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-brand-100">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" aria-hidden="true" />
          <span className="font-medium">100% RBI-Compliant Escrow Settlement</span>
        </div>
        <div className="flex items-center gap-1 text-white/90 hover:text-white font-semibold text-[11px]">
          <span>Mandi Live</span>
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </div>
      </div>
    </aside>
  );
};
