import { StyleSheet, View } from "react-native";
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { theme } from "../global/theme";
import { Text } from "./ui/Typography/Text";

interface HeaderSimpleProps {
  title: string
}

export function HeaderSimple({ title }: HeaderSimpleProps) {
  const navigation = useNavigation()

  const goBack = () => {
    navigation.goBack()
  }
  
  return (
    <View style={styles.container}>
       <RectButton style={styles.button} onPress={goBack}>
        <AntDesign name="arrowleft" size={24} color={theme.colors.gray[200]}/>
       </RectButton>

       <Text size="lg" weight="bold">{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 24,
  },
  button: {
    position: 'absolute',
    left: 16,
    top: -8,
    padding: 8,
    borderRadius: 6,
  }
})