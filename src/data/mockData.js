// 🔥 GET USER DATA (SAFE)
const profileData = typeof window !== "undefined"
  ? localStorage.getItem("userProfile")
  : null;

const profile = profileData ? JSON.parse(profileData) : null;

// Mock worker profile (dynamic)
export const worker = {
  name: profile?.name || 'User',
  city: profile?.city || 'City',
  zone: profile?.zone || 'Zone',
  platforms: profile?.platforms || ['Zomato'],
  avgDailyEarnings: profile?.earnings || 700,
  plan: 'Standard',
  weeklyPremium: 49,
  coveragePerDay: profile?.earnings || 500,
  weeksActive: 8,
  totalProtected: profile?.earnings ? profile.earnings * 3 : 2400,
  claimsPaid: 6,
}

// Mock plans (no change needed)
export const plans = [
  {
    id: 'basic',
    name: 'Basic',
    icon: '🔵',
    weeklyPrice: 29,
    maxDailyPayout: 300,
    features: ['Rain & flood coverage', 'Auto claim triggering', 'UPI instant payout'],
  },
  {
    id: 'standard',
    name: 'Standard',
    icon: '🛡️',
    weeklyPrice: 49,
    maxDailyPayout: 500,
    popular: true,
    features: ['All Basic features', 'Heat & AQI coverage', 'Zone risk discounts'],
  },
  {
    id: 'premium',
    name: 'Premium',
    icon: '⭐',
    weeklyPrice: 79,
    maxDailyPayout: 800,
    features: ['All Standard features', 'Curfew & strike cover', 'Priority payouts'],
  },
]

// Dynamic risk
export const todaysRisk = [
  {
    id: 1,
    name: 'Heavy Rain',
    sub: `80mm/hr · ${profile?.zone || 'Zone'}`,
    level: 'High',
    icon: '🌧️',
    color: 'red'
  },
  {
    id: 2,
    name: 'AQI 180',
    sub: `Moderate · ${profile?.city || 'City'}`,
    level: 'Moderate',
    icon: '🌫️',
    color: 'yellow'
  },
]

// Dynamic claim timeline
export const claimTimeline = [
  {
    id: 1,
    icon: '🌧️',
    title: 'Rain Threshold Breached',
    desc: `80mm/hr detected · Exceeds trigger in ${profile?.zone || 'zone'}`,
    time: '10:30 AM',
  },
  {
    id: 2,
    icon: '📍',
    title: 'Location Verified',
    desc: `Worker confirmed in ${profile?.zone || 'zone'}`,
    time: '10:32 AM',
  },
  {
    id: 3,
    icon: '✅',
    title: 'Claim Auto-Approved',
    desc: 'AI verification passed',
    time: '10:35 AM',
  },
  {
    id: 4,
    icon: '💰',
    title: 'Payout Processed',
    desc: `Sent to UPI · ${(profile?.name || "user").toLowerCase()}@ybl`,
    time: '10:40 AM',
    amount: `₹${profile?.earnings || 500} Paid`
  },
]

// Weather dynamic
export const weather = {
  city: profile?.city || 'City',
  rain: { value: '80mm', label: 'Rainfall', level: 'High', icon: '🌧️' },
}