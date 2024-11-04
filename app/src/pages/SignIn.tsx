import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TouchableWithoutFeedback, View, Alert} from "react-native"
import LogoSVG from '../assets/logo.svg'
import { theme } from "../global/theme"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod';
import { Button, FormTextInput, FormPasswordInput } from "../components"
import { useAuth } from "../hooks/auth"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { Text } from "../components/ui/Typography/Text"


export function SignIn() {
  const { signIn, user } = useAuth()
  const navigation = useNavigation()

  const [loading, isLoading] = useState(false)

  const signUpSchema = z.object({
    email: z.string({ required_error: 'Email é obrigatório'}).email('Email é inválido'),
    password: z.string({ required_error: 'Senha é obrigatória' })
  })

  type SignInData = z.infer<typeof signUpSchema>

  const {control, formState, handleSubmit, reset } = useForm<SignInData>({
    resolver: zodResolver(signUpSchema)
  })


  const onSubmit =  async (data: SignInData) => {
    try {
        isLoading(true) 
        await signIn(data.email, data.password)
    } catch (error) {
      isLoading(false)
      Alert.alert("Erro", "Usuário ou senha incorretos. Tente novamente.")
      reset()
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
            <FormTextInput 
              control={control}
              name="email"
              label="E-mail"
              // placeholder="Digite seu e-mail"
            />

            <FormPasswordInput
              control={control}
              name="password"
              label="Senha"
              // placeholder="Digite sua senha"
            />

            <Button
              title="Entrar"
              onPress={handleSubmit(onSubmit)}
              disabled={!formState.isValid}
              loading={loading}
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
    gap: 10,
    width: '100%',
    
  }
})