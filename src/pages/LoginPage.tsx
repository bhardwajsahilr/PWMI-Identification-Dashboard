import React, { useState } from 'react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { LogIn, Eye, EyeOff } from 'lucide-react';
interface LoginPageProps {
  onLogin: () => void;
}
export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    setError('');
    onLogin();
  };
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://cdn.magicpatterns.com/uploads/bBx2s9PL78xkSLtLfeuDR6/Generated_Image_February_14,_2026_-_3_01PM.jpg')`
        }} />
      

      {/* Subtle overlay on left for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent" />

      {/* Login Content — positioned left */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-md ml-12 lg:ml-24">
          {/* Brand Header — Logo + Foundation name */}
          <div className="flex items-center gap-4 mb-8">
            <img
              src="/Untitled_design_(2).png"
              alt="TLLLF Logo"
              className="h-20 w-auto" />
            
            <span className="text-base font-bold text-neutral-text tracking-[0.1em] uppercase leading-tight">
              The Live Love Laugh
              <br />
              Foundation
            </span>
          </div>

          {/* Tagline — centered with form */}

          {/* Login Card */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/60 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-neutral-text">
                Welcome back
              </h2>
              <p className="text-sm text-neutral-secondary mt-1">
                Sign in to continue to the dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-neutral-text placeholder-gray-400 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all" />
                
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-neutral-text placeholder-gray-400 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all" />
                  
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-neutral-text transition-colors">
                    
                    {showPassword ?
                    <EyeOff className="h-4.5 w-4.5" /> :

                    <Eye className="h-4.5 w-4.5" />
                    }
                  </button>
                </div>
              </div>

              {error &&
              <div className="bg-coral/10 border border-coral/30 text-coral text-sm px-4 py-2.5 rounded-lg">
                  {error}
                </div>
              }

              <button
                type="submit"
                className="w-full bg-teal hover:bg-teal-dark text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                
                <LogIn className="h-4 w-4" />
                Sign In
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-gray-200/80">
              <p className="text-xs text-center text-gray-400">
                Contact your administrator if you need access
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-xs text-neutral-secondary/70 mt-6 text-center max-w-md">
            © 2026 The Live Love Laugh Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </div>);

}