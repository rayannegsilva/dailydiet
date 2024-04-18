import { StyleSheet, Image } from "react-native";
import { theme } from "../global/theme";

interface AvatarProps {
  size: number
}

export function Avatar({ size }: AvatarProps ) {
  return (
    <Image
      style={[styles.image, { borderRadius: size / 2}]}
      source={{ uri: 'https://avatars.githubusercontent.com/u/69162451?v=4'}}
      height={size}
      width={size}
    />
  )
}

const styles = StyleSheet.create({
   image: {
    borderRadius: 99999,
    borderWidth: 2,
    borderColor: theme.colors.gray[200],
   }
})