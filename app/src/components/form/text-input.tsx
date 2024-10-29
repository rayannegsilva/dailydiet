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
  onChangeText, 
  errorMessage, 
  RightComponent,
  LeftComponent,
  ...rest 
}: TextInputProps) {
  const inputRef = useRef<Input>(null)

  function focusInput() {
    inputRef.current?.focus();
  }

  return (
    <View style={styles.container}> 
      <Pressable style={{ gap: 4 }}>
        {label && (
          <Text size={"sm"} weight="bold">
            {label}
          </Text>
        )}

       <View style={styles.inputContainer}>
          {LeftComponent && (
            <View>
              {LeftComponent}
            </View>
          )}

          <Input
            style={styles.input}
            { ...rest}
          />

          {RightComponent && (
            <View>
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
      {/* 
        <Input
          {...rest}
          autoCapitalize="none"
          style={styles.input}
          placeholderTextColor={theme.colors.gray[400]}
          onChangeText={onChangeText}
          ref={inputRef}
        />

        { error && 
          <Text size={"sm"} color="red.dark">
            {error}
          </Text>
        } */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    width: '100%'
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