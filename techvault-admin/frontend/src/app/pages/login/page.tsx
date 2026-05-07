'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Mail, Lock, LogIn, UserPlus, Zap, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const supabase = createClient()

  // Password strength calculation (simple example for UI feedback)
  useEffect(() => {
    let strength = 0
    if (password.length > 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    setPasswordStrength(strength)
  }, [password])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    // Audit Logging: Log attempt (in a real app, this would be a backend call)
    console.log(`Login attempt for ${email} at ${new Date().toISOString()}`)

    const { data: authData, error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      setMessage({ type: 'error', text: error.message })
      setLoading(false)
      return
    }

    // Step 2: Verify if the user is in the 'superadmins' table
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
      const response = await fetch(`${apiBase}/api/auth/verify-access`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok || !data.authorized) {
        // If not authorized, sign them out immediately
        await supabase.auth.signOut()
        setMessage({ 
          type: 'error', 
          text: data.message || 'Access Denied: You are not authorized to access the Admin Panel.' 
        })
      } else {
        // Authorized!
        window.location.href = '/'
      }
    } catch (apiError) {
      console.error('API Error:', apiError)
      // Fallback or error handling
      setMessage({ type: 'error', text: 'Authorization service unavailable. Please try again later.' })
      await supabase.auth.signOut()
    }

    setLoading(false)
  }

  const handleSignUp = async () => {
    if (passwordStrength < 3) {
      setMessage({ type: 'error', text: 'Password must be stronger (include uppercase, numbers, and symbols).' })
      return
    }

    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ type: 'success', text: 'Check your email for the confirmation link!' })
    }
    setLoading(false)
  }

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#09090b] p-6 selection:bg-[#bef264] selection:text-black">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#bef264]/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#bef264]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#bef264] text-black shadow-[0_0_20px_rgba(190,242,100,0.3)] mb-4">
            <Zap className="h-7 w-7 fill-current" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-[#fafafa] uppercase">
            TechVault <span className="text-[#bef264]">Admin</span>
          </h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mt-2">
            Secure Infrastructure Access
          </p>
        </div>

        <div className="bg-[#18181b] rounded-3xl border border-zinc-800/50 p-8 shadow-2xl backdrop-blur-sm">
          {message && (
            <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${message.type === 'error' ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400' : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
              }`}>
              {message.type === 'error' ? <AlertCircle className="w-5 h-5 shrink-0" /> : <ShieldCheck className="w-5 h-5 shrink-0" />}
              <p className="text-sm font-medium">{message.text}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1">Identity</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-500 group-focus-within:text-[#bef264] transition-colors" />
                <input
                  type="email"
                  required
                  placeholder="name@techvault.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-xl py-3.5 pl-12 pr-4 text-[#fafafa] placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#bef264] focus:border-[#bef264] transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end ml-1">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Secret Key</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[10px] font-bold text-zinc-500 hover:text-[#fafafa] uppercase tracking-wider transition-colors"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-500 group-focus-within:text-[#bef264] transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-xl py-3.5 pl-12 pr-4 text-[#fafafa] placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#bef264] focus:border-[#bef264] transition-all"
                />
              </div>

              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <div className="flex gap-1 mt-2 px-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-500 ${i < passwordStrength
                          ? (passwordStrength <= 2 ? 'bg-rose-500' : passwordStrength === 3 ? 'bg-amber-500' : 'bg-[#bef264]')
                          : 'bg-zinc-800'
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="group relative flex items-center justify-center gap-2 bg-[#bef264] text-black py-3.5 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_20px_rgba(190,242,100,0.15)] hover:shadow-[0_0_25px_rgba(190,242,100,0.25)]"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Authorize Access
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-3 mt-2">
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleSignUp}
                  className="flex items-center justify-center gap-2 bg-transparent text-zinc-400 border border-zinc-800 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-900 hover:text-[#fafafa] transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Request Account
                </button>
                <button
                  onClick={signInWithGoogle}
                  disabled={loading}
                  type="button"
                  className="flex items-center justify-center gap-2 bg-transparent text-zinc-400 border border-zinc-800 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-900 hover:text-[#fafafa] transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  SSO Auth
                </button>
              </div>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-800/50 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 opacity-40">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400">Secure Protocol v4.0.2</span>
            </div>
            <Link
              href="/pages/admin/login"
              className="text-[10px] font-bold text-rose-500/60 hover:text-rose-500 uppercase tracking-widest transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3 h-3" />
              Restricted Admin Portal
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">
          Unauthorized access is strictly prohibited and monitored.
        </p>
      </div>
    </div>
  )
}