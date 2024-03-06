import { StyleSheet, View, TextInput as Input, TextInputProps as InputProps } from "react-native";
import { Text } from "../ui/Typography/Text";
import { theme } from "../../global/theme";

export interface TextInputProps extends InputProps {
  label: string
  error?: string
  onChangeText?: (text: string) => void
}

export function TextInput({ label, onChangeText, error, ...rest }: TextInputProps) {
  return (
    <View style={styles.container}> 
      <Text size={"sm"} weight="bold">{label}</Text>
        <Input
          {...rest}
          autoCapitalize="none"
          style={styles.input}
          placeholderTextColor={theme.colors.gray[400]}
          onChangeText={onChangeText}
        />

        { error && 
          <Text size={"sm"} color="red.dark">
            {error}
          </Text>
        }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    width: '100%'
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.gray[500],
    borderRadius: 6,
    padding: 14,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.md,
  }
})