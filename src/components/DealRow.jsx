import React from 'react';

export default function DealRow({ property, rank, score, onSelect }) {
  const fmt = (n) => {
    if (n >= 1e6) return property.currency + (n / 1e6).toFixed(1) + 'M';
    return property.currency + (n / 1e3).toFixed(0) + 'k';
  };

  return (
    <tr onClick={() => onSelect(property)} className="deal-tr">
      <td className="deal-td deal-td-rank">{rank}</td>
      <td className="deal-td deal-td-name">
        <div className="deal-name">{property.title}</div>
        <div className="deal-addr">{property.address}</div>
      </td>
      <td className="deal-td deal-td-region">{property.region}</td>
      <td className="deal-td">{property.assetClass}</td>
      <td className="deal-td">{property.strategy}</td>
      <td className="deal-td deal-td-mono">{fmt(property.price)}</td>
      <td className="deal-td deal-td-mono">{property.currency}{Math.round(property.price / property.sqft)}</td>
      <td className="deal-td deal-td-mono">{fmt(property.grossRevenue / 12)}</td>
      <td className="deal-td deal-td-mono">{fmt(property.noi / 12)}</td>
      <td className="deal-td deal-td-mono">{fmt(property.noi)}</td>
      <td className="deal-td deal-td-mono">{property.capRate}%</td>
      <td className="deal-td deal-td-mono">{property.irr}%</td>
      <td className="deal-td deal-td-mono deal-td-score">{score.toFixed(1)}</td>
    </tr>
  );
}
