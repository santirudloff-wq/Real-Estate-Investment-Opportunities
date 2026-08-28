import React, { useState } from 'react';
import {
  X, Building2, MapPin, Percent, DollarSign, Award, Landmark,
  TrendingUp, Calculator, FileText, CheckCircle2, ShieldCheck,
  Sparkles, Sliders, ArrowUpRight, Share2, Download, Copy, Layers, AlertTriangle, Target, Shield, Zap, Users
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function PropertyModal({ property, onClose, isSaved, onToggleSave }) {
  if (!property) return null;

  const [ltv, setLtv] = useState(70);
  const [interestRate, setInterestRate] = useState(6.5);
  const [rehabCapEx, setRehabCapEx] = useState(500000);
  const [rentGrowth, setRentGrowth] = useState(4.0);
  const [copiedMemo, setCopiedMemo] = useState(false);
  const [activeTab, setActiveTab] = useState('thesis');

  const purchasePrice = property.price;
  const loanAmount = (purchasePrice * ltv) / 100;
  const equityRequired = (purchasePrice * (100 - ltv)) / 100 + rehabCapEx;
  const annualDebtService = loanAmount * (interestRate / 100);
  const netCashFlow = property.noi - annualDebtService;
  const cashOnCashReturn = equityRequired > 0 ? ((netCashFlow / equityRequired) * 100).toFixed(2) : 0;
  const dscr = annualDebtService > 0 ? (property.noi / annualDebtService).toFixed(2) : 'N/A';

  const dynamicProjections = property.financials ? property.financials.map((f, idx) => {
    const growthFactor = Math.pow(1 + rentGrowth / 100, idx);
    const projRev = Math.round(f.revenue * growthFactor);
    const projNOI = Math.round(f.noi * growthFactor);
    const projCashFlow = Math.max(0, Math.round(projNOI - annualDebtService));
    return { year: f.year, Revenue: projRev, NOI: projNOI, CashFlow: projCashFlow };
  }) : [];

  const fmt = (n) => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: property.currency === '£' ? 'GBP' : 'USD', maximumFractionDigits: 0
  }).format(n);

  const copyInvestmentMemo = () => {
    const memo = `
INVESTMENT MEMO: ${property.title.toUpperCase()}
${property.region} — ${property.address}
Strategy: ${property.strategy} | Asset Class: ${property.assetClass}

RATIONALE:
• Acquisition: ${property.investmentRationale?.acquisitionType}
• Valuation Moat: ${property.investmentRationale?.valuationMoat}
• Supply/Demand: ${property.investmentRationale?.supplyDemandMoat}
• Value Creation: ${property.investmentRationale?.valueCreationPlan}
• Exit: ${property.investmentRationale?.exitStrategy}

FINANCIALS:
• Price: ${fmt(property.price)} (${property.currency}${Math.round(property.price / property.sqft)}/sqft)
• NOI: ${fmt(property.noi)} | Cap Rate: ${property.capRate}% | IRR: ${property.irr}%
• Fiscal Score: ${property.fiscalScore}/100

UNDERWRITING (${ltv}% LTV @ ${interestRate}%):
• Equity: ${fmt(equityRequired)} | Cash Flow: ${fmt(netCashFlow)}
• CoC Return: ${cashOnCashReturn}% | DSCR: ${dscr}x

VERITAS Capital Real Estate
    `.trim();
    navigator.clipboard.writeText(memo);
    setCopiedMemo(true);
    setTimeout(() => setCopiedMemo(false), 2500);
  };

  const tabs = [
    { id: 'thesis', label: 'Investment Rationale', icon: Target },
    { id: 'underwriting', label: 'Underwriting Model', icon: Calculator },
    { id: 'fiscal', label: 'Fiscal & Tax', icon: Landmark },
    { id: 'proforma', label: '5-Year Projection', icon: TrendingUp },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-score">{property.fiscalScore}</div>
            <div>
              <div className="modal-badges">
                <span className="modal-badge">{property.region}</span>
                <span className="modal-badge">{property.strategy}</span>
              </div>
              <h2 className="modal-title">{property.title}</h2>
              <p className="modal-address"><MapPin style={{width:12,height:12}} /> {property.address}</p>
            </div>
          </div>
          <div className="modal-header-actions">
            <button onClick={copyInvestmentMemo} className="btn btn-secondary" style={{fontSize:12}}>
              {copiedMemo ? <><CheckCircle2 style={{width:14,height:14,color:'var(--green)'}} /> Copied</> : <><Copy style={{width:14,height:14}} /> Copy Memo</>}
            </button>
            <button onClick={() => onToggleSave(property.id)} className={`btn ${isSaved ? 'btn-primary' : 'btn-secondary'}`} style={{fontSize:12}}>
              {isSaved ? 'Saved' : 'Save Deal'}
            </button>
            <button onClick={onClose} className="modal-close"><X style={{width:18,height:18}} /></button>
          </div>
        </div>

        {/* Tabs */}
        <div className="modal-tabs">
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`modal-tab ${activeTab === t.id ? 'modal-tab-active' : ''}`}>
                <Icon style={{width:14,height:14}} /> {t.label}
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div className="modal-body">

          {activeTab === 'thesis' && (
            <div className="modal-section">
              <div className="modal-rationale-grid">
                {[
                  { num: '01', title: 'Acquisition Advantage', value: property.investmentRationale?.acquisitionType, desc: 'Property sourced directly through non-public seller channels or lender recapitalization.' },
                  { num: '02', title: 'Valuation Moat', value: property.investmentRationale?.valuationMoat, desc: 'Substantial discount to replacement cost creating downside margin of safety.' },
                  { num: '03', title: 'Supply-Constrained Market', value: property.investmentRationale?.supplyDemandMoat, desc: 'High barrier-to-entry location with limited new competing supply.' },
                  { num: '04', title: 'Exit Strategy', value: property.investmentRationale?.exitStrategy, desc: property.investmentRationale?.valueCreationPlan },
                ].map(p => (
                  <div key={p.num} className="modal-pillar">
                    <div className="modal-pillar-num">{p.num}</div>
                    <div>
                      <h4 className="modal-pillar-title">{p.title}</h4>
                      <p className="modal-pillar-value">{p.value}</p>
                      <p className="modal-pillar-desc">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="modal-summary">
                <h4 className="modal-summary-title">Executive Summary</h4>
                <p className="modal-summary-text">{property.description}</p>
                <div className="modal-summary-metrics">
                  <span>Cap Rate: <strong>{property.capRate}%</strong></span>
                  <span>Target IRR: <strong>{property.irr}%</strong></span>
                  <span>Fiscal Score: <strong>{property.fiscalScore}/100</strong></span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'underwriting' && (
            <div className="modal-section">
              <div className="modal-kpi-grid">
                {[
                  { label: 'Asking Price', value: fmt(purchasePrice), sub: `${property.currency}${Math.round(property.price / property.sqft)}/sqft · ${property.sqft.toLocaleString()} sqft` },
                  { label: 'Required Equity', value: fmt(equityRequired), sub: `${100-ltv}% down + ${property.currency}${(rehabCapEx/1000).toFixed(0)}k rehab` },
                  { label: 'Net Cash Flow', value: fmt(netCashFlow), sub: 'After debt service', color: 'var(--green)' },
                  { label: 'Cash-on-Cash', value: `${cashOnCashReturn}%`, sub: `DSCR: ${dscr}x`, color: 'var(--blue)' },
                ].map(k => (
                  <div key={k.label} className="modal-kpi">
                    <span className="modal-kpi-label">{k.label}</span>
                    <span className="modal-kpi-value" style={k.color ? {color: k.color} : {}}>{k.value}</span>
                    <span className="modal-kpi-sub">{k.sub}</span>
                  </div>
                ))}
              </div>

              <div className="modal-sliders">
                <h4 className="modal-sliders-title"><Sliders style={{width:14,height:14}} /> Sensitivity Analysis</h4>
                <div className="modal-slider-grid">
                  {[
                    { label: 'LTV', value: `${ltv}%`, min: 50, max: 85, step: 5, val: ltv, set: v => setLtv(+v) },
                    { label: 'Interest Rate', value: `${interestRate}%`, min: 4.5, max: 9, step: 0.25, val: interestRate, set: v => setInterestRate(+v) },
                    { label: 'Rehab CapEx', value: `${property.currency}${(rehabCapEx/1000).toFixed(0)}k`, min: 100000, max: 2000000, step: 50000, val: rehabCapEx, set: v => setRehabCapEx(+v) },
                    { label: 'Rent Growth', value: `${rentGrowth}%`, min: 2, max: 7, step: 0.5, val: rentGrowth, set: v => setRentGrowth(+v) },
                  ].map(s => (
                    <div key={s.label} className="modal-slider">
                      <div className="modal-slider-header">
                        <span>{s.label}</span><span className="modal-slider-val">{s.value}</span>
                      </div>
                      <input type="range" min={s.min} max={s.max} step={s.step} value={s.val} onChange={e => s.set(e.target.value)} className="modal-range" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fiscal' && (
            <div className="modal-section">
              <div className="modal-fiscal-grid">
                <div className="modal-fiscal-card">
                  <h4 className="modal-fiscal-title"><CheckCircle2 style={{width:14,height:14,color:'var(--green)'}} /> Fiscal Highlights</h4>
                  <ul className="modal-fiscal-list">
                    {property.fiscalHighlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
                <div className="modal-fiscal-card">
                  <h4 className="modal-fiscal-title"><ShieldCheck style={{width:14,height:14,color:'var(--blue)'}} /> Tax Assessment</h4>
                  <div className="modal-tax-bar-container">
                    <div className="modal-tax-bar-header">
                      <span>Assessment Ratio</span>
                      <span className="modal-tax-bar-value">{(property.taxAssessmentRatio * 100).toFixed(0)}% of market value</span>
                    </div>
                    <div className="modal-tax-bar">
                      <div className="modal-tax-bar-fill" style={{ width: `${property.taxAssessmentRatio * 100}%` }} />
                    </div>
                    <p className="modal-tax-bar-note">Lower ratio = greater tax advantage vs market peers</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'proforma' && (
            <div className="modal-section">
              <div className="modal-chart-header">
                <h4>5-Year Projection (Rent Growth: {rentGrowth}%)</h4>
                <p>Revenue, NOI, and net cash flow after debt service</p>
              </div>
              <div style={{ width: '100%', height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dynamicProjections}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E5EA" />
                    <XAxis dataKey="year" stroke="#8795A6" fontSize={11} />
                    <YAxis stroke="#8795A6" fontSize={11} tickFormatter={val => `${property.currency}${(val/1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={{ background: '#fff', border: '1px solid #E2E5EA', borderRadius: 6, fontSize: 12 }}
                      formatter={val => [`${property.currency}${val.toLocaleString()}`, '']}
                    />
                    <Area type="monotone" dataKey="Revenue" stroke="#1D4ED8" fill="rgba(29,78,216,0.06)" strokeWidth={2} />
                    <Area type="monotone" dataKey="NOI" stroke="#1A3A5C" fill="rgba(26,58,92,0.08)" strokeWidth={2} />
                    <Area type="monotone" dataKey="CashFlow" stroke="#1A7F4B" fill="rgba(26,127,75,0.08)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
