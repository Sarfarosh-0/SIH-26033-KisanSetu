import React, { useState } from "react";
import { 
  ShoppingBag, 
  Package, 
  CreditCard, 
  Truck, 
  Sparkles, 
  CheckCircle2
} from "lucide-react";
import { CropListing, Order, User } from "../../types";
import { BuyerMarketplace } from "../BuyerMarketplace";
import { BuyerBulkOrders } from "./BuyerBulkOrders";
import { BuyerContractsTracking } from "./BuyerContractsTracking";
import { BuyerPaymentEscrow } from "./BuyerPaymentEscrow";
import { t } from "../../i18n";

export type BuyerSubTab = "marketplace" | "bulk_orders" | "contracts" | "payments";

interface BuyerDashboardProps {
  buyer: User;
  listings: CropListing[];
  orders: Order[];
  lang: "en" | "hi";
  activeTab: BuyerSubTab;
  onSelectTab: (tab: BuyerSubTab) => void;
  onOpenOrderModal: (listing: CropListing) => void;
  onOrderStatusUpdate: (orderId: number, status: string, otp?: string) => Promise<void>;
  onVerifyPayment?: (payload: { orderId: number; upiId: string; amount: number }) => Promise<void>;
}

export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({
  buyer,
  listings,
  orders,
  lang,
  activeTab,
  onSelectTab,
  onOpenOrderModal,
  onOrderStatusUpdate,
  onVerifyPayment
}) => {
  const buyerOrders = orders.filter(o => o.buyerId === buyer.id || !o.buyerId);
  const activeDeliveries = buyerOrders.filter(o => o.status === "IN_TRANSIT").length;
  const pendingConfirmation = buyerOrders.filter(o => o.status === "PLACED" || o.status === "CONFIRMED").length;

  return (
    <div className="space-y-6">
      {/* Main Layout: Sidebar & Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Buyer Navigation Sidebar (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-3xl border border-emerald-100 p-4 shadow-sm space-y-1.5">
            <div className="px-3 py-2 text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
              {t("buyer.purchasingSuite", lang)}
            </div>

            {/* Tab 1: Produce Marketplace */}
            <button
              onClick={() => onSelectTab("marketplace")}
              className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                activeTab === "marketplace"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4" />
                <span>{t("nav.marketplace", lang)}</span>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
                activeTab === "marketplace" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
              }`}>
                {listings.length}
              </span>
            </button>

            {/* Tab 2: Bulk Orders */}
            <button
              onClick={() => onSelectTab("bulk_orders")}
              className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                activeTab === "bulk_orders"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>{lang === "hi" ? "थोक खरीद व आरएफक्यू" : "Bulk Orders & RFQ"}</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                activeTab === "bulk_orders" ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-800"
              }`}>
                {lang === "hi" ? "7% तक छूट" : "Up to -7%"}
              </span>
            </button>

            {/* Tab 3: Contracts & Tracking */}
            <button
              onClick={() => onSelectTab("contracts")}
              className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                activeTab === "contracts"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4" />
                <span>{t("nav.contracts", lang)}</span>
              </div>
              {activeDeliveries > 0 && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse ${
                  activeTab === "contracts" ? "bg-white/20 text-white" : "bg-blue-100 text-blue-800"
                }`}>
                  {activeDeliveries} {lang === "hi" ? "पारगमन में" : "Transit"}
                </span>
              )}
            </button>

            {/* Tab 4: Payments & Gateways */}
            <button
              onClick={() => onSelectTab("payments")}
              className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                activeTab === "payments"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4" />
                <span>{t("nav.payments", lang)}</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                activeTab === "payments" ? "bg-white/20 text-white" : "bg-amber-100 text-amber-800"
              }`}>
                KisanEscrow
              </span>
            </button>
          </div>

          {/* Direct Procurement Guarantee Card */}
          <div className="bg-[#F0FDF4] rounded-3xl p-5 border border-emerald-200 text-xs space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{lang === "hi" ? "सीधे खेत-खलिहान से खरीद के लाभ" : "Direct Farm-Gate Benefits"}</span>
            </div>
            <ul className="space-y-2 text-[11px] text-slate-600 font-medium">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{lang === "hi" ? "शून्य मंडी बिचौलिया दलाली" : "Zero APMC middleman brokerage"}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{lang === "hi" ? "सत्यापित ग्रेड A गुणवत्ता परीक्षण" : "Certified Grade A lab inspection"}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{lang === "hi" ? "दोहरा नियंत्रण एस्क्रो सुरक्षा" : "Dual-custody escrow safety"}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Content Area (9 Cols) */}
        <div className="lg:col-span-9 space-y-6">
          {activeTab === "marketplace" && (
            <BuyerMarketplace
              buyer={buyer}
              listings={listings}
              onOpenOrderModal={onOpenOrderModal}
              lang={lang}
            />
          )}

          {activeTab === "bulk_orders" && (
            <BuyerBulkOrders
              buyer={buyer}
              listings={listings}
              lang={lang}
              onOpenOrderModal={onOpenOrderModal}
            />
          )}

          {activeTab === "contracts" && (
            <BuyerContractsTracking
              buyer={buyer}
              orders={orders}
              lang={lang}
              onOrderStatusUpdate={onOrderStatusUpdate}
            />
          )}

          {activeTab === "payments" && (
            <BuyerPaymentEscrow
              buyer={buyer}
              orders={orders}
              lang={lang}
              onVerifyPayment={onVerifyPayment}
            />
          )}
        </div>
      </div>
    </div>
  );
};

