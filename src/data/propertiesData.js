// ─────────────────────────────────────────────────
// VERITAS Capital Real Estate — Property Dataset
// Last updated: August 26, 2026
// ─────────────────────────────────────────────────

export const REGIONS = [
  { id: 'all', name: 'All Markets', count: 16 },
  { id: 'Westchester', name: 'Westchester County, NY', count: 4, flag: '🇺🇸', currency: '$', avgCap: '6.8%' },
  { id: 'NYC', name: 'New York City, NY', count: 4, flag: '🇺🇸', currency: '$', avgCap: '5.4%' },
  { id: 'London', name: 'London, UK', count: 4, flag: '🇬🇧', currency: '£', avgCap: '6.1%' },
  { id: 'Edinburgh', name: 'Edinburgh, UK', count: 4, flag: '🇬🇧', currency: '£', avgCap: '7.2%' },
];

export const ASSET_CLASSES = ['All', 'Multi-Family', 'Commercial', 'Mixed-Use', 'Development', 'Hospitality'];

export const STRATEGIES = [
  'All Strategies',
  'Tax Lien / Distressed',
  'Opportunity Zone',
  'Value-Add',
  'High Yield',
  'Historic Redevelopment'
];

// ─────────────────────────────────────────────────
// VERITAS SCORE FORMULA (transparent & auditable)
//
//   capRate         × 25 pts   (normalized 5–9%)
//   irr             × 25 pts   (normalized 15–25%)
//   fiscalScore     × 20 pts   (normalized 80–100)
//   taxDiscount     × 15 pts   (1 - taxAssessmentRatio)
//   strategyBonus   × 15 pts   (see STRATEGY_WEIGHTS)
//
//   Total: 0–100
// ─────────────────────────────────────────────────

const STRATEGY_WEIGHTS = {
  'Tax Lien / Distressed': 15,
  'Opportunity Zone': 14,
  'Value-Add': 12,
  'High Yield': 10,
  'Historic Redevelopment': 8,
};

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

export function computeVeritasScore(p) {
  const capPts      = clamp((p.capRate - 5) / (9 - 5), 0, 1) * 25;
  const irrPts      = clamp((p.irr - 15) / (25 - 15), 0, 1) * 25;
  const fiscalPts   = clamp((p.fiscalScore - 80) / (100 - 80), 0, 1) * 20;
  const taxPts      = clamp(1 - p.taxAssessmentRatio, 0, 1) * 15;
  const strategyPts = STRATEGY_WEIGHTS[p.strategy] || 8;
  return Math.round((capPts + irrPts + fiscalPts + strategyPts + taxPts) * 10) / 10;
}

// ─────────────────────────────────────────────────
// PROPERTIES — 16 institutional-grade opportunities
// Financials anchored: Year 1 = FY2026, Year 5 = FY2030
// ─────────────────────────────────────────────────

