import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../../../hooks/auth"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginData } from "./login.schema"

export const useLoginModel = () => {
  const { signIn } = useAuth()
  const navigation = useNavigation()

  const [loading, isLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(loginSchema)
  })

  const handleSubmit = async (data: LoginData) => {
    try {
      isLoading(true)
      const email = data.email
      const password = data.password
      await signIn(email, password)
    } catch (error) {
      isLoading(false)
      console.log(error)
    } finally {
      isLoading(false)
    }
  }

  const handleSignUp = () => {
    navigation.navigate('SignUp')
  }
  return {
    handleSignUp,
    loading,
    form,
    handleSubmit
  }
}