'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user) {
        console.log('User data:', session.user)
        setUser(session.user)
      }
    }
    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  return (
    <nav className="p-4 flex justify-between items-center shadow-md bg-white z-10">
      <h1 className="text-xl font-bold">Karigar Online</h1>
      <div className="flex gap-4 items-center relative">
        <button className="text-2xl">🔔</button>

        {user ? (
          <div
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <img
              src={user.user_metadata?.avatar_url || '/default-avatar.png'}
              alt="Profile Picture"
              className="w-10 h-10 rounded-full object-cover cursor-pointer border border-gray-300"
            />
            {showTooltip && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white text-sm rounded shadow-lg p-2 z-20">
                <p className="font-semibold">{user.user_metadata?.full_name || 'No Name'}</p>
                <p className="truncate">{user.email}</p>
              </div>
            )}
          </div>
        ) : (
          <button className="text-2xl">👤</button>
        )}
      </div>
    </nav>
  )
}
