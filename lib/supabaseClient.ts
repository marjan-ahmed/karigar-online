// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'
import { toast } from 'sonner'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const handleOAuthSignIn = async (provider: "google" | "facebook", redirectPath = "/boarding") => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}${redirectPath}`,
      },
    })

    if (error) throw error
  } catch (error: any) {
    toast.error(error.message || "OAuth sign-in failed.")
  }
}

export async function getAuthUserData() {
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error("Error fetching user data:", error.message)
    return null
  }

  const user = data.user
  if (!user) return null

  const name = user.user_metadata.full_name || user.user_metadata.name || ''
  const email = user.email || ''

  return {
    id: user.id,
    name,
    email,
  }
} 

export const supabase = createClient(supabaseUrl, supabaseAnonKey)