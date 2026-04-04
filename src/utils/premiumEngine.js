/**
 * Mitrava Dynamic Premium Calculation Engine
 * Formula: Final Premium = Base × Zone Risk × Seasonal × Tenure Discount × Platform
 */

const zoneRiskData = {
  'Koramangala':     { disruptions: 12, reason: 'Flood-prone, heavy rain zone'    },
  'Indiranagar':     { disruptions: 10, reason: 'High traffic, rain-affected'     },
  'HSR Layout':      { disruptions: 8,  reason: 'Moderate risk zone'              },
  'Electronic City': { disruptions: 8,  reason: 'Outer zone, moderate risk'       },
  'Whitefield':      { disruptions: 7,  reason: 'Moderate disruption history'     },
  'Jayanagar':       { disruptions: 9,  reason: 'Heavy rain zone'                 },
  'JP Nagar':        { disruptions: 9,  reason: 'Flood-prone area'               },
  'Marathahalli':    { disruptions: 10, reason: 'Traffic & rain disruptions'      },
  'Andheri':         { disruptions: 14, reason: 'Heavy rain, waterlogging'        },
  'Bandra':          { disruptions: 12, reason: 'Coastal zone, high rain risk'    },
  'Powai':           { disruptions: 9,  reason: 'Lake zone, flood risk'           },
  'Thane':           { disruptions: 13, reason: 'High disruption frequency'       },
  'Baner':           { disruptions: 7,  reason: 'Moderate disruption history'     },
  'Wakad':           { disruptions: 6,  reason: 'Low-moderate disruption zone'   },
  'Banjara Hills':   { disruptions: 6,  reason: 'Low disruption zone'            },
  'Hitech City':     { disruptions: 7,  reason: 'Moderate risk zone'             },
  'T Nagar':         { disruptions: 11, reason: 'Dense traffic, flood-prone'     },
  'Anna Nagar':      { disruptions: 9,  reason: 'Moderate disruption history'    },
  'Velachery':       { disruptions: 13, reason: 'Highly flood-prone zone'        },
  'Adyar':           { disruptions: 10, reason: 'Coastal, rain-affected'         },
  'Salt Lake':       { disruptions: 13, reason: 'Flood-prone zone'               },
  'Connaught Place': { disruptions: 7,  reason: 'Low disruption frequency'       },
  'Rohini':          { disruptions: 8,  reason: 'Moderate risk zone'             },
  'Sector 29':       { disruptions: 6,  reason: 'Low disruption zone'            },
  'Noida Sector 18': { disruptions: 8,  reason: 'Moderate disruption risk'       },
  'Vastrapur':       { disruptions: 5,  reason: 'Low disruption history'         },
}

const cityMonsoonRisk = {
  'Mumbai': 0.20, 'Chennai': 0.18, 'Kolkata': 0.18,
  'Kochi': 0.15, 'Hyderabad': 0.12, 'Bangalore': 0.10,
  'Pune': 0.10, 'Delhi': 0.08, 'Ahmedabad': 0.05,
}

function getZoneMultiplier(zone) {
  const data = zoneRiskData[zone]
  if (!data) return 1.00
  if (data.disruptions < 5)  return 0.85
  if (data.disruptions < 10) return 1.00
  return 1.20
}

function getSeasonalMultiplier(city) {
  const month = new Date().getMonth() + 1
  const isMonsoon = month >= 6 && month <= 9
  if (!isMonsoon) return 1.00
  return 1 + (cityMonsoonRisk[city] || 0.08)
}

function getTenureDiscount(weeksActive) {
  if (weeksActive >= 13) return 0.85
  if (weeksActive >= 5)  return 0.90
  return 1.00
}

export function calculateDynamicPremium(basePremium, profile, weeksActive = 0) {
  const zone  = profile?.zone || ''
  const city  = profile?.city || ''
  const isMonsoon = [6,7,8,9].includes(new Date().getMonth() + 1)

  const zoneMultiplier     = getZoneMultiplier(zone)
  const seasonalMultiplier = getSeasonalMultiplier(city)
  const tenureDiscount     = getTenureDiscount(weeksActive)

  const finalPremium = Math.round(
    basePremium * zoneMultiplier * seasonalMultiplier * tenureDiscount
  )

  const zoneData = zoneRiskData[zone]

  const breakdown = [
    {
      label: 'Base Premium',
      value: `₹${basePremium}`,
      note: 'Standard weekly rate for your tier',
      highlight: 'neutral',
    },
    {
      label: 'Zone Risk Multiplier',
      value: zoneMultiplier === 1.20 ? '↑ 1.20x' : zoneMultiplier === 0.85 ? '↓ 0.85x' : '— 1.00x',
      note: zoneData
        ? `${zone} · ${zoneData.disruptions} disruptions/month · ${zoneData.reason}`
        : `${zone || 'Your zone'} · Standard rate applied`,
      highlight: zoneMultiplier > 1.0 ? 'red' : zoneMultiplier < 1.0 ? 'green' : 'neutral',
    },
    {
      label: 'Seasonal Adjustment',
      value: isMonsoon ? `↑ ${seasonalMultiplier.toFixed(2)}x` : '— 1.00x',
      note: isMonsoon ? `Monsoon season active in ${city}` : 'No seasonal adjustment this month',
      highlight: isMonsoon ? 'yellow' : 'neutral',
    },
    {
      label: 'Loyalty Discount',
      value: tenureDiscount < 1 ? `↓ ${tenureDiscount}x` : '— None yet',
      note: weeksActive >= 13
        ? '15% loyalty reward — 13+ weeks active'
        : weeksActive >= 5
        ? '10% loyalty reward — 5+ weeks active'
        : `Discount unlocks at 5 weeks (${Math.max(0,5-weeksActive)} weeks to go)`,
      highlight: tenureDiscount < 1 ? 'green' : 'neutral',
    },
  ]

  return {
    finalPremium,
    basePremium,
    savings: Math.max(0, basePremium - finalPremium),
    breakdown,
    riskLevel: zoneMultiplier >= 1.2 ? 'High' : zoneMultiplier <= 0.85 ? 'Low' : 'Medium',
    zoneData,
  }
}

export function getZoneRiskInfo(zone) {
  return zoneRiskData[zone] || { disruptions: 7, reason: 'Standard risk zone' }
}
