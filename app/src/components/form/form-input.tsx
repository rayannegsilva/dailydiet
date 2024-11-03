import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { TextInput, TextInputProps } from "../ui/inputs/text-input";
import { theme } from "../../global/theme";

export function FormTextInput<FormType extends FieldValues>({
  control,
  name,
  rules,
  ...rest
}: TextInputProps & UseControllerProps<FormType>) {
  return  (
    <Controller 
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState}) => (
        <TextInput 
          value={field.value}
          onChangeText={field.onChange}
          errorMessage={fieldState.error?.message}
          placeholderTextColor={theme.colors.gray[500]}
          {...rest}
        />
      )}
    />
  )
}