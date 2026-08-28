import React, { useState, useMemo } from 'react';
import DealRow from './components/DealRow';
import PropertyModal from './components/PropertyModal';
import FiscalAlertsFeed from './components/FiscalAlertsFeed';
import PipelineTracker from './components/PipelineTracker';
import { PROPERTIES, computeVeritasScore } from './data/propertiesData';
import { Bell } from 'lucide-react';

const SORT_KEYS = [
  { id: 'score', label: 'Score' },
  { id: 'capRate', label: 'Cap Rate' },
  { id: 'irr', label: 'IRR' },
  { id: 'price', label: 'Price' },
];

const MARKETS = [
  { id: 'all', label: 'All Markets' },
  { id: 'Westchester', label: 'Westchester' },
  { id: 'NYC', label: 'NYC' },
  { id: 'London', label: 'London' },
  { id: 'Edinburgh', label: 'Edinburgh' },
];

const COL_HEADERS = [
  { label: '#', cls: 'th-rank' },
  { label: 'Property', cls: 'th-name' },
  { label: 'Market', cls: '' },
  { label: 'Class', cls: '' },
  { label: 'Strategy', cls: '' },
  { label: 'Price', cls: 'th-right' },
  { label: '$/sqft', cls: 'th-right' },
  { label: 'NOI', cls: 'th-right' },
  { label: 'Cap Rate', cls: 'th-right' },
  { label: 'IRR', cls: 'th-right' },
  { label: 'Score', cls: 'th-right' },
];

const fmtDate = () => new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export default function App() {
  const [view, setView] = useState('screener');
  const [market, setMarket] = useState('all');
  const [sortBy, setSortBy] = useState('score');
  const [sortDesc, setSortDesc] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [savedIds, setSavedIds] = useState(['west-01', 'nyc-01', 'ldn-01']);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'Veritas2026') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const scored = useMemo(() =>
    PROPERTIES.map(p => ({ ...p, veritasScore: computeVeritasScore(p) })), []
  );

  const filtered = useMemo(() =>
    market === 'all' ? scored : scored.filter(p => p.region === market), [scored, market]
  );

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const va = sortBy === 'score' ? a.veritasScore : a[sortBy];
      const vb = sortBy === 'score' ? b.veritasScore : b[sortBy];
      return sortDesc ? vb - va : va - vb;
    });
    return arr;
  }, [filtered, sortBy, sortDesc]);

  const savedList = useMemo(() => scored.filter(p => savedIds.includes(p.id)), [scored, savedIds]);

  const toggleSort = (id) => {
    if (sortBy === id) setSortDesc(!sortDesc);
    else { setSortBy(id); setSortDesc(true); }
  };
  const toggleSave = (id) => setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const totalAUM = scored.reduce((s, p) => s + p.price, 0);
  const avgCap = (scored.reduce((s, p) => s + p.capRate, 0) / scored.length).toFixed(1);
  const avgIRR = (scored.reduce((s, p) => s + p.irr, 0) / scored.length).toFixed(1);
  const today = fmtDate();

  if (!isAuthenticated) {
    return (
      <div className="login-screen">
        <div className="login-card">
          <div className="login-brand">VERITAS</div>
          <div className="login-subtitle">Capital Real Estate</div>
          <form className="login-form" onSubmit={handleLogin}>
            <input 
              type="password" 
              className="login-input" 
              placeholder="Enter Access Code" 
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              autoFocus
            />
            <button type="submit" className="login-btn">Secure Login</button>
            {loginError && <div className="login-error">Invalid access code</div>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* ── Navigation ── */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-left">
            <span className="nav-brand">VERITAS</span>
            <span className="nav-sep">|</span>
            <span className="nav-desc">Capital Real Estate</span>
          </div>
          <div className="nav-center">
            <button onClick={() => setView('screener')} className={`nav-link ${view === 'screener' ? 'active' : ''}`}>Screener</button>
            <button onClick={() => setView('pipeline')} className={`nav-link ${view === 'pipeline' ? 'active' : ''}`}>
              Pipeline{savedIds.length > 0 && <span className="nav-count">{savedIds.length}</span>}
            </button>
          </div>
          <div className="nav-right">
            <span className="nav-date">{today}</span>
            <button onClick={() => setAlertsOpen(true)} className="nav-bell" aria-label="Alerts">
              <Bell size={14} />
              <span className="nav-dot" />
            </button>
          </div>
        </div>
      </nav>

      <main className="main">
        {view === 'screener' && (
          <>
            {/* ── Page Header ── */}
            <div className="page-header">
              <h1>Real Estate Investment Opportunities</h1>
              <div className="page-header-stats">
                <div className="stat"><span className="stat-val">{scored.length}</span><span className="stat-lbl">Assets</span></div>
                <div className="stat"><span className="stat-val">${(totalAUM / 1e6).toFixed(0)}M</span><span className="stat-lbl">Total AUM</span></div>
                <div className="stat"><span className="stat-val">{avgCap}%</span><span className="stat-lbl">Avg Cap Rate</span></div>
                <div className="stat"><span className="stat-val">{avgIRR}%</span><span className="stat-lbl">Avg IRR</span></div>
                <div className="stat"><span className="stat-val">4</span><span className="stat-lbl">Markets</span></div>
              </div>
            </div>

            {/* ── Toolbar ── */}
            <div className="toolbar">
              <div className="toolbar-group">
                {MARKETS.map(m => (
                  <button key={m.id} onClick={() => setMarket(m.id)} className={`toolbar-btn ${market === m.id ? 'selected' : ''}`}>
                    {m.label}
                  </button>
                ))}
              </div>
              <div className="toolbar-group">
                <span className="toolbar-label">Sort by</span>
                {SORT_KEYS.map(s => (
                  <button key={s.id} onClick={() => toggleSort(s.id)} className={`toolbar-btn ${sortBy === s.id ? 'selected' : ''}`}>
                    {s.label}{sortBy === s.id && (sortDesc ? ' ↓' : ' ↑')}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Data Table ── */}
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    {COL_HEADERS.map(c => (
                      <th key={c.label} className={`th ${c.cls}`}>{c.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((p, i) => (
                    <DealRow key={p.id} property={p} rank={i + 1} score={p.veritasScore} onSelect={setSelectedProperty} />
                  ))}
                </tbody>
              </table>
            </div>

            <p className="table-footer-note">
              Ranked by VERITAS Score (Cap Rate 25 + IRR 25 + Fiscal 20 + Strategy 15 + Tax Discount 15 = 100 pts). Data as of {today}.
            </p>
          </>
        )}

        {view === 'pipeline' && (
          <PipelineTracker savedProperties={savedList} onRemoveSave={toggleSave} onSelectProperty={setSelectedProperty} />
        )}
      </main>

      <footer className="footer">
        <span className="footer-brand">VERITAS Capital Real Estate</span>
        <span className="footer-markets">Westchester · New York City · London · Edinburgh</span>
        <span className="footer-date">{today}</span>
      </footer>

      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        isSaved={selectedProperty ? savedIds.includes(selectedProperty.id) : false}
        onToggleSave={toggleSave}
      />
      <FiscalAlertsFeed isOpen={alertsOpen} onClose={() => setAlertsOpen(false)} />
    </div>
  );
}
