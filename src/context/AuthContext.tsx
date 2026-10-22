import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { AUTH_KEY } from '../storage'

type AuthContextValue = {
  isLoggedIn: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => window.localStorage.getItem(AUTH_KEY) === '1')

  const value = useMemo<AuthContextValue>(() => ({
    isLoggedIn,
    login(username, password) {
      if (username.trim() !== 'admin' || password !== '123456') return false
      window.localStorage.setItem(AUTH_KEY, '1')
      setIsLoggedIn(true)
      return true
    },
    logout() {
      window.localStorage.removeItem(AUTH_KEY)
      setIsLoggedIn(false)
    },
  }), [isLoggedIn])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth phải được gọi bên trong AuthProvider')
  return context
}
