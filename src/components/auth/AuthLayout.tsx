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
        className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 xl:p-16 overflow-y-auto"
      >
        {/* Contextual top utility bar */}
        <div className="w-full max-w-[448px] mx-auto flex justify-between items-center text-xs text-ink-500 mb-2">
          {onBackToApp ? (
            <button
              type="button"
              onClick={onBackToApp}
              className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3 py-1 rounded-full border border-brand-200/80 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Explore Marketplace</span>
            </button>
          ) : (
            <div />
          )}

          <span className="inline-flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-surface-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" aria-hidden="true" />
            <span className="font-semibold text-ink-700">Secure Direct Access</span>
          </span>
        </div>

        {/* Centered Form Wrapper (Max Width ~448px) */}
        <div className="w-full max-w-[448px] mx-auto my-auto py-4 sm:py-6">
          {children}
        </div>

        {/* Bottom subtle copyright / legal line for mobile/tablet alignment */}
        <div className="w-full max-w-[448px] mx-auto pt-6 text-center text-[11px] text-ink-500/70">
          © 2026 किसानSetu Technologies Private Limited. All rights reserved.
        </div>
      </main>
    </div>
  );
};

