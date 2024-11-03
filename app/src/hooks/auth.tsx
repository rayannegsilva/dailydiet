import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import { useAsyncStorage } from "./useAsyncStorage";

type User = {
  id: string
  name: string
  email: string
  profile?: string 
}

type UpdatedUser = {
  currentPassword: string
  newPassword: string
  email: string
}

type SignUp = {
  name: string
  password: string
  email: string
}

interface AuthContextProps {
  token: string | null
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () =>  Promise<void>
  signUp: ({ email , password, name }: SignUp) => Promise<void>
  updatedUser: ({ currentPassword, newPassword, email }: UpdatedUser) => Promise<void>
  
}

const AuthContext = createContext({} as AuthContextProps)

interface AuthProviderProps {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useAsyncStorage<string | null>("@dailyDiet:token", null)
  const [loading, setLoading] = useState(true)

  api.defaults.headers.authorization = `Bearer ${token}`

  async function getUser () {
    try {
      const response = await api.get('/api/user')

      setUser({
        id: response.data.id,
        email: response.data.email,
        name: response.data.name,
        profile: response.data.profile_photo
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
   if(!user && token) {
      getUser()
   }
  }, [token, user])

  const context = useMemo<AuthContextProps>(() => {
    return {
      signIn: async (email: string, password: string) => {
        try {
          const response =  await api.post('/api/sign-in', { email, password });
          
          setUser({
            id: response.data.user.id,
            email: response.data.user.email,
            name: response.data.user.name,
            profile: response.data.user.profile
          })

          setToken(response.data.token)

        } catch (error) {
          console.log(error)
        }
      },
      signOut: async () => {
        try {
         setToken(null)
        } catch (error) {
          console.log(error)
        }
      },
      updatedUser: async ({ currentPassword, newPassword, email }: UpdatedUser) => {
        try {
          const response = await api.put('/api/user', {currentPassword, newPassword, email})

        } catch (error) {
          console.log(error)
        }
      },
      signUp: async ({ email, password, name }: SignUp) => {
        try {
          const response = await api.post('/api/sign-up', {
            email, password, name
          })

          setUser({
            id: response.data.user.id,
            email: response.data.user.email,
            name: response.data.user.name,
            profile: response.data.user.profile
          })

          setToken(response.data.token)

        } catch (error) {
          console.log(error)
        }
      },
      token,
      user
    };
  }, [setToken, user, token])

  return (
    <AuthContext.Provider
      value={
       context
      }
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