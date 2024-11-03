import { StyleSheet, View, TextInput as Input, TextInputProps as InputProps, Pressable } from "react-native";
import { Text } from "../ui/Typography/Text";
import { theme } from "../../global/theme";
import { useRef } from "react";


export interface TextInputProps extends InputProps {
  label?: string
  errorMessage?: string
  onChangeText?: (text: string) => void
  RightComponent?: React.ReactElement
  LeftComponent?: React.ReactElement
}

export function TextInput({ 
  label, 
  LeftComponent, 
  RightComponent, 
  errorMessage, 
  ...inputProps 
}: TextInputProps) {
  const inputRef = useRef<Input>(null);

  function focusInput() {
    inputRef.current?.focus();
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.container} onPress={focusInput}>
        {label && (
          <Text size={'sm'}>
              {label}
          </Text>
        )}
        <View style={styles.inputContainer}>
          {LeftComponent && (
            <View > 
              {LeftComponent}
            </View>
          )}
          <Input
            {...inputProps}
            autoCapitalize="none"
            ref={inputRef}
            placeholderTextColor={theme.colors.gray[500]}
            style={styles.input}
          />
          {RightComponent && (
            <View style={{marginLeft: 6 }}>
              {RightComponent}
            </View>
          )}
        </View>
          {errorMessage && (
            <Text size={"sm"} color="red.dark">
              {errorMessage}
            </Text>
          )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    width: '100%'
  },
  content: {
    gap: 8
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.colors.gray[500],
    borderRadius: 6,
    alignItems: 'center',
    padding: 14,
  },
  input: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.md,
    flexGrow: 1,
    flexShrink: 1,
  }
})