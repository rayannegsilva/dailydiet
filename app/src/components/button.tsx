import { ActivityIndicator, StyleSheet, View } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { exhaustive } from "exhaustive";
import { Feather } from '@expo/vector-icons'

import { Text } from "./ui/Typography/Text";
import { theme } from "../global/theme";

export type ButtonProps = Omit<RectButtonProps, 'style'> & {
  variant?: 'primary' | 'outlined'
  title: string
  icon?: keyof typeof Feather.glyphMap
  isLoading?: boolean
}

export function Button({ variant = 'primary', title, icon, isLoading, ...rest}: ButtonProps) {
  const variantStyles = exhaustive(variant, {
    primary: () => ({
      styles: primaryStyle,
      textColor: theme.colors.white,
      iconColor: theme.colors.white,
      activeColor: theme.colors.gray[100],
      loadingColor: theme.colors.green.mid
    }),
    outlined: () => ({
      styles: outlineStyle,
      textColor: theme.colors.gray[100],
      iconColor: theme.colors.gray[100],
      activeColor: theme.colors.gray[500],
      loadingColor: theme.colors.green.dark,
    })
  })

  return  (
    <View 
      style={[baseStyle.container, variantStyles.styles.container, (rest.enabled === false || isLoading) && baseStyle.disable]}
    >
      <RectButton
        {...rest}
        style={baseStyle.button}
       >
       {
        isLoading ? (
          <ActivityIndicator
            color={variantStyles.loadingColor}
          />
        ) : (
          <>
          {icon && (
            <Feather
              size={18}
              style={{ marginRight: 12 }}
              color={variantStyles.iconColor}
              name={icon}
            />
          )}
          <Text size="sm" weight="bold" color={variantStyles.textColor}>{title}</Text>
        </>
       )}
      </RectButton>
    </View>
  )
}

const baseStyle = StyleSheet.create({
    container: {
      borderRadius: 6,
      borderWidth: 1,
      width: "100%"
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderRadius: 6
    },
    disable: {
      opacity: 0.5
    }
})

const primaryStyle =  StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray[200],
    borderColor: theme.colors.gray[200]
  }
})

const outlineStyle =  StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.gray[100]
  }
})