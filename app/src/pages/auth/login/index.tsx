import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import LogoSVG from '../assets/logo.svg'
import { useLoginModel } from "./login.model"
import { ControllerTextInput } from "../../../components/form/form-input"
import { FormPasswordInput } from "../../../components/form/form-password-input"
import { Button } from "../../../components/button"
import { Text } from "../../../components/ui/Typography/Text"
import { styles } from "./login.style"

export function LoginScreen() {
  const { form, handleSignUp, handleSubmit, loading } = useLoginModel()

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
              label="E-mail"
              control={form.control}
              name="email"
              placeholder="Digite seu e-mail"
            />

            <FormPasswordInput
              label="Senha"
              control={form.control}
              name="password"
              placeholder="Digite sua senha"
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

