import React, { useState } from "react";
import { Phone, ArrowRight, Loader2, AlertCircle, Sprout } from "lucide-react";
import { UserRole } from "../../types/auth";
import { RoleSelector } from "./RoleSelector";
import { SocialLogin } from "./SocialLogin";
import { AuthFooter } from "./AuthFooter";

interface PhoneLoginFormProps {
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
  onSubmitPhone: (phone: string) => void;
  onGoogleSuccess?: (role: UserRole) => void;
  initialPhone?: string;
}

export const PhoneLoginForm: React.FC<PhoneLoginFormProps> = ({
  role,
  onRoleChange,
  onSubmitPhone,
  onGoogleSuccess,
  initialPhone = ""
}) => {
  const [phone, setPhone] = useState(initialPhone);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // Clean numeric phone input handling (India 10-digit format)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (rawValue.length <= 10) {
      setPhone(rawValue);
      if (error) setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 0) {
      setError("Please enter your 10-digit mobile number");
      return;
    }
    if (phone.length < 10) {
      setError("Mobile number must be exactly 10 digits");
      return;
    }

    setIsSubmitting(true);
    // Simulate lightweight network dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitPhone(phone);
    }, 400);
  };

  // Format phone for visual clarity (e.g. 98765 43210)
  const formattedDisplay = phone.length > 5 
    ? `${phone.slice(0, 5)} ${phone.slice(5)}` 
    : phone;

  return (
    <div className="w-full space-y-3.5 sm:space-y-4 animate-in fade-in duration-200">
      {/* Mobile-only Brand Header */}
      <div className="lg:hidden flex flex-col items-center text-center space-y-1 mb-3">
        <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-md">
          <Sprout className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <span className="font-extrabold text-lg tracking-tight text-ink-950 font-display">
            किसान<span className="text-brand-500">Setu</span>
          </span>
          <p className="text-[11px] text-ink-500 font-medium">
            National Digital Agriculture Platform
          </p>
        </div>
      </div>

      {/* Header & Role-Adaptive Supporting Content */}
      <div className="space-y-0.5 text-center lg:text-left">
        <h2 className="text-xl sm:text-2xl font-extrabold text-ink-950 tracking-tight font-display">
          Welcome back 👋
        </h2>
        
        {/* Dynamic supporting text with compact min-height */}
        <div 
          id={`role-panel-${role}`}
          role="region" 
          aria-live="polite"
          className="min-h-[1.5rem] flex items-center justify-center lg:justify-start transition-opacity duration-200"
        >
          <p className="text-xs text-ink-500 leading-normal font-normal">
            {role === "farmer"
              ? "Access your crops, pricing insights and buyer requests."
              : "Discover fresh produce directly from verified farmers."}
          </p>
        </div>
      </div>

      {/* Segmented Role Selector */}
      <div className="pt-0.5">
        <RoleSelector 
          role={role} 
          onChange={onRoleChange} 
          disabled={isSubmitting} 
        />
      </div>

      {/* Main Phone Login Form */}
      <form onSubmit={handleSubmit} className="space-y-2.5 pt-0.5" noValidate>
        <div className="space-y-1.5 text-left">
          <label 
            htmlFor="phone-input" 
            className="flex items-center gap-2 text-xs font-bold text-ink-700"
          >
            <span className="w-0.5 h-3.5 bg-gradient-to-b from-brand-400 to-brand-600 rounded-full" aria-hidden="true" />
            Phone Number
          </label>

          <div 
            className={`relative flex items-center rounded-xl border transition-all duration-200 bg-white/90 shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)] ${
              error 
                ? "border-red-400 ring-2 ring-red-100" 
                : "border-surface-200/80 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 focus-within:shadow-none focus-within:bg-white"
            }`}
          >
            {/* Country Code Prefix */}
            <div className="pl-3 pr-2 py-2 flex items-center gap-1 border-r border-surface-200 text-ink-700 select-none">
              <span className="text-xs sm:text-sm font-bold">🇮🇳 +91</span>
            </div>

            {/* Input Field */}
            <div className="relative flex-1 flex items-center">
              <Phone 
                className="absolute left-3 w-3.5 h-3.5 text-ink-500 pointer-events-none" 
                aria-hidden="true" 
              />
              <input
                id="phone-input"
                name="phone"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="tel-national"
                placeholder="98765 43210"
                value={formattedDisplay}
                onChange={handlePhoneChange}
                disabled={isSubmitting}
                aria-describedby={error ? "phone-error" : "phone-hint"}
                aria-invalid={error ? "true" : "false"}
                className="w-full min-h-[40px] pl-8 pr-3 py-2 text-xs sm:text-sm font-semibold text-ink-950 placeholder:text-ink-500/60 bg-transparent rounded-r-xl focus:outline-hidden"
              />
            </div>
          </div>

          {/* Accessible Validation Feedback */}
          {error ? (
            <div 
              id="phone-error" 
              role="alert" 
              aria-live="polite"
              className="flex items-center gap-1.5 text-xs text-red-600 font-medium animate-in fade-in duration-150"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          ) : (
            <p id="phone-hint" className="text-[11px] text-ink-500 font-normal">
              We'll send a 6-digit one-time verification code via SMS
            </p>
          )}
        </div>

        {/* Primary CTA */}
        <button
          type="submit"
          disabled={isSubmitting || phone.length < 10}
          className="w-full min-h-[42px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 active:from-brand-700 active:to-brand-800 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-brand-500/20 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-brand-500 disabled:hover:to-brand-600 disabled:shadow-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              <span>Sending code...</span>
            </>
          ) : (
            <>
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center justify-center py-0.5">
        <div className="w-full border-t border-surface-200/60" aria-hidden="true" />
        <span className="absolute bg-white/80 backdrop-blur-sm px-3 text-[11px] uppercase tracking-wider font-semibold text-ink-400">
          OR
        </span>
      </div>

      {/* Google Alternative Login */}
      <SocialLogin 
        role={role} 
        onGoogleSuccess={onGoogleSuccess} 
        disabled={isSubmitting} 
      />

      {/* Auth Footer with Terms and Sign up Toggle */}
      <div className="pt-0.5">
        <AuthFooter 
          isSignUp={isSignUp} 
          onToggleSignUp={() => setIsSignUp(!isSignUp)} 
        />
      </div>
    </div>
  );
};
