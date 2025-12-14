'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'

export default function PreviewLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    try {
      const response = await fetch('/api/preview-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        // Successful login - redirect to home
        router.push('/')
        router.refresh()
      } else {
        setError(true)
        setLoading(false)
      }
    } catch (err) {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#E8C24A] rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-black" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          BeeHive Preview Access
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Enter the password to view the client preview
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E8C24A] focus:border-transparent transition-all"
              disabled={loading}
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
              Incorrect password. Please try again.
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-[#E8C24A] text-black py-3 rounded-lg font-semibold hover:bg-[#d4af3a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Access Preview'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-gray-500 text-xs text-center">
            BeeHive Rental & Sales LLC - Client Preview Portal
          </p>
        </div>
      </div>
    </div>
  )
}
