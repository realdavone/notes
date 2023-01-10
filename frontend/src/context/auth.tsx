import { createContext, useState } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

export type User = { _id: string, email: string }

interface AuthContextType {
  user: User | null,
  setUser: (user: User) => void
  login: (email: string, password: string) => any
  logout: (cb?: Function) => void
}

const INITIAL_CONTEXT: AuthContextType = {
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {}
}

export const AuthContext = createContext<AuthContextType>(INITIAL_CONTEXT)

export const AuthContextProvider = ({ children }: any) => {
  const [savedUser, setSavedUser] = useLocalStorage<User | null>('user', null)

  const [user, setUser] = useState<User | null>(savedUser)

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const res = await fetch(`${import.meta.env['VITE_API_BASE_URL']}auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await res.json()

      if(!data.success) throw(data.message)

      setUser(data.user)
      setSavedUser(data.user)
    } catch (error: any) {
      throw(error)
    }
  }

  const logout = (cb?: Function) => {
    fetch(`${import.meta.env['VITE_API_BASE_URL']}auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    .then(res => {
      if(res.ok) return res.json()
      throw('Nastala chyba')
    })
    .then(data => {
      setUser(null)
      setSavedUser(null)
      cb?.()
    })
    .catch(error => console.log(error))
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}