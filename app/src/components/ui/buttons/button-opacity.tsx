import { StyleSheet, View } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { Feather } from '@expo/vector-icons'
import { theme } from "../global/theme";
import { Text } from "./ui/Typography/Text";

interface ButtonOpacityProps extends RectButtonProps {
  text: string
  icon?: keyof typeof Feather.glyphMap
  selected?: boolean
}

export function ButtonOpacity({ text, icon, selected, ...rest }: ButtonOpacityProps) {
  return (
    <View style={style.container}>
      <RectButton
        {...rest}
        style={[style.button, (rest.enabled === false) && style.disable]}
      >
        <Feather 
          name={icon}
          size={16}
          color={theme.colors.gray[100]}
        />

        <Text size={"md"}>{text}</Text>

        {selected &&
        <Feather 
         name='check'
         size={16}
         color={theme.colors.gray[100]}
         style={style.selectedIcon}
       />
      }
      </RectButton>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 10,
    position: 'relative'
  },
  selectedIcon: {
    position: 'absolute',
    right: 24,
  },
  disable: {
    opacity: 0.6
  }
})