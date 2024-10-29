import { useState } from "react"
import { Feather } from '@expo/vector-icons'
import { TextInput, TextInputProps } from "./form/text-input"
import { Pressable } from "react-native";
import { theme } from "../global/theme";

export type PasswordInputProps = Omit<TextInputProps, 'RightComponent'>;

export function PasswordInput (props: PasswordInputProps) {
  const [isSecureTextEntry, setIsSecureEntry] = useState(true);

  function changeSecureTextEntry () {
    console.log(isSecureTextEntry)
    setIsSecureEntry(prev => !prev);
  }

  return (
    <TextInput 
      secureTextEntry={isSecureTextEntry}
      {...props}
      RightComponent={
        <Pressable
          onPress={changeSecureTextEntry}
        >
          <Feather
            size={20}
            name={isSecureTextEntry ? "eye" : 'eye-off'}
            color={theme.colors.gray[100]}
          />
        </Pressable>
      }
    />
  )
}