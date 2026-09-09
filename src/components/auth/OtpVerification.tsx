import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, 
  ShieldCheck, 
  RotateCw, 
  Loader2, 
  AlertCircle, 
  CheckCircle2,
  Edit2
} from "lucide-react";
import { UserRole } from "../../types/auth";

interface OtpVerificationProps {
  phone: string;
  role: UserRole;
  onBack: () => void;
  onVerifySuccess: (otp: string) => void;
  onResendOtp?: () => void;
}

export const OtpVerification: React.FC<OtpVerificationProps> = ({
  phone,
  role,
  onBack,
  onVerifySuccess,
  onResendOtp
}) => {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [resendNotification, setResendNotification] = useState<string | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Mask phone for privacy (e.g. +91 98••• ••210)
  const maskedPhone = phone.length >= 10
    ? `+91 ${phone.slice(0, 2)}••• ••${phone.slice(-3)}`
    : `+91 ${phone}`;

  // Auto-focus first box on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  // Handle single digit input
  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, "");
    if (!rawVal) {
      // User emptied the cell
      const next = [...digits];
      next[index] = "";
      setDigits(next);
      return;
    }

    const singleDigit = rawVal.slice(-1);
    const next = [...digits];
    next[index] = singleDigit;
    setDigits(next);
    if (error) setError(null);

    // Auto-advance to next input
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Keyboard navigation: backspace and arrow keys
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        e.preventDefault();
        const next = [...digits];
        next[index - 1] = "";
        setDigits(next);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Support pasting full 6-digit OTP
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pastedData) return;

    const next = [...digits];
    for (let i = 0; i < 6; i++) {
      next[i] = pastedData[i] || "";
    }
    setDigits(next);
    if (error) setError(null);

    // Focus last filled box
    const targetFocus = Math.min(pastedData.length, 5);
    inputRefs.current[targetFocus]?.focus();
  };

  // Resend OTP action
  const handleResend = () => {
    if (countdown > 0) return;
    setCountdown(30);
    setDigits(["", "", "", "", "", ""]);
    setError(null);
    setResendNotification("A fresh 6-digit code has been sent via SMS.");
    inputRefs.current[0]?.focus();
    onResendOtp?.();

    setTimeout(() => {
      setResendNotification(null);
    }, 4000);
  };

  // Form submission
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = digits.join("");

    if (fullOtp.length < 6) {
      setError("Please enter the complete 6-digit verification code");
      return;
    }

    setIsVerifying(true);
    // Simulate network authentication handshake
    setTimeout(() => {
      setIsVerifying(false);
      onVerifySuccess(fullOtp);
    }, 600);
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      {/* Back Button */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-ink-500 hover:text-ink-950 transition-colors cursor-pointer py-1.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg"
          aria-label="Back to phone number entry"
        >
          <ArrowLeft className="w-4 h-4 text-ink-500" aria-hidden="true" />
          <span>Change phone number</span>
        </button>
      </div>

      {/* Header & Masked Phone Display */}
      <div className="space-y-2 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-950 tracking-tight font-display">
          Verify your number
        </h2>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-ink-500">
          <span>Sent 6-digit SMS code to</span>
          <span className="font-bold text-ink-950 bg-surface-100 px-2 py-0.5 rounded-md border border-surface-200 inline-flex items-center gap-1.5">
            <span>{maskedPhone}</span>
            <button
              type="button"
              onClick={onBack}
              title="Edit number"
              aria-label="Edit phone number"
              className="text-brand-600 hover:text-brand-700 cursor-pointer p-0.5"
            >
              <Edit2 className="w-3 h-3" />
            </button>
          </span>
        </div>
      </div>

      {/* Interactive Helper Banner */}
      <div className="p-3 rounded-2xl bg-brand-50 border border-brand-200/80 flex items-start gap-2.5 text-xs text-brand-700">
        <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="font-bold text-brand-700">Instant Verification Active</p>
          <p className="text-[11px] text-brand-600 font-normal mt-0.5">
            Enter <strong className="font-mono font-bold">123456</strong> or any 6-digit OTP to proceed directly.
          </p>
        </div>
      </div>

      {/* Main OTP Input Form */}
      <form onSubmit={handleVerify} className="space-y-6" noValidate>
        <div>
          <label id="otp-inputs-label" className="sr-only">
            Enter 6-digit one-time password
          </label>

          {/* 6 OTP Input Boxes */}
          <div 
            role="group" 
            aria-labelledby="otp-inputs-label"
            className="flex items-center justify-between gap-1.5 sm:gap-2.5"
            onPaste={handlePaste}
          >
            {digits.map((digit, idx) => {
              const isFilled = Boolean(digit);
              return (
                <input
                  key={idx}
                  ref={(el) => { inputRefs.current[idx] = el; }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  autoComplete={idx === 0 ? "one-time-code" : "off"}
                  value={digit}
                  disabled={isVerifying}
                  aria-label={`Digit ${idx + 1} of 6`}
                  aria-invalid={error ? "true" : "false"}
                  onChange={(e) => handleChange(idx, e)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className={`w-11 h-13 sm:w-13 sm:h-14 text-center text-xl sm:text-2xl font-bold font-mono rounded-2xl border transition-all duration-150 focus:outline-hidden focus:ring-2 disabled:opacity-60 ${
                    error
                      ? "border-red-400 text-red-700 bg-red-50/40 focus:border-red-500 focus:ring-red-100"
                      : isFilled
                      ? "border-brand-500 text-brand-700 bg-brand-50/30 focus:border-brand-600 focus:ring-brand-100"
                      : "border-surface-200 text-ink-950 bg-white focus:border-brand-500 focus:ring-brand-100"
                  }`}
                />
              );
            })}
          </div>

          {/* Accessible Error / Feedback */}
          {error && (
            <div 
              role="alert" 
              aria-live="polite"
              className="flex items-center gap-1.5 text-xs text-red-600 font-medium mt-2.5 animate-in fade-in duration-150"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          {/* Resend Confirmation Toast */}
          {resendNotification && (
            <div 
              role="status" 
              aria-live="polite"
              className="flex items-center gap-1.5 text-xs text-brand-700 bg-brand-50 border border-brand-200 p-2 rounded-xl mt-2.5 animate-in fade-in duration-150"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0" aria-hidden="true" />
              <span>{resendNotification}</span>
            </div>
          )}
        </div>

        {/* Primary CTA: Verify */}
        <button
          type="submit"
          disabled={isVerifying || digits.join("").length < 6}
          className="w-full min-h-[48px] px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-150 shadow-sm hover:shadow-md cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-500 disabled:shadow-none"
        >
          {isVerifying ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
              <span>Verifying code...</span>
            </>
          ) : (
            <span>Verify & Continue</span>
          )}
        </button>

        {/* Resend Timer & Action */}
        <div className="text-center pt-1">
          {countdown > 0 ? (
            <p className="text-xs text-ink-500 font-medium">
              Didn't receive the SMS? Resend code in{" "}
              <span className="font-mono font-bold text-ink-700">
                0:{countdown < 10 ? `0${countdown}` : countdown}
              </span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-700 underline underline-offset-4 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm"
            >
              <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Resend OTP</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
