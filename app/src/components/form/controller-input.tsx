import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { TextInput, TextInputProps } from "./text-input";


export function ControllerTextInput<FormType extends FieldValues>({
  control,
  name,
  rules,
  defaultValue,
  shouldUnregister,
  ...rest
}: TextInputProps & UseControllerProps<FormType>) {
  return  (
    <Controller 
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
      render={({ field, fieldState}) => (
        <TextInput 
          {...rest}
          value={field.value}
          onChangeText={(text) => field.onChange(text)}
          error={fieldState.error?.message}
        />
      )}
    />
  )
}