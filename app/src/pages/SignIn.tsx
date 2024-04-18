import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import LogoSVG from '../assets/logo.svg'
import { theme } from "../global/theme"
import { ControllerTextInput } from "../components/form/controller-input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod';
import { Button } from "../components/button"
import { useAuth } from "../hooks/auth"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { Text } from "../components/ui/Typography/Text"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export function SignIn() {
  const { signIn, user } = useAuth()
  const navigation = useNavigation()

  const [loading, isLoading] = useState(false)

  const signUpSchema = z.object({
    email: z.string({ required_error: 'Email é obrigatório'}).email('Email é inválido'),
    password: z.string({ required_error: 'Senha é obrigatória'})
  })

  type SignInData = z.infer<typeof signUpSchema>

  const form = useForm({
    resolver: zodResolver(signUpSchema)
  })

  const handleSubmit = async (data: SignInData) => {
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

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
    >
       <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
       >
        <View style={styles.container}>
          <LogoSVG 
            width={200}
            height={60}
          />
          <View style={styles.content}>
            <ControllerTextInput 
              label="Email"
              control={form.control}
              name="email"
            />

            <ControllerTextInput
              label="Senha"
              secureTextEntry
              control={form.control}
              name="password"
            />

            <Button
              title="Entrar"
              onPress={() => form.handleSubmit(handleSubmit)()}
              enabled={form.formState.isValid || loading}
              isLoading={loading}
            />

            <View style={{ alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{textAlign: 'center'}}>
                Não é cadastrado?{' '}
                Cadastra-se rapidamente{' '}
                <Pressable style={{ alignItems: 'center', justifyContent: 'center'}} onPress={handleSignUp}>
                 <Text weight="bold" color="green.dark">clicando aqui!</Text>
                </Pressable>
              </Text>
            </View>         
          </View>
        </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 60,
    paddingHorizontal: 24,
  },
  content: {
    gap: 24,
    width: '100%',
    
  }
})