import { StyleSheet, Image } from "react-native";
import { theme } from "../global/theme";

interface AvatarProps {
  size: number
  url: string
}

export function Avatar({ size, url}: AvatarProps ) {
  return (
    <Image
      style={[styles.image, { borderRadius: size / 2}]}
      source={{ uri: url}}
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