export const PROPERTIES = [
  // ── WESTCHESTER COUNTY ──
  {
    id: 'west-01',
    title: 'Yonkers Waterfront Multi-Family Portfolio',
    region: 'Westchester',
    city: 'Yonkers, NY',
    address: '142 Warburton Ave, Yonkers, NY 10701',
    assetClass: 'Multi-Family',
    strategy: 'Value-Add',
    price: 8450000,
    currency: '$',
    capRate: 7.2,
    irr: 18.4,
    noi: 608400,
    grossRevenue: 980000,
    sqft: 42500,
    units: 36,
    taxAssessmentRatio: 0.68,
    fiscalScore: 92,
    tags: ['Off-Market Deal', 'Yonkers IDA PILOT Freeze', '32% Below Replacement Cost'],
    description: 'Off-market acquisition of a 36-unit value-add multi-family complex located 2 blocks from Yonkers Metro-North. Acquired at a 32% discount to replacement cost with approved 15-year IDA tax freeze.',
    investmentRationale: {
      acquisitionType: 'Off-Market Direct Sourcing',
      valuationMoat: 'Acquired at $198/sqft vs $310/sqft Westchester replacement cost',
      supplyDemandMoat: 'Infill, supply-constrained transit submarket with zero new multi-family land supply',
      valueCreationPlan: 'Capitalize on 15-year Yonkers IDA PILOT tax freeze. Invest $650k in interior renovations to mark below-market units to market rent upon turnover.',
      exitStrategy: 'Individual asset sale to regional institutional multi-family buyer or aggregate into 100+ unit Westchester portfolio.'
    },
    fiscalHighlights: [
      'Qualifies for Yonkers IDA 15-year PILOT tax freeze (saves ~$120k annually)',
      'Assessed value is 32% below current replacement cost',
      'Opportunity for 22% NOI lift post-rehab with market rate unit conversions'
    ],
    financials: [
      { year: 'FY2026', revenue: 980000, noi: 608400, cashFlow: 382000 },
      { year: 'FY2027', revenue: 1080000, noi: 691200, cashFlow: 460000 },
      { year: 'FY2028', revenue: 1190000, noi: 773500, cashFlow: 540000 },
      { year: 'FY2029', revenue: 1280000, noi: 844800, cashFlow: 610000 },
      { year: 'FY2030', revenue: 1380000, noi: 924600, cashFlow: 685000 },
    ],
    coordinates: { lat: 40.9388, lng: -73.8973 }
  },
  {
    id: 'west-02',
    title: 'White Plains Downtown Commercial & Mixed-Use Hub',
    region: 'Westchester',
    city: 'White Plains, NY',
    address: '85 Mamaroneck Ave, White Plains, NY 10601',
    assetClass: 'Mixed-Use',
    strategy: 'Tax Lien / Distressed',
    price: 14200000,
    currency: '$',
    capRate: 7.8,
    irr: 21.2,
    noi: 1107600,
    grossRevenue: 1850000,
    sqft: 68000,
    taxAssessmentRatio: 0.61,
    fiscalScore: 95,
    tags: ['Complex Recapitalization', 'Tax Lien Foreclosure', '4x FAR Zoning Upside'],
    description: 'Distressed recapitalization of a 68,000 sq ft office & retail property via municipal tax lien foreclosure at a 39% discount. Downtown overlay permits 4x FAR density for residential conversion.',
    investmentRationale: {
      acquisitionType: 'Tax Lien Foreclosure & Lender Recapitalization',
      valuationMoat: 'Acquired at $208/sqft (vs $480/sqft exit market comps)',
      supplyDemandMoat: 'High-barrier White Plains CBD corridor adjacent to Metro-North Express Hub',
      valueCreationPlan: 'Reposition upper office floors into 75 luxury residential units while retaining high-margin ground floor retail. Leverage county tax-remediation transfer exemptions.',
      exitStrategy: 'Recapitalize post-conversion with institutional core-plus debt or exit to institutional REIT.'
    },
    fiscalHighlights: [
      'Acquisition via municipal tax lien foreclosure at 39% valuation discount',
      'Zoned for TOD (Transit-Oriented Development) residential conversion with 4x density bonus',
      'Exempt from county transfer taxes under tax-remediation statutes'
    ],
    financials: [
      { year: 'FY2026', revenue: 1850000, noi: 1107600, cashFlow: 690000 },
      { year: 'FY2027', revenue: 2100000, noi: 1323000, cashFlow: 895000 },
      { year: 'FY2028', revenue: 2450000, noi: 1592500, cashFlow: 1150000 },
      { year: 'FY2029', revenue: 2750000, noi: 1815000, cashFlow: 1370000 },
      { year: 'FY2030', revenue: 3100000, noi: 2077000, cashFlow: 1620000 },
    ],
    coordinates: { lat: 41.0340, lng: -73.7629 }
  },
  {
    id: 'west-03',
    title: 'Rye Historic Manor Commercial Conversion',
    region: 'Westchester',
    city: 'Rye, NY',
    address: '420 Boston Post Rd, Rye, NY 10580',
    assetClass: 'Commercial',
    strategy: 'Historic Redevelopment',
    price: 6800000,
    currency: '$',
    capRate: 6.4,
    irr: 16.8,
    noi: 435200,
    grossRevenue: 720000,
    sqft: 28000,
    taxAssessmentRatio: 0.75,
    fiscalScore: 88,
    tags: ['Off-Market Access', '40% Combined Tax Credit', 'Affluent Corridor'],
    description: 'Off-market acquisition of an iconic historic landmark commercial estate in Rye. Conversion into boutique corporate HQ & private medical suites backed by 40% Federal & State Tax Credits.',
    investmentRationale: {
      acquisitionType: 'Off-Market Private Seller Purchase',
      valuationMoat: 'Unrepeatable historic architecture on prime 3-acre Boston Post Rd corner',
      supplyDemandMoat: 'Ultra-affluent Rye submarket with median household income > $240,000 and severe commercial land freeze',
      valueCreationPlan: 'Unlock $2.7M in Federal & NY State Historic Rehabilitation Tax Credits. Reframe space into high-rent executive medical suites.',
      exitStrategy: 'Long-term yield hold or sale to family office wealth manager.'
    },
    fiscalHighlights: [
      'Qualifies for combined 40% Federal & State Historic Tax Credits ($2.7M credit value)',
      'Substantial property tax reduction granted under NYS Historic Preservation Act',
      'Low vacancy corridor with affluent demographic tailwinds'
    ],
    financials: [
      { year: 'FY2026', revenue: 720000, noi: 435200, cashFlow: 270000 },
      { year: 'FY2027', revenue: 810000, noi: 502200, cashFlow: 335000 },
      { year: 'FY2028', revenue: 900000, noi: 567000, cashFlow: 395000 },
      { year: 'FY2029', revenue: 980000, noi: 627200, cashFlow: 450000 },
      { year: 'FY2030', revenue: 1060000, noi: 689000, cashFlow: 510000 },
    ],
    coordinates: { lat: 40.9807, lng: -73.6840 }
  },
  {
    id: 'west-04',
    title: 'New Rochelle Soundview Medical & Office Plaza',
    region: 'Westchester',
    city: 'New Rochelle, NY',
    address: '270 North Ave, New Rochelle, NY 10801',
    assetClass: 'Commercial',
    strategy: 'High Yield',
    price: 11500000,
    currency: '$',
    capRate: 7.9,
    irr: 19.8,
    noi: 908500,
    grossRevenue: 1520000,
    sqft: 52000,
    taxAssessmentRatio: 0.70,
    fiscalScore: 91,
    tags: ['Below Replacement Cost', 'Montefiore Anchored', 'High Yield Play'],
    description: 'Medical office asset acquired at a 7.9% cap rate. 88% leased with Montefiore Health System anchor tenant providing immediate risk-adjusted yield.',
    investmentRationale: {
      acquisitionType: 'Off-Market Institutional Sale',
      valuationMoat: 'Acquired at $221/sqft (30% below replacement cost)',
      supplyDemandMoat: 'High barrier medical corridor directly connected to regional hospital hub',
      valueCreationPlan: 'Lease up 12% vacant medical space and convert existing gross leases to NNN leases with 3.5% escalations.',
      exitStrategy: 'Sell to healthcare REIT upon reaching 98% occupancy.'
    },
    fiscalHighlights: [
      'New Rochelle Downtown DRI Grant zone beneficiary for surrounding infrastructure',
      'Triple Net (NNN) lease structure with inflation-indexed escalations',
      'Cap rate premium of 150 bps over NYC metro office averages'
    ],
    financials: [
      { year: 'FY2026', revenue: 1520000, noi: 908500, cashFlow: 580000 },
      { year: 'FY2027', revenue: 1640000, noi: 1000400, cashFlow: 660000 },
      { year: 'FY2028', revenue: 1780000, noi: 1103600, cashFlow: 755000 },
      { year: 'FY2029', revenue: 1920000, noi: 1209600, cashFlow: 850000 },
      { year: 'FY2030', revenue: 2080000, noi: 1331200, cashFlow: 960000 },
    ],
    coordinates: { lat: 40.9115, lng: -73.7826 }
  },

  // ── NEW YORK CITY ──
  {
    id: 'nyc-01',
    title: 'Brooklyn Navy Yard Opportunity Zone Mixed-Use',
    region: 'NYC',
    city: 'Brooklyn, NY',
    address: '540 Flushing Ave, Brooklyn, NY 11205',
    assetClass: 'Mixed-Use',
    strategy: 'Opportunity Zone',
    price: 18900000,
    currency: '$',
    capRate: 6.7,
    irr: 22.5,
    noi: 1266300,
    grossRevenue: 2100000,
    sqft: 74000,
    taxAssessmentRatio: 0.65,
    fiscalScore: 97,
    tags: ['Federal Opportunity Zone', '100% Tax Free Capital Gains', 'Infill Supply-Constrained'],
    description: '74,000 sq ft industrial & creative office building in a designated Federal Opportunity Zone. 10-year holding period provides 100% federal capital gains tax exemption on exit.',
    investmentRationale: {
      acquisitionType: 'Off-Market Lender Direct Sourcing',
      valuationMoat: 'Acquired at $255/sqft in high-growth Navy Yard innovation corridor',
      supplyDemandMoat: 'Severe supply constraints on creative industrial space in North Brooklyn',
      valueCreationPlan: 'Reimagine space into high-density tech/maker suites. Enroll building in 25-Year ICAP Property Tax Abatement.',
      exitStrategy: '10-Year Opportunity Zone fund exit with zero capital gains tax.'
    },
    fiscalHighlights: [
      'Designated Federal Opportunity Zone (100% Tax-Free capital gains after 10 yrs)',
      'Approved for NYC ICAP 25-Year Property Tax Abatement',
      'High growth innovation district adjacent to Brooklyn Navy Yard'
    ],
    financials: [
      { year: 'FY2026', revenue: 2100000, noi: 1266300, cashFlow: 790000 },
      { year: 'FY2027', revenue: 2350000, noi: 1457000, cashFlow: 970000 },
      { year: 'FY2028', revenue: 2680000, noi: 1715200, cashFlow: 1210000 },
      { year: 'FY2029', revenue: 3020000, noi: 1963000, cashFlow: 1440000 },
      { year: 'FY2030', revenue: 3400000, noi: 2244000, cashFlow: 1710000 },
    ],
    coordinates: { lat: 40.6989, lng: -73.9575 }
  },
  {
    id: 'nyc-02',
    title: 'Financial District Office-to-Residential Conversion',
    region: 'NYC',
    city: 'Manhattan, NY',
    address: '90 John St, New York, NY 10038',
    assetClass: 'Development',
    strategy: 'Value-Add',
    price: 34500000,
    currency: '$',
    capRate: 5.8,
    irr: 20.1,
    noi: 2001000,
    grossRevenue: 3400000,
    sqft: 115000,
    taxAssessmentRatio: 0.59,
    fiscalScore: 94,
    tags: ['Below Replacement Cost', 'NYC 467-m Abatement', 'Distressed Debt Play'],
    description: 'Off-market acquisition of a 115,000 sq ft vacant office building at $300/sqft. Pre-approved for NYC 467-m residential conversion tax incentive (90% tax reduction for 35 years).',
    investmentRationale: {
      acquisitionType: 'Distressed Debt Acquisition & Foreclosure',
      valuationMoat: 'Acquired at $300/sqft vs $850/sqft FiDi residential market value',
      supplyDemandMoat: 'Prime Lower Manhattan location with surging residential rental demand',
      valueCreationPlan: 'Execute office-to-residential conversion into 140 luxury apartments. Lock in 35-year tax abatement saving $18.4M in property taxes.',
      exitStrategy: 'Refinance into permanent multi-family debt or sell to institutional asset manager.'
    },
    fiscalHighlights: [
      'Enrolled in NYC 467-m Affordable Housing & Commercial Conversion Tax Incentive',
      'Estimated $18.4M cumulative property tax savings over 30-year abatement schedule',
      'Distressed acquisition price per sq ft ($300/sqft vs $850/sqft residential market exit)'
    ],
    financials: [
      { year: 'FY2026', revenue: 3400000, noi: 2001000, cashFlow: 1100000 },
      { year: 'FY2027', revenue: 3950000, noi: 2449000, cashFlow: 1520000 },
      { year: 'FY2028', revenue: 4600000, noi: 2944000, cashFlow: 1980000 },
      { year: 'FY2029', revenue: 5200000, noi: 3380000, cashFlow: 2390000 },
      { year: 'FY2030', revenue: 5850000, noi: 3861000, cashFlow: 2840000 },
    ],
    coordinates: { lat: 40.7081, lng: -74.0068 }
  },
  {
    id: 'nyc-03',
    title: 'Astoria Queens Multi-Family Portfolio',
    region: 'NYC',
    city: 'Queens, NY',
    address: '31-15 Astoria Blvd, Long Island City, NY 11102',
    assetClass: 'Multi-Family',
    strategy: 'High Yield',
    price: 12800000,
    currency: '$',
    capRate: 6.9,
    irr: 17.6,
    noi: 883200,
    grossRevenue: 1420000,
    sqft: 38000,
    units: 28,
    taxAssessmentRatio: 0.72,
    fiscalScore: 89,
    tags: ['Free-Market Units', 'Portfolio Aggregation', 'Low Vacancy Corridor'],
    description: '28-unit multi-family building with 100% free-market rents (exempt from rent regulation). High-yielding residential asset with consistent sub-2% vacancy.',
    investmentRationale: {
      acquisitionType: 'Off-Market Family Estate Purchase',
      valuationMoat: '100% deregulated units offering immediate rent escalation flexibility',
      supplyDemandMoat: 'Astoria transit hub 15 minutes from Midtown Manhattan with high millennial tenant demand',
      valueCreationPlan: 'Upgrade common areas and add private balconies to command 15% rent premium.',
      exitStrategy: 'Combine with 3 adjacent properties to create a 100-unit Queens portfolio for institutional exit.'
    },
    fiscalHighlights: [
      '100% deregulated free-market rental income roll',
      'NYC J-51 Tax Incentive eligible for capital improvements',
      'Cash-on-cash return projected at 9.4% post debt service'
    ],
    financials: [
      { year: 'FY2026', revenue: 1420000, noi: 883200, cashFlow: 540000 },
      { year: 'FY2027', revenue: 1520000, noi: 957600, cashFlow: 610000 },
      { year: 'FY2028', revenue: 1640000, noi: 1049600, cashFlow: 695000 },
      { year: 'FY2029', revenue: 1760000, noi: 1144000, cashFlow: 785000 },
      { year: 'FY2030', revenue: 1890000, noi: 1247400, cashFlow: 880000 },
    ],
    coordinates: { lat: 40.7719, lng: -73.9213 }
  },
  {
    id: 'nyc-04',
    title: 'SoHo Prime Retail & Luxury Loft Building',
    region: 'NYC',
    city: 'Manhattan, NY',
    address: '462 Broome St, New York, NY 10013',
    assetClass: 'Mixed-Use',
    strategy: 'Value-Add',
    price: 26500000,
    currency: '$',
    capRate: 5.6,
    irr: 16.2,
    noi: 1484000,
    grossRevenue: 2400000,
    sqft: 31000,
    taxAssessmentRatio: 0.78,
    fiscalScore: 86,
    tags: ['Off-Market Access', 'Unused Air Rights', 'SoHo Landmark'],
    description: 'Iconic 5-story landmark building in SoHo Cast-Iron Historic District. Includes 8,000 sq ft flagship retail, 4 luxury lofts, and 12,500 sq ft unused air rights.',
    investmentRationale: {
      acquisitionType: 'Off-Market Private Sourcing',
      valuationMoat: 'Irreplaceable SoHo Cast-Iron corner location',
      supplyDemandMoat: 'Strict historic preservation rules prevent competing new commercial supply',
      valueCreationPlan: 'Monetize 12,500 sq ft unused air rights via transfer to adjacent parcel. Reposition retail space for global luxury brand.',
      exitStrategy: 'Recapitalize with sovereign wealth or luxury retail fund.'
    },
    fiscalHighlights: [
      'Unused commercial air rights included (12,500 sq ft unused FAR)',
      'Retail tenant covers 70% of building operating expenses and taxes',
      'Strong inflation hedge with luxury retail turnover clauses'
    ],
    financials: [
      { year: 'FY2026', revenue: 2400000, noi: 1484000, cashFlow: 880000 },
      { year: 'FY2027', revenue: 2550000, noi: 1606500, cashFlow: 995000 },
      { year: 'FY2028', revenue: 2720000, noi: 1740800, cashFlow: 1120000 },
      { year: 'FY2029', revenue: 2900000, noi: 1885000, cashFlow: 1255000 },
      { year: 'FY2030', revenue: 3100000, noi: 2046000, cashFlow: 1400000 },
    ],
    coordinates: { lat: 40.7223, lng: -74.0011 }
  },

  // ── LONDON, UK ──
  {
    id: 'ldn-01',
    title: 'Shoreditch Tech Hub Commercial Redevelopment',
    region: 'London',
    city: 'London, UK',
    address: '18-24 Great Eastern St, London EC2A 3NT',
    assetClass: 'Commercial',
    strategy: 'Value-Add',
    price: 15800000,
    currency: '£',
    capRate: 6.5,
    irr: 19.4,
    noi: 1027000,
    grossRevenue: 1680000,
    sqft: 48000,
    taxAssessmentRatio: 0.67,
    fiscalScore: 93,
    tags: ['Off-Market Access', 'Supply-Constrained Infill', '100% Tax Write-Off Eligible'],
    description: '48,000 sq ft creative tech office hub 3 mins from Liverpool Street station. Eligible for UK Capital Allowances 100% first-year tax write-offs on fit-out.',
    investmentRationale: {
      acquisitionType: 'Off-Market Insolvency Administrator Deal',
      valuationMoat: 'Acquired at £329/sqft (vs £750/sqft prime EC2 comps)',
      supplyDemandMoat: 'Elizabeth Line / Crossrail hub location with severe office development caps',
      valueCreationPlan: 'Execute BREEAM Excellent upgrade. Claim UK Capital Allowances write-offs saving up to £3.2M in corporate taxes.',
      exitStrategy: 'Sell to European tech office fund or UK institutional pension.'
    },
    fiscalHighlights: [
      'Eligible for UK Capital Allowances write-off (up to 100% first-year tax deduction on fit-out)',
      'Substantial SDLT (Stamp Duty Land Tax) multiple dwellings relief',
      'Elizabeth Line connectivity drove 14% rental yield growth across EC2'
    ],
    financials: [
      { year: 'FY2026', revenue: 1680000, noi: 1027000, cashFlow: 650000 },
      { year: 'FY2027', revenue: 1850000, noi: 1165500, cashFlow: 780000 },
      { year: 'FY2028', revenue: 2050000, noi: 1312000, cashFlow: 920000 },
      { year: 'FY2029', revenue: 2280000, noi: 1482000, cashFlow: 1080000 },
      { year: 'FY2030', revenue: 2520000, noi: 1663200, cashFlow: 1250000 },
    ],
    coordinates: { lat: 51.5246, lng: -0.0801 }
  },
  {
    id: 'ldn-02',
    title: 'Kensington Prime Residential Conversion Scheme',
    region: 'London',
    city: 'London, UK',
    address: '74-80 Old Brompton Rd, London SW7 3LQ',
    assetClass: 'Mixed-Use',
    strategy: 'Historic Redevelopment',
    price: 22400000,
    currency: '£',
    capRate: 5.5,
    irr: 17.8,
    noi: 1232000,
    grossRevenue: 1950000,
    sqft: 34000,
    taxAssessmentRatio: 0.74,
    fiscalScore: 88,
    tags: ['Below Replacement Cost', '5% Reduced VAT Scheme', 'Prime Central London'],
    description: 'Victorian red-brick property with planning consent for 14 luxury penthouse apartments. Benefits from UK reduced 5% VAT rate on residential conversion construction.',
    investmentRationale: {
      acquisitionType: 'Off-Balance-Sheet Private Acquisition',
      valuationMoat: 'Unrepeatable Kensington corner parcel with existing residential consent',
      supplyDemandMoat: 'Prime Central London international capital safe-haven with zero new greenfield land',
      valueCreationPlan: 'Execute conversion taking advantage of 5% VAT construction rate (saves ~£1.2M in VAT). Market penthouses to international buyers.',
      exitStrategy: 'Individual luxury unit sell-off upon project completion.'
    },
    fiscalHighlights: [
      '5% reduced VAT rate on residential conversion construction costs (saves ~£1.2M)',
      'Prime Central London capital growth history averaging 5.8% p.a. over 20 years',
      'Exempt from non-resident CGT surcharge under UK corporate holding structure'
    ],
    financials: [
      { year: 'FY2026', revenue: 1950000, noi: 1232000, cashFlow: 760000 },
      { year: 'FY2027', revenue: 2150000, noi: 1376000, cashFlow: 890000 },
      { year: 'FY2028', revenue: 2380000, noi: 1547000, cashFlow: 1040000 },
      { year: 'FY2029', revenue: 2620000, noi: 1729200, cashFlow: 1210000 },
      { year: 'FY2030', revenue: 2900000, noi: 1943000, cashFlow: 1400000 },
    ],
    coordinates: { lat: 51.4925, lng: -0.1764 }
  },
  {
    id: 'ldn-03',
    title: 'Canary Wharf High-Yield Corporate Office Tower',
    region: 'London',
    city: 'London, UK',
    address: '25 Bank St, London E14 5JP',
    assetClass: 'Commercial',
    strategy: 'High Yield',
    price: 48000000,
    currency: '£',
    capRate: 7.6,
    irr: 20.8,
    noi: 3648000,
    grossRevenue: 5600000,
    sqft: 185000,
    taxAssessmentRatio: 0.62,
    fiscalScore: 96,
    tags: ['Complex Recapitalization', '42% Valuation Discount', 'High Yield Play'],
    description: '185,000 sq ft office tower acquired at a 42% valuation discount from peak levels. High cash flow underwritten by blue-chip institutional tenants with 8.2 years WAULT.',
    investmentRationale: {
      acquisitionType: 'Distressed Debt Recapitalization from European Lender',
      valuationMoat: 'Acquired at £259/sqft (vs London replacement cost of £650/sqft)',
      supplyDemandMoat: 'Canary Wharf financial core with high infrastructure connectivity',
      valueCreationPlan: 'Reposition lower floors into life sciences and educational lab space. Harvest 7.6% net cash yield.',
      exitStrategy: 'Refinance and hold for high dividend yield or sell to Asian institutional investor.'
    },
    fiscalHighlights: [
      'Acquired at £259/sqft (vs London average replacement cost of £650/sqft)',
      'Substantial UK Capital Allowances pool (£14M embedded tax relief)',
      'High net yield providing immediate cash dividend to PE fund LP investors'
    ],
    financials: [
      { year: 'FY2026', revenue: 5600000, noi: 3648000, cashFlow: 2200000 },
      { year: 'FY2027', revenue: 6100000, noi: 4026000, cashFlow: 2550000 },
      { year: 'FY2028', revenue: 6700000, noi: 4489000, cashFlow: 2980000 },
      { year: 'FY2029', revenue: 7350000, noi: 4998000, cashFlow: 3450000 },
      { year: 'FY2030', revenue: 8100000, noi: 5589000, cashFlow: 4000000 },
    ],
    coordinates: { lat: 51.5033, lng: -0.0195 }
  },
  {
    id: 'ldn-04',
    title: 'Croydon Build-to-Rent Multi-Family Scheme',
    region: 'London',
    city: 'London, UK',
    address: '10 Wellesley Rd, Croydon CR0 2AA',
    assetClass: 'Multi-Family',
    strategy: 'Opportunity Zone',
    price: 19500000,
    currency: '£',
    capRate: 7.1,
    irr: 18.9,
    noi: 1384500,
    grossRevenue: 2150000,
    sqft: 86000,
    units: 110,
    taxAssessmentRatio: 0.69,
    fiscalScore: 90,
    tags: ['Portfolio Aggregation', 'GLA Housing Grant', 'Supply-Constrained Commuter'],
    description: '110-unit purpose-built rental building (BTR) in Croydon Growth Zone. Supported by Croydon Council tax relief and Mayor of London infrastructure funding.',
    investmentRationale: {
      acquisitionType: 'Forward Purchase Discount from Developer',
      valuationMoat: 'Forward purchase acquired at a 15% discount to open-market retail pricing',
      supplyDemandMoat: 'Commuter hub 15 minutes to London Bridge with chronic rental undersupply',
      valueCreationPlan: 'Implement professional institutional BTR management platform. Capture 4.8% annual rental inflation indexing.',
      exitStrategy: 'Bundle into UK Single-Family / BTR rental platform for public REIT buyout.'
    },
    fiscalHighlights: [
      'Greater London Authority Housing Infrastructure Grant beneficiary',
      '100% occupancy history with 4.8% annual rental inflation indexing',
      'Exempt from local council empty-property tax levies'
    ],
    financials: [
      { year: 'FY2026', revenue: 2150000, noi: 1384500, cashFlow: 880000 },
      { year: 'FY2027', revenue: 2320000, noi: 1508000, cashFlow: 990000 },
      { year: 'FY2028', revenue: 2520000, noi: 1663200, cashFlow: 1130000 },
      { year: 'FY2029', revenue: 2740000, noi: 1835800, cashFlow: 1290000 },
      { year: 'FY2030', revenue: 2980000, noi: 2026400, cashFlow: 1470000 },
    ],
    coordinates: { lat: 51.3762, lng: -0.0982 }
  },

  // ── EDINBURGH, UK ──
  {
    id: 'edi-01',
    title: 'Leith Waterfront Mixed-Use Commercial Quarter',
    region: 'Edinburgh',
    city: 'Edinburgh, UK',
    address: '34 Commercial St, Leith, Edinburgh EH6 6LX',
    assetClass: 'Mixed-Use',
    strategy: 'Value-Add',
    price: 9800000,
    currency: '£',
    capRate: 7.5,
    irr: 20.4,
    noi: 735000,
    grossRevenue: 1180000,
    sqft: 45000,
    taxAssessmentRatio: 0.64,
    fiscalScore: 95,
    tags: ['Off-Market Access', 'LBTT Tax Relief', 'Tram Line Expansion'],
    description: 'Off-market acquisition of a 45,000 sq ft waterfront commercial complex on the new Edinburgh Tram Line. Qualifies for Scottish LBTT tax relief.',
    investmentRationale: {
      acquisitionType: 'Off-Market Direct Owner Transaction',
      valuationMoat: 'Acquired at £217/sqft in rapidly gentrifying Leith waterfront district',
      supplyDemandMoat: 'New Edinburgh Tram Line station at doorstep providing 12-minute transit link to St James Quarter',
      valueCreationPlan: 'Convert underutilized rear warehouses into creative tech offices and artisanal food hall. Capture 35% rental upside.',
      exitStrategy: 'Sale to UK regional institutional investor or Scottish property trust.'
    },
    fiscalHighlights: [
      'Qualifies for Scottish Land and Buildings Transaction Tax (LBTT) Relief',
      'Tram extension increased footfall by 38% driving retail revenue upside',
      'Assessed rateable value is 36% below peer city-center assets'
    ],
    financials: [
      { year: 'FY2026', revenue: 1180000, noi: 735000, cashFlow: 460000 },
      { year: 'FY2027', revenue: 1310000, noi: 838400, cashFlow: 550000 },
      { year: 'FY2028', revenue: 1460000, noi: 949000, cashFlow: 650000 },
      { year: 'FY2029', revenue: 1620000, noi: 1069200, cashFlow: 760000 },
      { year: 'FY2030', revenue: 1800000, noi: 1206000, cashFlow: 880000 },
    ],
    coordinates: { lat: 55.9742, lng: -3.1706 }
  },
  {
    id: 'edi-02',
    title: 'New Town Georgian Townhouse Commercial Portfolio',
    region: 'Edinburgh',
    city: 'Edinburgh, UK',
    address: '14 Charlotte Square, Edinburgh EH2 4DJ',
    assetClass: 'Commercial',
    strategy: 'Historic Redevelopment',
    price: 11200000,
    currency: '£',
    capRate: 6.8,
    irr: 17.5,
    noi: 761600,
    grossRevenue: 1220000,
    sqft: 32000,
    taxAssessmentRatio: 0.71,
    fiscalScore: 91,
    tags: ['UNESCO World Heritage', 'Listed Rate Exemption', 'Prestigious Address'],
    description: 'Portfolio of 3 Georgian townhouses in Charlotte Square. Ideal for wealth management HQs or luxury apartment conversion with Historic Scotland repair grants.',
    investmentRationale: {
      acquisitionType: 'Off-Market Off-Balance-Sheet Purchase',
      valuationMoat: 'Unrepeatable UNESCO World Heritage architecture on Charlotte Square',
      supplyDemandMoat: 'Strict conservation laws guarantee zero new competing office supply',
      valueCreationPlan: 'Reposition interior space into private family office suites with shared club amenities.',
      exitStrategy: 'Private sale to ultra-high-net-worth family office or institutional investor.'
    },
    fiscalHighlights: [
      'Supported by Historic Environment Scotland repair and enhancement grants',
      'Exempt from Scottish empty property rates due to Listed Building status',
      'Unmatched prestige location commanding 20% rental premium'
    ],
    financials: [
      { year: 'FY2026', revenue: 1220000, noi: 761600, cashFlow: 480000 },
      { year: 'FY2027', revenue: 1340000, noi: 857600, cashFlow: 565000 },
      { year: 'FY2028', revenue: 1480000, noi: 962000, cashFlow: 660000 },
      { year: 'FY2029', revenue: 1630000, noi: 1075800, cashFlow: 760000 },
      { year: 'FY2030', revenue: 1800000, noi: 1206000, cashFlow: 875000 },
    ],
    coordinates: { lat: 55.9526, lng: -3.2072 }
  },
  {
    id: 'edi-03',
    title: 'University Quarter Student Housing Complex',
    region: 'Edinburgh',
    city: 'Edinburgh, UK',
    address: '88 South Bridge, Edinburgh EH1 1HN',
    assetClass: 'Multi-Family',
    strategy: 'High Yield',
    price: 16500000,
    currency: '£',
    capRate: 7.9,
    irr: 21.6,
    noi: 1303500,
    grossRevenue: 1980000,
    sqft: 62000,
    units: 145,
    taxAssessmentRatio: 0.63,
    fiscalScore: 96,
    tags: ['Below Replacement Cost', '0% Council Tax on Students', '100% Pre-Leased'],
    description: '145-bed student accommodation 400m from University of Edinburgh Central Campus. Pre-leased 3 years in advance with zero council tax liabilities.',
    investmentRationale: {
      acquisitionType: 'Off-Market Developer Buyout',
      valuationMoat: 'Acquired at £113k/bed vs £185k/bed replacement cost in central Edinburgh',
      supplyDemandMoat: 'Global top-30 university student catchment with severe housing deficit',
      valueCreationPlan: 'Optimize occupancy efficiency and upgrade high-speed fiber infrastructure. Capture 5.2% annual tuition & rent escalation.',
      exitStrategy: 'Sell to global student housing fund or UK pension operator.'
    },
    fiscalHighlights: [
      'Exempt from local council tax payments due to student tenant classification',
      'Rental payments backed by parental guarantors yielding zero bad-debt write-offs',
      'Higher net yield than any UK regional student hub outside London'
    ],
    financials: [
      { year: 'FY2026', revenue: 1980000, noi: 1303500, cashFlow: 840000 },
      { year: 'FY2027', revenue: 2140000, noi: 1433800, cashFlow: 955000 },
      { year: 'FY2028', revenue: 2320000, noi: 1577600, cashFlow: 1085000 },
      { year: 'FY2029', revenue: 2520000, noi: 1738800, cashFlow: 1230000 },
      { year: 'FY2030', revenue: 2740000, noi: 1918000, cashFlow: 1395000 },
    ],
    coordinates: { lat: 55.9485, lng: -3.1873 }
  },
  {
    id: 'edi-04',
    title: 'Old Town Royal Mile Boutique Hotel Conversion',
    region: 'Edinburgh',
    city: 'Edinburgh, UK',
    address: '152 Royal Mile, Edinburgh EH1 2QS',
    assetClass: 'Hospitality',
    strategy: 'Tax Lien / Distressed',
    price: 13800000,
    currency: '£',
    capRate: 7.3,
    irr: 19.1,
    noi: 1007400,
    grossRevenue: 1650000,
    sqft: 41000,
    taxAssessmentRatio: 0.66,
    fiscalScore: 92,
    tags: ['Distressed Insolvency Deal', 'Royal Mile Prime', 'High RevPAR Tourism'],
    description: '45-room boutique hotel and restaurant property located directly on the Royal Mile. Acquired via bank insolvency at a 35% discount to appraisal.',
    investmentRationale: {
      acquisitionType: 'Bank Insolvency Direct Purchase',
      valuationMoat: 'Acquired at £336/sqft on world-famous Royal Mile tourist artery',
      supplyDemandMoat: 'City council hotel planning restrictions prevent new competing hotels in Old Town',
      valueCreationPlan: 'Reposition hotel brand under luxury lifestyle operator. Capitalize on year-round RevPAR boom from Fringe Festival & Hogmanay.',
      exitStrategy: 'Sale to global boutique hotel operator or hospitality REIT.'
    },
    fiscalHighlights: [
      'Bank distress purchase at £336/sqft on Royal Mile prime tourist artery',
      'Year-round high RevPAR driven by Edinburgh Fringe Festival & Hogmanay events',
      'Capital allowances available for existing hotel equipment and refurbishment'
    ],
    financials: [
      { year: 'FY2026', revenue: 1650000, noi: 1007400, cashFlow: 630000 },
      { year: 'FY2027', revenue: 1820000, noi: 1146600, cashFlow: 740000 },
      { year: 'FY2028', revenue: 2020000, noi: 1292800, cashFlow: 870000 },
      { year: 'FY2029', revenue: 2240000, noi: 1456000, cashFlow: 1010000 },
      { year: 'FY2030', revenue: 2480000, noi: 1636800, cashFlow: 1170000 },
    ],
    coordinates: { lat: 55.9497, lng: -3.1909 }
  }
];

