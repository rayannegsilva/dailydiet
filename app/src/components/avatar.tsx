import { StyleSheet, Image } from "react-native";
import { theme } from "../global/theme";

export function Avatar() {
  return (
    <Image
      style={styles.image}
      source={{ uri: 'https://avatars.githubusercontent.com/u/69162451?v=4'}}
    />
  )
}

const styles = StyleSheet.create({
   image: {
    borderRadius: 99999,
    borderWidth: 2,
    borderColor: theme.colors.gray[200],
    width: 40,
    height: 40
   }
})