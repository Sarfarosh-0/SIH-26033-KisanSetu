import React from "react";
import {
  Home,
  ShoppingBag,
  Users,
  Mail,
  Tractor,
  Handshake,
  ClipboardList,
  Headphones,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";
import type { UserRole } from "../types";

export interface FooterProps {
  onSelectTab?: (tab: string) => void;
  onSelectUserRole?: (role: UserRole) => void;
  onOpenPolicy?: (policy: "terms" | "escrow" | "pricing") => void;
  onOpenApiDocs?: () => void;
  currentRole?: UserRole;
  lang?: "en" | "hi";
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onSelectUserRole
}) => {
  const handleNavigate = (tab: string, role?: UserRole) => {
    if (role && onSelectUserRole) {
      onSelectUserRole(role);
    }
    if (onSelectTab) {
      onSelectTab(tab);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="app-footer"
      className="relative bg-[#06241B] text-[#D1E3DA] overflow-hidden border-t border-[#0C382B] selection:bg-[#4ADE80] selection:text-[#06241B]"
      aria-label="Site Footer"
    >
      {/* Background Farm Landscape Silhouette Graphic (Bottom Right) */}
      <div 
        className="absolute right-0 bottom-0 pointer-events-none select-none overflow-hidden opacity-30 lg:opacity-40 w-[380px] sm:w-[480px] md:w-[600px] h-[220px]" 
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 600 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover object-bottom"
        >
          {/* Distant Hills & Field Layer */}
          <path
            d="M160 220C240 180 340 160 460 175C530 185 575 200 600 220H160Z"
            fill="#0B3E2F"
            opacity="0.6"
          />
          <path
            d="M0 220C120 160 280 140 430 150C520 156 570 180 600 200V220H0Z"
            fill="#093527"
            opacity="0.7"
          />

          {/* Contour Lines / Furrows */}
          <path
            d="M200 220C310 185 410 178 600 190"
            stroke="#216D54"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.5"
          />
          <path
            d="M250 220C350 192 460 185 600 205"
            stroke="#216D54"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.5"
          />
          <path
            d="M320 220C400 200 500 195 600 215"
            stroke="#216D54"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.5"
          />

          {/* Tree Cluster 1 (Left Hill) */}
          <circle cx="210" cy="182" r="14" fill="#0C4534" />
          <circle cx="222" cy="178" r="11" fill="#0E4F3C" />
          <circle cx="202" cy="180" r="10" fill="#0E4F3C" />
          <rect x="210" y="188" width="3" height="12" fill="#072A1F" />

          {/* Barn House & Silo Silhouette */}
          <g transform="translate(415, 125)" fill="#0E4F3C">
            {/* Silo */}
            <rect x="42" y="18" width="14" height="38" rx="2" fill="#105742" />
            <path d="M42 18C42 10 56 10 56 18H42Z" fill="#13664E" />
            {/* Main Barn */}
            <path d="M0 24L20 8L40 24V56H0V24Z" fill="#105742" />
            {/* Barn Roof line */}
            <path d="M-2 25L20 7L42 25" stroke="#258265" strokeWidth="2" fill="none" />
            {/* Barn Door */}
            <rect x="13" y="36" width="14" height="20" rx="1" fill="#06241B" />
            <line x1="13" y1="36" x2="27" y2="56" stroke="#105742" strokeWidth="1" />
            <line x1="27" y1="36" x2="13" y2="56" stroke="#105742" strokeWidth="1" />
            {/* Barn Window */}
            <rect x="16" y="18" width="8" height="8" rx="1" fill="#06241B" />
          </g>

          {/* Windmill Silhouette */}
          <g transform="translate(485, 120)" stroke="#1B6951" strokeWidth="1.5">
            {/* Tower */}
            <line x1="10" y1="20" x2="4" y2="58" />
            <line x1="10" y1="20" x2="16" y2="58" />
            <line x1="6" y1="32" x2="14" y2="32" />
            <line x1="5" y1="44" x2="15" y2="44" />
            {/* Hub & Blades */}
            <circle cx="10" cy="18" r="2" fill="#28896B" stroke="none" />
            <line x1="10" y1="18" x2="10" y2="4" />
            <line x1="10" y1="18" x2="22" y2="12" />
            <line x1="10" y1="18" x2="18" y2="28" />
            <line x1="10" y1="18" x2="2" y2="26" />
            <line x1="10" y1="18" x2="0" y2="10" />
          </g>

          {/* Majestic Large Oak Tree (Right) */}
          <g transform="translate(525, 115)">
            <rect x="22" y="45" width="6" height="30" fill="#082A20" />
            <circle cx="25" cy="35" r="24" fill="#0D4635" />
            <circle cx="15" cy="30" r="18" fill="#105440" />
            <circle cx="35" cy="28" r="19" fill="#13634C" />
            <circle cx="26" cy="16" r="16" fill="#18775B" />
          </g>

          {/* Small Bush Trees */}
          <circle cx="380" cy="172" r="9" fill="#0C4534" />
          <circle cx="392" cy="170" r="12" fill="#0F523E" />
          <circle cx="475" cy="174" r="8" fill="#0C4534" />
        </svg>
      </div>

      {/* Main Footer Content Container */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12">
          
          {/* ========================================================================= */}
          {/* Column 1: Brand & Socials (lg:col-span-4)                                 */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6 lg:pr-8 lg:border-r lg:border-[#0E4233]">
            <div className="space-y-4">
              {/* Brand Logo & Name */}
              <div className="flex items-center gap-3">
                {/* Organic Multi-leaf sprout logo matching image precisely */}
                <div className="w-11 h-11 flex items-center justify-center shrink-0">
                  <svg 
                    viewBox="0 0 48 48" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 drop-shadow-[0_2px_8px_rgba(74,222,128,0.2)]"
                  >
                    {/* Main upper left leaf */}
                    <path
                      d="M10 24C10 14 18 8 26 8C26 16 20 24 10 24Z"
                      fill="#4ADE80"
                    />
                    <path
                      d="M12 22C14 15 20 11 25 9.5"
                      stroke="#06241B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    {/* Big central arch leaf */}
                    <path
                      d="M16 36C16 20 28 14 42 14C42 28 30 36 16 36Z"
                      fill="#22C55E"
                    />
                    <path
                      d="M18 34C24 24 32 18 40 15.5"
                      stroke="#06241B"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    {/* Bottom right leaf / base support */}
                    <path
                      d="M14 40C20 40 32 37 38 30C30 31 20 37 14 40Z"
                      fill="#16A34A"
                    />
                    {/* Small left bud */}
                    <path
                      d="M8 18C8 12 13 10 16 10C16 15 12 18 8 18Z"
                      fill="#86EFAC"
                    />
                  </svg>
                </div>

                <span className="text-2xl sm:text-[26px] font-extrabold tracking-tight text-white font-sans">
                  किसान<span className="text-[#4ADE80]">Setu</span>
                </span>
              </div>

              {/* Mission Statement */}
              <p className="text-sm text-[#B7D1C5] leading-relaxed max-w-sm font-normal">
                Connecting farmers directly with buyers and building a transparent, efficient and sustainable agricultural marketplace.
              </p>
            </div>

            {/* Social Media Circular Buttons */}
            <div className="pt-2 flex items-center gap-3">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#0B3B2D] hover:bg-[#4ADE80] text-white hover:text-[#06241B] flex items-center justify-center transition-all duration-200 shadow-sm border border-[#144F3D] hover:border-[#4ADE80] group"
                aria-label="किसानSetu on Facebook"
              >
                <Facebook className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#0B3B2D] hover:bg-[#4ADE80] text-white hover:text-[#06241B] flex items-center justify-center transition-all duration-200 shadow-sm border border-[#144F3D] hover:border-[#4ADE80] group"
                aria-label="किसानSetu on Twitter"
              >
                <Twitter className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#0B3B2D] hover:bg-[#4ADE80] text-white hover:text-[#06241B] flex items-center justify-center transition-all duration-200 shadow-sm border border-[#144F3D] hover:border-[#4ADE80] group"
                aria-label="किसानSetu on Instagram"
              >
                <Instagram className="w-4 h-4 transition-transform group-hover:scale-110" strokeWidth={2.2} />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#0B3B2D] hover:bg-[#4ADE80] text-white hover:text-[#06241B] flex items-center justify-center transition-all duration-200 shadow-sm border border-[#144F3D] hover:border-[#4ADE80] group"
                aria-label="किसानSetu on LinkedIn"
              >
                <Linkedin className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Column 2: Quick Links (lg:col-span-2 or 3)                                 */}
          {/* ========================================================================= */}
          <div className="lg:col-span-2 xl:col-span-2 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Quick Links
              </h3>
              <div className="w-9 h-[3px] bg-[#4ADE80] rounded-full mt-2" />
            </div>

            <ul className="space-y-3.5 pt-1">
              <li>
                <button
                  type="button"
                  onClick={() => handleNavigate("inventory")}
                  className="flex items-center gap-3 text-sm text-[#C4DDD2] hover:text-[#4ADE80] transition-colors cursor-pointer group text-left"
                >
                  <Home className="w-4 h-4 text-[#4ADE80] group-hover:scale-110 transition-transform shrink-0" strokeWidth={1.8} />
                  <span>Home</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => handleNavigate("marketplace", "BUYER")}
                  className="flex items-center gap-3 text-sm text-[#C4DDD2] hover:text-[#4ADE80] transition-colors cursor-pointer group text-left"
                >
                  <ShoppingBag className="w-4 h-4 text-[#4ADE80] group-hover:scale-110 transition-transform shrink-0" strokeWidth={1.8} />
                  <span>Products</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => handleNavigate("pricing_ai")}
                  className="flex items-center gap-3 text-sm text-[#C4DDD2] hover:text-[#4ADE80] transition-colors cursor-pointer group text-left"
                >
                  <Users className="w-4 h-4 text-[#4ADE80] group-hover:scale-110 transition-transform shrink-0" strokeWidth={1.8} />
                  <span>About Us</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => handleNavigate("logistics")}
                  className="flex items-center gap-3 text-sm text-[#C4DDD2] hover:text-[#4ADE80] transition-colors cursor-pointer group text-left"
                >
                  <Mail className="w-4 h-4 text-[#4ADE80] group-hover:scale-110 transition-transform shrink-0" strokeWidth={1.8} />
                  <span>Contact Us</span>
                </button>
              </li>
            </ul>
          </div>

          {/* ========================================================================= */}
          {/* Column 3: For Farmers (lg:col-span-3)                                      */}
          {/* ========================================================================= */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                For Farmers
              </h3>
              <div className="w-9 h-[3px] bg-[#4ADE80] rounded-full mt-2" />
            </div>

            <ul className="space-y-3.5 pt-1">
              <li>
                <button
                  type="button"
                  onClick={() => handleNavigate("inventory", "FARMER")}
                  className="flex items-center gap-3 text-sm text-[#C4DDD2] hover:text-[#4ADE80] transition-colors cursor-pointer group text-left"
                >
                  <Tractor className="w-4 h-4 text-[#4ADE80] group-hover:scale-110 transition-transform shrink-0" strokeWidth={1.8} />
                  <span>Sell Products</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => handleNavigate("buyer_requests", "FARMER")}
                  className="flex items-center gap-3 text-sm text-[#C4DDD2] hover:text-[#4ADE80] transition-colors cursor-pointer group text-left"
                >
                  <Handshake className="w-4 h-4 text-[#4ADE80] group-hover:scale-110 transition-transform shrink-0" strokeWidth={1.8} />
                  <span>Find Buyers</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => handleNavigate("contracts")}
                  className="flex items-center gap-3 text-sm text-[#C4DDD2] hover:text-[#4ADE80] transition-colors cursor-pointer group text-left"
                >
                  <ClipboardList className="w-4 h-4 text-[#4ADE80] group-hover:scale-110 transition-transform shrink-0" strokeWidth={1.8} />
                  <span>Track Orders</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => handleNavigate("payouts", "FARMER")}
                  className="flex items-center gap-3 text-sm text-[#C4DDD2] hover:text-[#4ADE80] transition-colors cursor-pointer group text-left"
                >
                  <Headphones className="w-4 h-4 text-[#4ADE80] group-hover:scale-110 transition-transform shrink-0" strokeWidth={1.8} />
                  <span>Support</span>
                </button>
              </li>
            </ul>
          </div>

          {/* ========================================================================= */}
          {/* Column 4: Contact Us (lg:col-span-3)                                       */}
          {/* ========================================================================= */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Contact Us
              </h3>
              <div className="w-9 h-[3px] bg-[#4ADE80] rounded-full mt-2" />
            </div>

            <ul className="space-y-3.5 pt-1 text-sm text-[#C4DDD2]">
              <li>
                <a
                  href="mailto:info@kisansetu.in"
                  className="flex items-center gap-3 hover:text-[#4ADE80] transition-colors group"
                >
                  <Mail className="w-4 h-4 text-[#4ADE80] group-hover:scale-110 transition-transform shrink-0" strokeWidth={1.8} />
                  <span className="truncate">info@kisansetu.in</span>
                </a>
              </li>

              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 hover:text-[#4ADE80] transition-colors group"
                >
                  <Phone className="w-4 h-4 text-[#4ADE80] group-hover:scale-110 transition-transform shrink-0" strokeWidth={1.8} />
                  <span>+91 98765 43210</span>
                </a>
              </li>

              <li>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#4ADE80] shrink-0" strokeWidth={1.8} />
                  <span>India</span>
                </div>
              </li>

              <li>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#4ADE80] shrink-0" strokeWidth={1.8} />
                  <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* Bottom Section: Copyright with Leaf Sprigs                                 */}
        {/* ========================================================================= */}
        <div className="mt-14 pt-6 border-t border-[#0E4233] flex items-center justify-center">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-[#C4DDD2] font-medium text-center">
            {/* Left Leaf Sprig SVG */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[#4ADE80] shrink-0 drop-shadow-xs"
            >
              <path
                d="M3 15C5 9 11 6 18 5C17 12 13 18 6 19C5 19 4 19 3 15Z"
                fill="#4ADE80"
              />
              <path
                d="M4 17C7 13 12 9 17 6"
                stroke="#06241B"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M10 16C12 12 16 9 21 8C20 13 17 17 12 18"
                fill="#22C55E"
                opacity="0.8"
              />
            </svg>

            <span>© 2026 किसानSetu. All Rights Reserved.</span>

            {/* Right Leaf Sprig SVG (Flipped) */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[#4ADE80] shrink-0 scale-x-[-1] drop-shadow-xs"
            >
              <path
                d="M3 15C5 9 11 6 18 5C17 12 13 18 6 19C5 19 4 19 3 15Z"
                fill="#4ADE80"
              />
              <path
                d="M4 17C7 13 12 9 17 6"
                stroke="#06241B"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M10 16C12 12 16 9 21 8C20 13 17 17 12 18"
                fill="#22C55E"
                opacity="0.8"
              />
            </svg>
          </div>
        </div>

      </div>
    </footer>
  );
};


