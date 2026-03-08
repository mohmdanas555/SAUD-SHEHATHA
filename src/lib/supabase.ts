import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pqjkqlodpgdvlrreyrkx.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxamtxbG9kcGdkdmxycmV5cmt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMDE2MzksImV4cCI6MjA4ODU3NzYzOX0.fgwPG2ftvjoM-Qx6Yn-jH2XSt93cjLghyPaxKjhbfa4'

export const supabase = createClient(supabaseUrl, supabaseKey)
