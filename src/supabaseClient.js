import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wccqufviaiwhzabzubln.supabase.co'
const supabaseKey = 'sb_publishable_Am7uA0d1R3YnNrKnBpYEDg_2WOULNDa'

export const supabase = createClient(supabaseUrl, supabaseKey)
