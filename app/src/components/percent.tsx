import { PropsWithChildren } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { theme } from "../global/theme";
import { Feather } from '@expo/vector-icons'

type PercentProps = ViewProps & {
  variant?: 'red' | 'green'
  icon?: keyof typeof Feather.glyphMap
}

export function Percent({ variant, children, style, icon, ...rest }: PropsWithChildren<PercentProps>) {
  return (
    <View
      style={[
        styles.container,
        style,
        variant && {backgroundColor: theme.colors[variant].light}
      ]}
      {...rest}
    >
      {icon && 
        <Feather 
          size={24}
          color={variant ? theme.colors[variant].dark : theme.colors.gray[300]}
          name={icon}
          style={styles.icon}
        />
      }
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    position: 'relative',
    borderRadius: 6,
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.gray[600],
  },
  icon: {
    position: 'absolute',
    top: 8,
    right: 8,
  }
})