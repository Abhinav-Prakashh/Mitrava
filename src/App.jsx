import { Routes, Route, Navigate } from 'react-router-dom'

import Splash from './pages/Splash'
import LoginReturn from './pages/LoginReturn'
import Onboarding from './pages/Onboarding'
import OtpVerify from './pages/OtpVerify'
import PlanSelection from './pages/PlanSelection'
import Payment from './pages/Payment'
import Success from './pages/Success'

import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home'
import Coverage from './pages/Coverage'
import Claims from './pages/Claims'
import RiskMap from './pages/RiskMap'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<LoginReturn />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/otp" element={<OtpVerify />} />
      <Route path="/plan" element={<PlanSelection />} />
      <Route path="/success" element={<Success />} />

      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Navigate to="home" />} />
        <Route path="home" element={<Home />} />
        <Route path="coverage" element={<Coverage />} />
        <Route path="claims" element={<Claims />} />
        <Route path="riskmap" element={<RiskMap />} />
        <Route path="profile" element={<Profile />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="payment" element={<Payment />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
