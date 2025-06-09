'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'

export default function BoardingSteps() {
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  // Step state: 0 = choose role, 1 = choose service (if needed)
  const [step, setStep] = useState(0)
  const [role, setRole] = useState('')
  const [serviceType, setServiceType] = useState('')

  // On mount, get user session info
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) return

      setUserId(session.user.id)
      setEmail(session.user.email ?? '')
      setName(session.user.user_metadata?.full_name ?? '')
    }
    fetchUser()
  }, [])

  const handleNext = async () => {
    if (step === 0) {
      if (!role) return alert('Please select a role')

      if (role === 'User') {
        // Insert user as Passenger and redirect
        await supabase.from('users').upsert({
          id: userId,
          name,
          email,
          role: 'User',
          created_at: new Date(),
        })
        router.push('/dashboard')
      } else if (role === 'Service Provider') {
        setStep(1) // go to service type selection
      }
    } else if (step === 1) {
      if (!serviceType) return alert('Please select a service type')

      // Insert service provider with service type and redirect
      await supabase.from('users').upsert({
        id: userId,
        name,
        email,
        role: 'Service Provider',
        service_type: serviceType,
        created_at: new Date(),
      })
      router.push('/service-provider')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        {step === 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Select your role</h2>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-6"
            >
              <option value="">-- Select Role --</option>
              <option value="User">User</option>
              <option value="Service Provider">Service Provider</option>
            </select>
            <Button onClick={handleNext} className="w-full">
              Continue
            </Button>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Select your service</h2>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-6"
            >
              <option value="">-- Select Service Type --</option>
              <option value="Plumber">Plumber</option>
              <option value="Electrician">Electrician</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Painter">Painter</option>
              <option value="Cleaner">Cleaner</option>
              {/* Add more options as needed */}
            </select>
            <Button onClick={handleNext} className="w-full">
              Finish
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
