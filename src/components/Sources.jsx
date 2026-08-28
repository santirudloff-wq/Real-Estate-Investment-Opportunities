import React from 'react';

export default function Sources() {
  return (
    <div className="sources-container">
      <div className="sources-header">
        <h2 className="sources-title">Methodology & Data Sources</h2>
        <p className="sources-sub">Data aggregation and underwriting parameters are derived from the following institutional providers, finalized as of August 26, 2026.</p>
      </div>

      <div className="sources-grid">
        <div className="source-card">
          <h3 className="source-category">United States (NYC & Westchester)</h3>
          <ul className="source-list">
            <li><a href="https://www.costar.com/" target="_blank" rel="noopener noreferrer"><strong>CoStar Group:</strong></a> Submarket analytics, rent comps, historical vacancy rates, and new supply pipelines.</li>
            <li><a href="https://www.msci.com/our-solutions/real-estate-investing/real-capital-analytics" target="_blank" rel="noopener noreferrer"><strong>Real Capital Analytics (MSCI):</strong></a> Cap rate compression trends and institutional transaction volumes.</li>
            <li><a href="https://www.trepp.com/" target="_blank" rel="noopener noreferrer"><strong>Trepp:</strong></a> CMBS debt yields and distressed asset flagging for off-market acquisition targeting.</li>
            <li><a href="https://www.nyc.gov/site/finance/index.page" target="_blank" rel="noopener noreferrer"><strong>NYC Department of Finance:</strong></a> ACRIS database, Class 2/4 tax assessments, and PILOT abatement status.</li>
            <li><a href="https://www.westchesterclerk.com/" target="_blank" rel="noopener noreferrer"><strong>Westchester County Clerk:</strong></a> Deed records, local municipality tax rolls, and zoning variances.</li>
          </ul>
        </div>

        <div className="source-card">
          <h3 className="source-category">United Kingdom (London & Edinburgh)</h3>
          <ul className="source-list">
            <li><a href="https://www.gov.uk/government/organisations/land-registry" target="_blank" rel="noopener noreferrer"><strong>HM Land Registry:</strong></a> Price paid data, commercial title deeds, and historical transaction logs.</li>
            <li><a href="https://www.knightfrank.com/" target="_blank" rel="noopener noreferrer"><strong>Knight Frank</strong></a> & <a href="https://www.savills.co.uk/" target="_blank" rel="noopener noreferrer"><strong>Savills:</strong></a> Prime yield benchmarks and specialized submarket quarterly reports.</li>
            <li><a href="https://www.costar.co.uk/" target="_blank" rel="noopener noreferrer"><strong>CoStar UK:</strong></a> Leasing spreads, tenant demand modeling, and absorption rates.</li>
            <li><a href="https://www.ons.gov.uk/" target="_blank" rel="noopener noreferrer"><strong>Office for National Statistics (ONS):</strong></a> Macro demographic shifts and local inflation indices.</li>
            <li><a href="https://www.gov.uk/government/organisations/valuation-office-agency" target="_blank" rel="noopener noreferrer"><strong>Valuation Office Agency (VOA):</strong></a> Business rates valuations and council tax band delineations.</li>
          </ul>
        </div>

        <div className="source-card">
          <h3 className="source-category">Financial Modeling Parameters</h3>
          <ul className="source-list">
            <li><a href="https://www.newyorkfed.org/markets/reference-rates/sofr" target="_blank" rel="noopener noreferrer"><strong>Interest Rates (SOFR/SONIA):</strong></a> Secured overnight financing rate (SOFR) and SONIA forwards curves used for debt service modeling.</li>
            <li><a href="https://www.investopedia.com/terms/p/proforma.asp" target="_blank" rel="noopener noreferrer"><strong>Pro Forma Baselines:</strong></a> Year 1 anchored to FY2026, projecting a 5-year hold period to FY2030.</li>
            <li><a href="https://www.investopedia.com/terms/a/assessedvalue.asp" target="_blank" rel="noopener noreferrer"><strong>Tax Assessment Discount:</strong></a> Calculates the variance between the municipal assessed value and current replacement cost to quantify the valuation moat.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
