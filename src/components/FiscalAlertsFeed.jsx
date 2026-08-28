import React from 'react';
import { X, Bell, Zap } from 'lucide-react';
import { MOCK_FISCAL_ALERTS } from '../data/propertiesData';

export default function FiscalAlertsFeed({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ justifyContent: 'flex-end' }}>
      <div className="alerts-panel" onClick={e => e.stopPropagation()}>
        <div className="alerts-header">
          <div>
            <h3 className="alerts-title">Fiscal Signals</h3>
            <p className="alerts-sub">Tax lien auctions, zone changes & macro signals</p>
          </div>
          <button onClick={onClose} className="modal-close"><X size={18} /></button>
        </div>

        <div className="alerts-list">
          {MOCK_FISCAL_ALERTS.map(alert => (
            <div key={alert.id} className="alert-item">
              <div className="alert-top">
                <div className="alert-meta">
                  <span className="alert-region">{alert.region}</span>
                  <span className="alert-time">{alert.time}</span>
                </div>
                <span className="alert-impact">{alert.impact}</span>
              </div>
              <h4 className="alert-title">{alert.title}</h4>
              <p className="alert-desc">{alert.description}</p>
            </div>
          ))}
        </div>

        <div className="alerts-footer">
          <span><Zap size={12} /> Regional Monitor</span>
          <span className="alerts-status">ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
