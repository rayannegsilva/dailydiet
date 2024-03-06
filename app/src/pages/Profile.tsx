import { StyleSheet, View } from "react-native";
import { theme } from "../global/theme";
import { Button } from "../components/button";
import { useAuth } from "../hooks/auth";

export function Profile() {
  const { signOut } = useAuth()

  const handleToSignOut = async () => {
    await signOut()
  }

  return (
    <View style={styles.container}>
      <Button 
        title="Sair"
        onPress={handleToSignOut}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[700],
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  }
})