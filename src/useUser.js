import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

export function useUser() {
  const [user, setUser] = useState(null)
  const [policy, setPolicy] = useState(null)
  const [claims, setClaims] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = localStorage.getItem('mitrava_user_id')
    if (!userId) { setLoading(false); return }

    async function fetchData() {
      const [
        { data: userData },
        { data: policyData },
        { data: claimsData },
      ] = await Promise.all([
        supabase.from('users').select('*').eq('id', userId).single(),
        supabase.from('policies').select('*').eq('user_id', userId).eq('is_active', true).single(),
        supabase.from('claims').select('*').eq('user_id', userId).order('triggered_at', { ascending: false }),
      ])

      setUser(userData)
      setPolicy(policyData)
      setClaims(claimsData || [])
      setLoading(false)
    }

    fetchData()
  }, [])

  return { user, policy, claims, loading }
}

// ── Auth helpers ─────────────────────────────────────────

// Check if a phone number is registered
export async function checkUserByPhone(phone) {
  const formatted = phone.startsWith('+91') ? phone : `+91${phone}`
  const { data, error } = await supabase
    .from('users')
    .select('id, full_name, phone, city, delivery_zone')
    .eq('phone', formatted)
    .single()
  return { user: data, error }
}

// Register a new user
export async function registerUser(profile) {
  const formatted = profile.phone.startsWith('+91') ? profile.phone : `+91${profile.phone}`
  const { data, error } = await supabase
    .from('users')
    .insert({
      full_name: profile.name,
      phone: formatted,
      city: profile.city,
      delivery_zone: profile.zone,
    })
    .select()
    .single()
  return { user: data, error }
}

// Save policy for a user
export async function savePolicy(userId, plan) {
  const { data, error } = await supabase
    .from('policies')
    .insert({
      user_id: userId,
      plan_name: plan.plan,
      weekly_premium: plan.amount,
      max_daily_payout: plan.payout,
      is_active: true,
    })
    .select()
    .single()
  return { policy: data, error }
}
