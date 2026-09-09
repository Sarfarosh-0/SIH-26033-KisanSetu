import React from "react";
import { ArrowLeft } from "lucide-react";
import { BrandPanel } from "./BrandPanel";

interface AuthLayoutProps {
  children: React.ReactNode;
  onBackToApp?: () => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, onBackToApp }) => {
  return (
    <div className="min-h-screen w-full bg-surface-50 flex flex-col lg:flex-row antialiased selection:bg-brand-100 selection:text-brand-700">
      {/* Left Column: Brand and Feature Value Proposition Panel */}
      <BrandPanel />

      {/* Right Column: Authentication Form Panel */}
      <main 
        id="auth-content"
        className="flex-1 flex flex-col justify-between p-4 sm:p-6 lg:p-8 xl:p-10 overflow-y-auto relative bg-gradient-to-br from-surface-50 via-white to-brand-50/30"
      >
        {/* Subtle decorative ambient background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-[15%] right-[-5%] w-72 h-72 bg-brand-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-[20%] left-[-8%] w-64 h-64 bg-surface-200/50 rounded-full blur-3xl" />
          <div className="absolute top-[60%] right-[30%] w-48 h-48 bg-brand-50/60 rounded-full blur-3xl" />
        </div>

        {/* Contextual top utility bar — outside the card */}
        <div className="relative z-10 w-full max-w-[480px] mx-auto flex justify-between items-center text-xs text-ink-500 mb-2 sm:mb-3">
          {onBackToApp ? (
            <button
              type="button"
              onClick={onBackToApp}
              className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-700 bg-white/70 backdrop-blur-sm hover:bg-brand-50 px-3 py-1 rounded-full border border-brand-200/80 transition-colors cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Explore Marketplace</span>
            </button>
          ) : (
            <div />
          )}

          <span className="inline-flex items-center gap-1.5 bg-white/70 backdrop-blur-sm px-2.5 py-0.5 sm:py-1 rounded-full border border-surface-200/80 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" aria-hidden="true" />
            <span className="font-semibold text-ink-700 text-[11px] sm:text-xs">Secure Direct Access</span>
          </span>
        </div>

        {/* Floating Glass Card */}
        <div className="relative z-10 w-full max-w-[480px] mx-auto my-auto">
          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-xl p-5 sm:p-7 overflow-hidden">
            {/* Brand accent gradient top bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600" aria-hidden="true" />
            {children}
          </div>
        </div>

        {/* Bottom subtle copyright / legal line — outside the card */}
        <div className="relative z-10 w-full max-w-[480px] mx-auto pt-3 sm:pt-4 text-center text-[10px] sm:text-[11px] text-ink-500/60">
          © 2026 किसानSetu Technologies Private Limited. All rights reserved.
        </div>
      </main>
    </div>
  );
};

