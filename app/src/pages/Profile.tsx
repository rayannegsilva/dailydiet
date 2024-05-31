import { StyleSheet, View } from "react-native";
import { Text } from "../components/ui/Typography/Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../global/theme";
import { RectButton } from "react-native-gesture-handler";
import { AntDesign, Feather } from '@expo/vector-icons'
import { Button } from "../components/button";
import { useAuth } from "../hooks/auth";
import { Avatar } from "../components/avatar";
import { useNavigation } from "@react-navigation/native";
import { HeaderSimple } from "../components/header-simple";
import { ButtonOpacity } from "../components/button-opacity";
import { Percent } from "../components/percent";

export function Profile() {
  const { top, bottom } = useSafeAreaInsets();
  const { signOut, user, updatedUser } = useAuth()

  console.log(user)
  const navigation = useNavigation()
  
  const handleToSignOut = async () => {
    await signOut()
  }

  const handleToChangePassword = () => {
    navigation.navigate('PasswordChangePage')
  }

  const handleToChangeName = () => {

  }
  
  const avatarUrl = `https://ui-avatars.com/api/?background=EFF0F0&name=${user.name}`; 

  return (
    <View style={[styles.container, { paddingTop: top + 12 }]}>
      <HeaderSimple 
        title="Perfil do usuário"
      />
      <View style={[styles.content,  { paddingBottom: bottom + 12 }]}>
        <View style={{ alignItems: 'center', width: '100%', position: 'relative', gap: 12}}>
          <Avatar
            url={avatarUrl}
            size={120}
          />
          <Text size={14} weight="bold">{user?.name}</Text>
        </View>

        <View>
          <View style={styles.box}>
            <ButtonOpacity 
              text='Sair'
              icon="log-out"
              onPress={handleToSignOut}
             />
            <ButtonOpacity 
              text='Alterar senha'
              icon="lock"
              onPress={handleToChangePassword}
             />
            <ButtonOpacity 
              text='Alterar nome de usuário'
              icon="user"
              onPress={handleToChangeName}
              enabled={false}
             />
          </View>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray[700],
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  box: {
    marginTop: 20,
    backgroundColor: theme.colors.gray[600],
    borderRadius: 20,
    overflow: 'hidden'
  }
})