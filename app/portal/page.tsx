'use client'

import { useState, FormEvent } from 'react'

export default function PortalPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const CORRECT_PASSWORD = 'beehive2026'
  const REDIRECT_URL = 'https://beehive-2026.vercel.app'

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(false)

    if (password === CORRECT_PASSWORD) {
      setLoading(true)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('haestus_auth', 'true')
        setTimeout(() => {
          window.location.href = REDIRECT_URL
        }, 800)
      }
    } else {
      setError(true)
      setPassword('')
    }
  }

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      margin: 0,
    }}>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>

      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '48px',
        maxWidth: '480px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '32px',
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #E8C24A 0%, #d4af3a 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(232, 194, 74, 0.3)',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '40px', height: '40px', color: '#000' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>

        <h1 style={{
          color: '#fff',
          fontSize: '28px',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '12px',
          letterSpacing: '-0.5px',
        }}>Client Portal</h1>

        <p style={{
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          fontSize: '15px',
          lineHeight: 1.6,
          marginBottom: '32px',
        }}>
          Enter your access code to view the BeeHive Rental & Sales preview.
        </p>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#fca5a5',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              marginBottom: '20px',
              animation: 'shake 0.5s',
            }}>
              Incorrect password. Please try again.
            </div>
          )}

          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="password" style={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '8px',
            }}>Access Code</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              placeholder="Enter your access code"
              autoComplete="off"
              required
              autoFocus
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #E8C24A 0%, #d4af3a 100%)',
              color: '#000',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(232, 194, 74, 0.3)',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Redirecting...' : 'Access Preview'}
          </button>
        </form>

        <div style={{
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center',
        }}>
          <p style={{
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '13px',
          }}>
            Powered by <a href="https://haestus.dev" target="_blank" rel="noopener noreferrer" style={{
              color: '#E8C24A',
              textDecoration: 'none',
              transition: 'color 0.3s',
            }}>Haestus</a>
          </p>
        </div>
      </div>
    </div>
  )
}
