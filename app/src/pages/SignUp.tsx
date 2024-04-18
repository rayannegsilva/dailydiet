import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { theme } from "../global/theme"

import { AntDesign, } from '@expo/vector-icons'

import { useNavigation } from "@react-navigation/native"
import { Text } from "../components/ui/Typography/Text"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { RectButton, ScrollView } from "react-native-gesture-handler"
import { ControllerTextInput } from "../components/form/controller-input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../components/button"

import { z } from 'zod';
import { useAuth } from "../hooks/auth"
import { useState } from "react"

export function SignUp() {
  const navigation = useNavigation()
  const { top, bottom } = useSafeAreaInsets();

  const { signUp } = useAuth()

  const [loading, isLoading] = useState(false)

  const signUpSchema = z.object({
    email:  z.string({ required_error: 'Email é obrigatório'}).email('Email é inválido'),
    name: z.string({ required_error: 'Informe um nome.'}),
    password: z.string({ required_error: 'Senha é obrigatória'}),
    confirmedPassword: z.string({ required_error: 'É obrigatório a senha de confirmação.'})
  }).superRefine((data, ctx) => {
    if(data.confirmedPassword && !data.password) {
     ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'É necessário informar uma senha.',
      path: ['password']
     })
    }

    if(data.confirmedPassword !== data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'As senhas não batem',
        path: ['confirmdPassword']
      })
    }
  })

  type SignUpData = z.infer<typeof signUpSchema>

  const form = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema)
  })

  
 const handleSignUp = async (data: SignUpData) => {
    try {
      isLoading(true)

      const email = data.email
      const password = data.password
      const name = data.name

      await signUp({ email, password, name })
    } catch (error) {
      console.log(error)
    }
 }
  
  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
   
    <KeyboardAvoidingView 
      style={{ flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height' }

    >
       <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
       >
        <View style={[styles.container, { paddingTop: top + 12 }]}>
          <View style={styles.header}>
            <RectButton style={{ width: 24 }} onPress={handleGoBack}>
             <AntDesign name="arrowleft" size={24} color={theme.colors.gray[200]}/>
            </RectButton>
            <Text weight="bold" size={"3xl"}>Cadastre uma{' '}</Text>
            <Text  weight="bold" size={"3xl"} color="green.dark">Conta </Text>
          </View>
          <View style={styles.content}>
            <ControllerTextInput 
                label="Email"
                control={form.control}
                name="email"
              />

              <ControllerTextInput 
                  label="Nome"
                  control={form.control}
                  name="name"
                />

              <ControllerTextInput 
                  label="Senha"
                  control={form.control}
                  name="password"
                  secureTextEntry
                />
              <ControllerTextInput 
                  label="Confirme sua senha"
                  control={form.control}
                  name="confirmedPassword"
                  secureTextEntry
                />
                <View style={{ marginBottom: bottom + 12 }}>
                  <Button 
                    title="Cadastrar"
                    onPress={() => form.handleSubmit(handleSignUp)()}
                    enabled={form.formState.isValid || loading}
                    isLoading={loading}
                  />
          </View>
           </View>
        </View>    
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: theme.colors.white,
    justifyContent: 'center'

  },
  header: {
    marginBottom: 20,
  },
  content: {
    gap: 12,
    width: '100%',
    
  }
})