// Helper: format a date N days ago
function daysAgoFormatted(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export const MOCK_FISCAL_ALERTS = [
  {
    id: 1,
    time: daysAgoFormatted(0),
    region: 'Westchester',
    title: 'Yonkers Tax Lien Sale Announced',
    description: 'City of Yonkers releases annual tax lien sale list featuring 14 commercial properties with >30% tax discounts.',
    type: 'lien',
    impact: 'High Opportunity'
  },
  {
    id: 2,
    time: daysAgoFormatted(0),
    region: 'NYC',
    title: '467-m Tax Abatement Guidance Issued',
    description: 'NYC HPD releases expanded eligibility rules for 35-year property tax exemption on office-to-residential conversions.',
    type: 'tax',
    impact: 'Regulatory Lift'
  },
  {
    id: 3,
    time: daysAgoFormatted(1),
    region: 'London',
    title: 'Bank of England Rate Cut Signal',
    description: 'Yield compression expected across UK commercial property as UK base rates trend lower, boosting target IRRs.',
    type: 'macro',
    impact: 'Cap Rate Compression'
  },
  {
    id: 4,
    time: daysAgoFormatted(2),
    region: 'Edinburgh',
    title: 'Leith Waterfront Rezoned for 5x Density',
    description: 'Edinburgh City Council approves masterplan zoning update for mixed-use commercial and residential expansion.',
    type: 'zoning',
    impact: 'FAR Expansion'
  }
];
