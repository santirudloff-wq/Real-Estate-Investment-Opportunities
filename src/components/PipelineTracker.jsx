import React, { useState } from 'react';
import { Bookmark, Trash2 } from 'lucide-react';

const STAGES = [
  'Saved',
  'Underwriting',
  'Due Diligence',
  'IOI Submitted',
  'Under Contract'
];

export default function PipelineTracker({ savedProperties, onRemoveSave, onSelectProperty }) {
  const [dealStages, setDealStages] = useState({
    'west-01': 'Underwriting',
    'nyc-01': 'Due Diligence',
    'ldn-01': 'Saved'
  });

  const getStage = (id) => dealStages[id] || 'Saved';
  const setStage = (id, stage) => setDealStages(prev => ({ ...prev, [id]: stage }));

  const totalValue = savedProperties.reduce((s, p) => s + p.price, 0);
  const avgCap = savedProperties.length > 0
    ? (savedProperties.reduce((s, p) => s + p.capRate, 0) / savedProperties.length).toFixed(1) : 0;

  if (savedProperties.length === 0) {
    return (
      <div className="pipeline-empty">
        <Bookmark size={28} />
        <h3>No saved deals</h3>
        <p>Save deals from the screener to track them here.</p>
      </div>
    );
  }

  return (
    <div className="pipeline">
      <div className="pipeline-header">
        <div>
          <h2 className="pipeline-title">Deal Pipeline</h2>
          <p className="pipeline-sub">{savedProperties.length} deals saved · Track sourcing and underwriting stages</p>
        </div>
        <div className="pipeline-stats">
          <div className="pipeline-stat">
            <span className="pipeline-stat-label">Pipeline Value</span>
            <span className="pipeline-stat-value">${(totalValue / 1e6).toFixed(1)}M</span>
          </div>
          <div className="pipeline-stat">
            <span className="pipeline-stat-label">Avg Cap Rate</span>
            <span className="pipeline-stat-value">{avgCap}%</span>
          </div>
        </div>
      </div>

      <div className="pipeline-board">
        {STAGES.map(stageName => {
          const inStage = savedProperties.filter(p => getStage(p.id) === stageName);
          return (
            <div key={stageName} className="pipeline-col">
              <div className="pipeline-col-header">
                <span className="pipeline-col-title">{stageName}</span>
                <span className="pipeline-col-count">{inStage.length}</span>
              </div>
              <div className="pipeline-col-body">
                {inStage.map(p => (
                  <div key={p.id} className="pipeline-card">
                    <div className="pipeline-card-top">
                      <span className="pipeline-card-region">{p.region}</span>
                      <button onClick={() => onRemoveSave(p.id)} className="pipeline-card-remove" title="Remove">
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <h4 className="pipeline-card-name" onClick={() => onSelectProperty(p)}>
                      {p.title}
                    </h4>
                    <div className="pipeline-card-metrics">
                      <span>{p.currency}{(p.price / 1e6).toFixed(1)}M</span>
                      <span className="pipeline-card-cap">{p.capRate}%</span>
                    </div>
                    <select
                      value={getStage(p.id)}
                      onChange={e => setStage(p.id, e.target.value)}
                      className="pipeline-card-select"
                    >
                      {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                ))}
                {inStage.length === 0 && (
                  <div className="pipeline-col-empty">No deals</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
