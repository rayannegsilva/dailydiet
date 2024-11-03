import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { PasswordInput, PasswordInputProps } from "../ui/inputs/password-input";
import { theme } from "../../global/theme";

export function FormPasswordInput<FormType extends FieldValues>({
  control, 
  name, 
  rules, 
  ...rest
}: PasswordInputProps & UseControllerProps<FormType>){
  return (
    <Controller 
      control={control}
      name={name}
      rules={rules}
      render={({field, fieldState}) => (
        <PasswordInput
          {...rest}
          value={field.value}
          onChangeText={field.onChange}
          errorMessage={fieldState.error?.message}
        />
      )}
    />
  )
}