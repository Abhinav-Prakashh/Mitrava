// Mock worker profile
export const worker = {
  name: 'Ravi Kumar',
  city: 'Bangalore',
  zone: 'Koramangala',
  platforms: ['Zomato', 'Swiggy'],
  avgDailyEarnings: 700,
  plan: 'Standard',
  weeklyPremium: 49,
  coveragePerDay: 500,
  weeksActive: 8,
  totalProtected: 2400,
  claimsPaid: 6,
}

// Mock plans
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

// Mock today's risk data
export const todaysRisk = [
  { id: 1, name: 'Heavy Rain', sub: '80mm/hr · Koramangala', level: 'High', icon: '🌧️', color: 'red' },
  { id: 2, name: 'AQI 180',    sub: 'Moderate · Bangalore',  level: 'Moderate', icon: '🌫️', color: 'yellow' },
  { id: 3, name: 'Temperature 32°C', sub: 'Within safe range', level: 'Safe', icon: '🌡️', color: 'green' },
]

// Mock claim timeline
export const claimTimeline = [
  { id: 1, icon: '🌧️', title: 'Rain Threshold Breached', desc: '80mm/hr detected · Exceeds trigger of 35mm/hr', time: '10:30 AM', status: 'blue' },
  { id: 2, icon: '📍', title: 'Location Verified', desc: 'Worker confirmed in disruption zone · GPS match successful', time: '10:32 AM', status: 'blue' },
  { id: 3, icon: '✅', title: 'Claim Auto-Approved', desc: 'No fraud detected · AI verification passed · Zero manual filing', time: '10:35 AM', status: 'green' },
  { id: 4, icon: '💰', title: 'Payout Processed', desc: 'Sent to UPI · Ravi@ybl', time: '10:40 AM', status: 'green', amount: '₹500 Paid' },
]

// Mock weather
export const weather = {
  city: 'Bangalore',
  rain: { value: '80mm', label: 'Rainfall', level: 'High', icon: '🌧️' },
  temp: { value: '32°C', label: 'Temperature', level: 'Safe', icon: '🌡️' },
  aqi:  { value: 'AQI 180', label: 'Air Quality', level: 'Moderate', icon: '🌫️' },
}
