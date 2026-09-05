import React from "react";
import { Sprout, ShoppingBag } from "lucide-react";
import { UserRole } from "../../types/auth";

interface RoleSelectorProps {
  role: UserRole;
  onChange: (role: UserRole) => void;
  disabled?: boolean;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  role,
  onChange,
  disabled = false
}) => {
  const roles: Array<{ id: UserRole; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    {
      id: "farmer",
      label: "Farmer / FPO",
      icon: Sprout
    },
    {
      id: "buyer",
      label: "Buyer",
      icon: ShoppingBag
    }
  ];

  const handleKeyDown = (e: React.KeyboardEvent, targetRole: UserRole) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(targetRole);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      onChange("buyer");
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      onChange("farmer");
    }
  };

  return (
    <div className="w-full">
      <label id="role-selector-label" className="sr-only">
        Select account role
      </label>

      {/* Segmented Control Container */}
      <div 
        role="tablist" 
        aria-labelledby="role-selector-label"
        className="relative bg-surface-100 p-1.5 rounded-2xl border border-surface-200 flex items-center justify-between shadow-inner"
      >
        {/* Animated Sliding Highlight Pill */}
        <div 
          className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-xs border border-surface-200/80 transition-transform duration-200 ease-out pointer-events-none ${
            role === "buyer" ? "translate-x-full" : "translate-x-0"
          }`}
          aria-hidden="true"
        />

        {roles.map((item) => {
          const Icon = item.icon;
          const isSelected = role === item.id;

          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              id={`role-tab-${item.id}`}
              aria-selected={isSelected}
              aria-controls={`role-panel-${item.id}`}
              tabIndex={isSelected ? 0 : -1}
              disabled={disabled}
              onClick={() => onChange(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              className={`relative z-10 w-1/2 min-h-[44px] flex items-center justify-center gap-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-60 disabled:cursor-not-allowed ${
                isSelected 
                  ? "text-brand-700 font-bold" 
                  : "text-ink-500 hover:text-ink-700 hover:bg-white/40"
              }`}
            >
              <Icon 
                className={`w-4 h-4 transition-colors shrink-0 ${
                  isSelected ? "text-brand-600" : "text-ink-500"
                }`} 
                aria-hidden="true" 
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
