# Mitrava — Parametric Income Insurance for Food Delivery Partners
**Guidewire DEVTrails 2026** | Team of 5 | Web Platform

---

## The Problem
Zomato/Swiggy delivery partners lose 20–30% of monthly income during external disruptions (rain, heat, AQI spikes, curfews). No insurance exists for this. Mitrava fixes that.

---

## Persona
**Ravi, 26 — Swiggy delivery partner, Bangalore**
Earns ~₹600–900/day across two peak slots (10am–2pm, 6pm–11pm). A single rainy evening wipes out ₹300–400 with no recourse.

**Scenarios:**
- Heavy rain halts evening deliveries → auto payout triggered
- AQI 400+ → outdoor work advisory → coverage activated
- 46°C afternoon → heat index breach → partial payout for affected slot
- Local transport strike blocks pickup zones → social disruption payout

---

## Application Workflow
```
Onboarding → Risk Profiling → Weekly Policy Activation
→ Background Trigger Monitoring (hourly)
→ Disruption Detected → Fraud Check → Auto Claim → UPI Payout
→ Admin Dashboard Updated
```

---

## Platform Choice: Web
Food delivery partners already use Zomato/Swiggy on their phones via browser or app. A responsive web app reaches them instantly — no app store download, no device compatibility issues. For a parametric insurance product where the worker just needs to onboard once and then receive automatic payouts, a web interface is sufficient and far more accessible.

---

## Weekly Premium Model
Premiums are weekly to match gig workers' earnings cycle — they pay from this week's income to protect next week.

| Tier | Weekly Premium | Max Daily Payout |
|------|---------------|-----------------|
| Basic | ₹29 | ₹300 |
| Standard | ₹49 | ₹500 |
| Premium | ₹79 | ₹800 |

**Dynamic pricing:**
`Final Premium = Base × Zone Risk Multiplier (0.85–1.20) × Tenure Discount (0–15%)`

Zone risk is scored from historical disruption frequency in the worker's registered city zone.

---

## Parametric Triggers

| Trigger | Source | Threshold |
|---------|--------|-----------|
| Heavy Rain | OpenWeatherMap | ≥ 35mm/hr for 1+ hour |
| Extreme Heat | OpenWeatherMap | ≥ 44°C during peak slots |
| Severe AQI | AQICN API | ≥ 300 for 3+ consecutive hours |
| Curfew / Strike | Traffic anomaly + admin flag | >70% mobility drop in zone |

All triggers are objective and third-party verifiable. No manual claim filing required.

---

## AI/ML Integration Plan

- **Premium Calculation:** XGBoost regression model scoring zone risk from historical weather + disruption data → dynamic weekly pricing
- **Fraud Detection:** Isolation Forest anomaly detection — flags GPS mismatch, duplicate claims, abnormal claim frequency
- **Predictive Analytics (Admin):** Prophet time-series forecasting next week's disruption likelihood per zone

Phase 1 uses rule-based logic. ML models integrated from Phase 2 onward.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Tailwind CSS |
| Backend | Supabase (REST API + Edge Functions) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| ML | scikit-learn, XGBoost, Prophet |
| Weather/AQI | OpenWeatherMap, AQICN (free tiers) |
| Payments | Razorpay Test Mode |
| Hosting | Cloudflare Pages |

---

## Development Plan

**Phase 1 (by Mar 20):** Repo setup, README, clickable React prototype, 2-min video

**Phase 2 (by Apr 4):** Onboarding, policy management, dynamic pricing, trigger engine, claims flow, Razorpay integration

**Phase 3 (by Apr 17):** ML models, fraud detection, dual dashboard (worker + admin), final demo + pitch deck

---

## Team
| Member | Role |
|--------|------|
| TBD | Frontend |
| TBD | Frontend |
| TBD | Backend / Supabase |
| TBD | ML/AI |
| TBD | Integration / DevOps |

---

> *Mitrava — your steady hand on every shift.*
