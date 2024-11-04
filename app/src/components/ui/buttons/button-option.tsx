import { StyleSheet, View } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import { useRef } from "react";
import { theme } from "../../../global/theme";
import { Dot } from "../../dot";
import { Text } from "../Typography/Text";

interface ButtonOptionProps extends RectButtonProps {
  label: string
  isDiet: boolean
  selected?: boolean
}

export function ButtonOption({ label, isDiet, selected, ...rest }: ButtonOptionProps) {
  return (
    <RectButton
      {...rest}
      underlayColor={isDiet ? theme.colors.green.light : theme.colors.red.light}
      activeOpacity={1}
      style={styles.container}
    >
      <View style={[
        styles.content,
        selected && {
          borderColor: isDiet ? theme.colors.green.dark : theme.colors.red.dark,
          backgroundColor: isDiet ? theme.colors.green.light : theme.colors.red.light
        }
      ]}>
        <Dot 
          size={8}
          color={isDiet ? theme.colors.green.dark : theme.colors.red.dark}
        />
        <Text size={'sm'} weight="bold" color="gray.100">
          {label}
        </Text>
      </View>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray[600],
    borderRadius: 6,
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: theme.colors.gray[600]
  }
})