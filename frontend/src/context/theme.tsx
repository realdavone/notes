import { createContext, useEffect, useState } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

const INITIAL_THEME: ThemeContext = { 
  darkTheme: false,
  toggleTheme: () => {}
}

interface ThemeContext {
  darkTheme: boolean,
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContext>(INITIAL_THEME)

export const ThemeContextProvider = ({ children }: any) => {
  const [savedDarkTheme, setSavedTheme] = useLocalStorage<boolean>('darkTheme', false)

  const [darkTheme, setDarkTheme] = useState<boolean>(savedDarkTheme)

  document.body.setAttribute('data-dark-theme', darkTheme.toString())

  const toggleTheme = () => {
    setDarkTheme(!darkTheme)
  }

  useEffect(() => {
    setSavedTheme(darkTheme)
    document.body.setAttribute('data-dark-theme', darkTheme.toString())
  }, [darkTheme])

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}