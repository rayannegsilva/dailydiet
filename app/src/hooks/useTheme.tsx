// dark, default and light theme.

import { ReactNode, createContext, useContext, useEffect } from "react";
import { useAsyncStorage } from "./useAsyncStorage";

interface ThemeContextProps {

}

const ThemeContext = createContext({} as ThemeContextProps)


interface ThemeProviderProps {
  children: ReactNode
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, useTheme] = useAsyncStorage('@dailydiet:theme', null)

  useEffect(() => {
    
  }, [])

  return(
    <ThemeContext.Provider
      value={{}}>
      { children }
  </ThemeContext.Provider>
  )
}

function useTheme() {
  const themeContext = useContext(ThemeContext)

  return themeContext
}

export { useTheme, ThemeProvider}