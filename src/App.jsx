import { Routes, Route, Navigate } from 'react-router-dom'
import Splash from './pages/Splash'
import Onboarding from './pages/Onboarding'
import PlanSelection from './pages/PlanSelection'
import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home'
import Coverage from './pages/Coverage'
import Claims from './pages/Claims'
import RiskMap from './pages/RiskMap'
import Profile from './pages/Profile'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/plan" element={<PlanSelection />} />
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="coverage" element={<Coverage />} />
        <Route path="claims" element={<Claims />} />
        <Route path="riskmap" element={<RiskMap />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
