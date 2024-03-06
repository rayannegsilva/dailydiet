import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import axios from "axios";

type User = {
  id: string
  name: string
  email: string
  profile?: string 
  token: string
}

interface AuthContextProps {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () =>  Promise<void>
}

const AuthContext = createContext({} as AuthContextProps)

interface AuthProviderProps {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  
  async function storageUser(data: User) {
    await AsyncStorage.setItem("@dailydiet:token", JSON.stringify(data))
  }

  async function loadStorage() {
    const storageUser = await AsyncStorage.getItem("@dailydiet:token");

    if(storageUser) {
      setUser(JSON.parse(storageUser))
      setLoading(false)
    }

    setLoading(false)
  }

  async function signOut() {
    await AsyncStorage.clear().then(
      () => setUser(null)
    )
  }

  async function signIn(email: string, password: string) {
      try { 
        const response = await api.post('/api/sign-in', {
        email, password
      }) 

      const user = response.data

      let data = {
        id: user.id,
        email: user.email,
        token: user.token,
        name: user.name
      }

      storageUser(data)
      setUser(data)

      api.defaults.headers.authorization = `Bearer ${user.token}`
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadStorage()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signIn, user, signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextProps {
  const context = useContext(AuthContext)
  
  return context
}

export { AuthProvider, useAuth}