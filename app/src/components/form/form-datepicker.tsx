import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { DatePickerInput, DatePickerProps } from "../ui/inputs/datepicker-input";

export function FormDatePicker<FormType extends FieldValues>({ 
  control, name, rules, ...rest }: DatePickerProps & UseControllerProps<FormType>) {
   return (
    <Controller 
      control={control}
      name={name}
      rules={rules}
      render={
        ({ field, fieldState}) => (
          <DatePickerInput 
            {...rest}
            onChange={(date) => field.onChange(date)}
            value={field.value}
            error={fieldState.error?.message}
          />
        )
      }
    />
   )
}