import { createContext, useContext } from 'react'
import { useTheme } from '../hooks/useTheme'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const theme = useTheme()
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export function useThemeCtx() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useThemeCtx must be used inside ThemeProvider')
  return ctx
}
