import { Pressable, StyleSheet, View } from "react-native";
import { AntDesign, Feather } from '@expo/vector-icons'
import { theme } from "../global/theme";
import { Button, FormTextInput, Avatar } from "../components";
import { useAuth } from "../hooks/auth";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { Text } from "../components/ui/Typography/Text";
import { z } from 'zod';;
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function PasswordChangePage() {
  const { signOut, user, updatedUser } = useAuth()
  const { top, bottom } = useSafeAreaInsets();

  const navigation = useNavigation()


  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleToSignOut = async () => {
    await signOut()
  }

  const confirmPasswordSchema = z.string({
    required_error: 'Confirmação de senha é obrigatória',
  });

  const updatedUserSchema = z.object({
    email: z.string({ required_error: 'Email é obrigatório'}).email('Email é inválido'),
    currentPassword: z.string({ required_error: 'Senha é obrigatória'}),
    newPassword: z.string().optional(),
    confirmedPassword: z.string().optional(),
  }).superRefine((data, ctx) => {
    if(data.newPassword && !data.currentPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'É necessário informar a senha atual.',
        path: ['oldPassword']
      })
    }

    if(data.newPassword !== data.confirmedPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'A senha de confirmação não bate com a nova senha.',
        path: ['confirmedPassword']
      })
    }
  });

  type UpdatedUserData = z.infer<typeof updatedUserSchema>

  const form = useForm<UpdatedUserData>({
    resolver: zodResolver(updatedUserSchema),
    defaultValues: {
      email: user.email
    }
  
  })

  const handleSubmit = async (data: UpdatedUserData) => {
    try {
      const newPassword = data.newPassword
      const currentPassword = data.currentPassword
      const email = data.email

      await updatedUser({ currentPassword, newPassword, email })
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <View style={[styles.container, { paddingTop: top + 12 }]}>
      <View style={styles.header}>
        <RectButton style={styles.goBackButton} onPress={handleGoBack}>
          <AntDesign name="arrowleft" size={24} color={theme.colors.gray[200]}/>
        </RectButton>
        <Text size="lg" weight="bold">Perfil do Usuário</Text>

        <RectButton style={styles.signout} onPress={handleToSignOut}>
          <Feather name="log-out" size={24} color={theme.colors.gray[200]}/>
        </RectButton>
      </View>
      <View style={[styles.content, { paddingBottom: bottom + 12 }]}>
        <View style={{ alignItems: 'center', width: '100%', position: 'relative'}}>
          <Pressable style={styles.button}>
            <AntDesign name="camerao" size={24} color={theme.colors.white}/>
          </Pressable>
          <Avatar 
            size={180}
            url=""
          />
        </View>

        <View style={{ gap: 8 }}>
          <FormTextInput 
            label="E-mail"
            name="email"
            editable={false}
            control={form.control}
          />
          <FormTextInput 
            label="Senha"
            name="currentPassword"
            control={form.control}
          />
          <FormTextInput 
            label="Nova senha"
            name="newPassword"
            control={form.control}
          />
           <FormTextInput 
            label="Nova senha"
            name="confirmedPassword"
            control={form.control}
          />
        </View>

        <View style={{ marginTop: 'auto', gap: 8 }}>
          <Button
            title="Alterar senha"
            onPress={() => form.handleSubmit(handleSubmit)()}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[500],
  },
  content: {
    backgroundColor: theme.colors.white,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 24,
  },
  goBackButton: {
    position: 'absolute',
    left: 16,
    top: -8,
    padding: 8,
    borderRadius: 6,
  },
  button: {
    zIndex: 5,
    position: 'absolute',
    bottom: 0,
    right: 90,
    backgroundColor: theme.colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    borderRadius: 5,
  },
  signout: {
    position: 'absolute',
    right: 16,
    top: -8,
    padding: 8,
    borderRadius: 6,
  }
})