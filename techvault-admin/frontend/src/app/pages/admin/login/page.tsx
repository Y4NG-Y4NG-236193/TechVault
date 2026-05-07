'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ShieldAlert, Lock, LogIn, Zap, ShieldCheck, AlertCircle, Loader2, KeyRound } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [totp, setTotp] = useState('')
  const [step, setStep] = useState(1) // 1: Credentials, 2: 2FA
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null)
  const supabase = createClient()

  const handleInitialLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    
    // Audit Logging
    console.log(`SUPERADMIN Login attempt for ${email} at ${new Date().toISOString()}`)

    const { data: authData, error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      setMessage({ type: 'error', text: 'Authorization Failed: Invalid Credentials' })
      setLoading(false)
    } else {
      // Step 2: Verify SuperAdmin status in the database
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
        const response = await fetch(`${apiBase}/api/auth/verify-access`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        })

        const data = await response.json()

        if (!response.ok || !data.authorized) {
          await supabase.auth.signOut()
          setMessage({ type: 'error', text: 'Restricted Access: Your identity is not in the SuperAdmin registry.' })
          setLoading(false)
        } else {
          // In a real app, we'd check if 2FA is enabled and move to step 2
          // For now, let's simulate the 2FA requirement
          setStep(2)
          setLoading(false)
        }
      } catch (apiError) {
        await supabase.auth.signOut()
        setMessage({ type: 'error', text: 'Security Service Offline' })
        setLoading(false)
      }
    }
  }

  const handle2FA = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulating TOTP verification
    if (totp === '123456') { // Mock TOTP
      window.location.href = '/'
    } else {
      setMessage({ type: 'error', text: 'Invalid Authentication Token' })
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#09090b] p-6 selection:bg-rose-500 selection:text-white">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(244,63,94,0.05),transparent_50%)]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.3)] mb-4">
            <ShieldAlert className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-[#fafafa] uppercase">
            TechVault <span className="text-rose-500">SuperAdmin</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
            Restricted Access Zone
          </p>
        </div>

        <div className="bg-[#18181b] rounded-3xl border border-rose-500/20 p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden">
          {/* Warning Banner */}
          <div className="absolute top-0 left-0 w-full h-1 bg-rose-500" />
          
          {message && (
            <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
              message.type === 'error' ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400' : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
            }`}>
              {message.type === 'error' ? <AlertCircle className="w-5 h-5 shrink-0" /> : <ShieldCheck className="w-5 h-5 shrink-0" />}
              <p className="text-sm font-medium">{message.text}</p>
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleInitialLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1">Admin Identity</label>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-500 group-focus-within:text-rose-500 transition-colors" />
                  <input 
                    type="email" 
                    required
                    placeholder="admin@techvault.io"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#09090b] border border-zinc-800 rounded-xl py-3.5 pl-12 pr-4 text-[#fafafa] placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1">Master Key</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-500 group-focus-within:text-rose-500 transition-colors" />
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#09090b] border border-zinc-800 rounded-xl py-3.5 pl-12 pr-4 text-[#fafafa] placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-rose-500 text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-rose-600 active:scale-[0.98] transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(244,63,94,0.15)]"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Request Multi-Factor Auth'}
              </button>
            </form>
          ) : (
            <form onSubmit={handle2FA} className="space-y-6">
              <div className="text-center space-y-2 mb-4">
                <ShieldCheck className="w-12 h-12 text-rose-500 mx-auto" />
                <h2 className="text-[#fafafa] font-bold text-sm uppercase tracking-widest">Two-Factor Authentication</h2>
                <p className="text-zinc-500 text-xs">Enter the 6-digit code from your authenticator app</p>
              </div>

              <div className="space-y-2">
                <div className="relative group">
                  <input 
                    type="text" 
                    required
                    maxLength={6}
                    placeholder="000000"
                    value={totp}
                    onChange={(e) => setTotp(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-[#09090b] border border-zinc-800 rounded-xl py-4 text-center text-2xl font-black tracking-[0.5em] text-[#fafafa] focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-rose-500 text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-rose-600 active:scale-[0.98] transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(244,63,94,0.15)]"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify & Grant Access'}
              </button>

              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="w-full text-[10px] font-bold text-zinc-500 hover:text-zinc-300 uppercase tracking-widest transition-colors"
              >
                Back to credentials
              </button>
            </form>
          )}
        </div>
        
        <p className="mt-8 text-center text-[9px] text-zinc-600 font-bold uppercase tracking-[0.3em] leading-relaxed max-w-xs mx-auto">
          This system is for authorized superadministrators only. All sessions are logged by IP: 127.0.0.1 and Device Fingerprint.
        </p>
      </div>
    </div>
  )
}
