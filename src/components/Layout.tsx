import React, { useState, useEffect, useCallback } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import type { User, UserRole } from "../types";

export interface LayoutProps {
  children: React.ReactNode;
  user: User;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  lang: "en" | "hi";
  onToggleLang: (lang: "en" | "hi") => void;
  onOpenNewListing?: () => void;
  onResetData?: () => void;
  onSignOut?: () => void;
  onOpenApiDocs?: () => void;
  onSelectUserRole?: (role: UserRole) => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  user,
  activeTab,
  onSelectTab,
  lang,
  onToggleLang,
  onOpenNewListing,
  onResetData,
  onSignOut,
  onOpenApiDocs,
  onSelectUserRole
}) => {
  // Unified single source of truth for sidebar open/closed state
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    try {
      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        return false;
      }
      const saved = localStorage.getItem("kisansetu_sidebar_open");
      if (saved !== null) {
        return saved === "true";
      }
      return typeof window !== "undefined" ? window.innerWidth >= 1024 : true;
    } catch {
      return false;
    }
  });

  // Global search state
  const [searchQuery, setSearchQuery] = useState("");

  // Persist sidebar state
  useEffect(() => {
    try {
      localStorage.setItem("kisansetu_sidebar_open", String(isSidebarOpen));
    } catch {
      // Ignore storage errors
    }
  }, [isSidebarOpen]);

  // Lock mobile body scroll when drawer is open on small screens
  useEffect(() => {
    if (isSidebarOpen && typeof window !== "undefined" && window.innerWidth < 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  // Keyboard shortcuts: Cmd/Ctrl + B toggles sidebar; Escape closes sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setIsSidebarOpen(prev => !prev);
      }
      if (e.key === "Escape" && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarOpen]);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#F0FDF4] text-slate-900 flex flex-col font-sans selection:bg-emerald-200 antialiased">
      
      {/* Modern Vertical Collapsible Sidebar */}
      <Sidebar
        user={user}
        activeTab={activeTab}
        onSelectTab={onSelectTab}
        lang={lang}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        onToggle={handleToggleSidebar}
        onOpenNewListing={onOpenNewListing}
        onResetData={onResetData}
        onSignOut={onSignOut}
        onOpenApiDocs={onOpenApiDocs}
        onSelectUserRole={onSelectUserRole}
      />

      {/* Main Content Area (Fluidly offsets according to sidebar open state) */}
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:pl-64" : "lg:pl-0"
        }`}
      >
        {/* Header with App Name, Conditional Toggle, Search & Language Switcher */}
        <Header
          user={user}
          activeTab={activeTab}
          onSelectTab={onSelectTab}
          lang={lang}
          onToggleLang={onToggleLang}
          onToggleSidebar={handleToggleSidebar}
          isSidebarOpen={isSidebarOpen}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenNewListing={onOpenNewListing}
          onResetData={onResetData}
          onSignOut={onSignOut}
          onOpenApiDocs={onOpenApiDocs}
        />

        {/* Dynamic Page Content */}
        <div className="flex-1 flex flex-col w-full">
          {children}
        </div>
      </div>

    </div>
  );
};
