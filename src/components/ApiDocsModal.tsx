import React, { useState } from "react";
import { 
  Code2, 
  Terminal, 
  Database, 
  Cpu, 
  Play, 
  CheckCircle2, 
  Copy, 
  ExternalLink,
  Layers,
  FileCode
} from "lucide-react";
import { API } from "../api";

export const ApiDocsModal: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("pricing");
  const [testResponse, setTestResponse] = useState<string>("");
  const [loadingTest, setLoadingTest] = useState(false);
  const [copied, setCopied] = useState(false);

  const endpoints = [
    {
      id: "pricing",
      method: "POST",
      path: "/api/pricing/recommend",
      title: "AI Fair Price Engine",
      description: "Computes calibrated fair price range [min, target, max] using APMC mandi benchmarks, quality grades, and seasonality curves.",
      samplePayload: {
        cropName: "Onion",
        quantityQuintals: 50,
        qualityGrade: "Grade A",
        district: "Nashik",
        state: "Maharashtra",
        isOrganic: false
      },
      testFn: () => API.getPriceRecommendation({
        cropName: "Onion",
        quantityQuintals: 50,
        qualityGrade: "Grade A",
        district: "Nashik",
        state: "Maharashtra"
      })
    },
    {
      id: "mandi",
      method: "GET",
      path: "/api/pricing/mandi-compare/Onion",
      title: "Mandi Benchmark Comparison",
      description: "Returns side-by-side comparison across APMC mandi price, किसानSetu fair price, buyer offers, and retail rates.",
      testFn: () => API.getMandiComparison("Onion")
    },
    {
      id: "listings",
      method: "GET",
      path: "/api/listings?grade=Grade%20A",
      title: "Crop Listings Catalog",
      description: "Queries all active direct farmer listings with geospatial coordinates, trust scores, and harvest dates.",
      testFn: () => API.getListings({ grade: "Grade A" })
    },
    {
      id: "routes",
      method: "GET",
      path: "/api/logistics/routes",
      title: "Route Optimization Engine",
      description: "Executes 2-stage nearest-neighbor TSP batching over depot, farm pickups, and distribution hubs.",
      testFn: () => API.getRouteOptimization()
    },
    {
      id: "analytics",
      method: "GET",
      path: "/api/analytics/summary",
      title: "Agri-Market Analytics",
      description: "Aggregates total trade volume, disintermediation savings, average trust ratings, and farmer uplift.",
      testFn: () => API.getAnalytics()
    }
  ];

  const currentEndpoint = endpoints.find(e => e.id === selectedEndpoint) || endpoints[0];

  const runTestCall = async () => {
    try {
      setLoadingTest(true);
      const res = await currentEndpoint.testFn();
      setTestResponse(JSON.stringify(res, null, 2));
    } catch (err: any) {
      setTestResponse(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setLoadingTest(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-emerald-600 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-emerald-500/40">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-700/80 text-emerald-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-emerald-400/30">
              <FileCode className="w-3.5 h-3.5 text-amber-300" />
              <span>Full-Stack Architecture & API Reference</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display mt-2.5">
              FastAPI & Express Backend Specifications
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1 font-medium">
              Enterprise RESTful microservice specifications for institutional trading partners, ERP integration, and logistics dispatch.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-800/80 text-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-400/30 font-mono font-bold shadow-xs">
              OpenAPI 3.0 Compatible
            </span>
          </div>
        </div>
      </div>

      {/* Architecture Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
            <Cpu className="w-4 h-4" />
            <span>AI Price Regressor</span>
          </div>
          <h4 className="font-extrabold text-slate-900 text-sm font-display">Scikit-learn / Linear Regression</h4>
          <p className="text-xs text-slate-500 font-medium">
            Formulated as <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px] text-slate-800">P_fair = P_mandi * (1 + delta_quality + delta_disinterm + delta_season)</code>.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm space-y-1.5">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-xs">
            <Layers className="w-4 h-4" />
            <span>Logistics TSP Batching</span>
          </div>
          <h4 className="font-extrabold text-slate-900 text-sm font-display">Geodetic Haversine Matrix</h4>
          <p className="text-xs text-slate-500 font-medium">
            Clusters smallholder farm pickups along highway transport corridors, reducing deadhead miles by ~33%.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm space-y-1.5">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-xs">
            <Database className="w-4 h-4" />
            <span>Dual Runtime Support</span>
          </div>
          <h4 className="font-extrabold text-slate-900 text-sm font-display">Python FastAPI + Node/Express</h4>
          <p className="text-xs text-slate-500 font-medium">
            Python files provided under <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px] text-slate-800">/backend</code>; active server running on <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px] text-slate-800">server.ts</code>.
          </p>
        </div>
      </div>

      {/* Interactive API Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Endpoints Sidebar */}
        <div className="space-y-2">
          <h3 className="font-extrabold text-slate-900 text-sm font-display mb-2">
            Available Endpoints
          </h3>
          {endpoints.map((ep) => (
            <button
              key={ep.id}
              onClick={() => {
                setSelectedEndpoint(ep.id);
                setTestResponse("");
              }}
              className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                selectedEndpoint === ep.id
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                  : "bg-white text-slate-800 border-slate-200 hover:border-emerald-200 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-2 text-xs">
                <span className={`font-mono font-extrabold px-2 py-0.5 rounded-md text-[10px] ${
                  ep.method === "POST" 
                    ? "bg-amber-400 text-slate-950" 
                    : selectedEndpoint === ep.id
                    ? "bg-emerald-700 text-white"
                    : "bg-emerald-500 text-white"
                }`}>
                  {ep.method}
                </span>
                <span className="font-bold truncate">{ep.title}</span>
              </div>
              <p className={`text-[11px] mt-1 line-clamp-1 ${
                selectedEndpoint === ep.id ? "text-emerald-100" : "text-slate-500"
              }`}>
                {ep.path}
              </p>
            </button>
          ))}
        </div>

        {/* Endpoint Inspector & Live Test Runner */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-mono font-extrabold px-2.5 py-0.5 rounded-lg text-xs ${
                  currentEndpoint.method === "POST" 
                    ? "bg-amber-400 text-slate-950" 
                    : "bg-emerald-500 text-white"
                }`}>
                  {currentEndpoint.method}
                </span>
                <span className="font-mono text-xs font-bold text-slate-900">
                  {currentEndpoint.path}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {currentEndpoint.description}
              </p>
            </div>

            <button
              onClick={runTestCall}
              disabled={loadingTest}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{loadingTest ? "Calling API..." : "Send Request"}</span>
            </button>
          </div>

          {/* Sample Payload if POST */}
          {currentEndpoint.samplePayload && (
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1">Request Payload:</span>
              <pre className="bg-slate-900 text-emerald-400 p-3.5 rounded-2xl text-xs font-mono overflow-x-auto">
                {JSON.stringify(currentEndpoint.samplePayload, null, 2)}
              </pre>
            </div>
          )}

          {/* Live Response Box */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-700">Live JSON Response:</span>
              {testResponse && (
                <button
                  onClick={() => copyToClipboard(testResponse)}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer font-medium"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              )}
            </div>

            <pre className="bg-slate-950 text-slate-200 p-4 rounded-2xl text-xs font-mono h-64 overflow-y-auto border border-slate-800">
              {testResponse || `// Click "Send Request" to test this live backend API endpoint.\n// Returns structured JSON response directly from the server.`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
