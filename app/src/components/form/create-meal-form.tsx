import { StyleSheet, View } from "react-native";
import { FormTextInput } from "./form-input";
import { z } from 'zod'
import { Controller, UseFormReturn } from "react-hook-form";
import { FormDatePicker } from "./form-datepicker";
import { ButtonOption } from "./../ui/buttons";
import { Text } from "../ui/Typography/Text";

export const mealSchema = z.object({
  title: z.string({ required_error: 'É necessário informar um nome.' }),
  description: z.string({ required_error: 'É necessário informar uma descrição.' }),
  date: z.date({ required_error: 'É necessário informar uma data.'}),
  hour: z.date({ required_error: 'É necessário informar uma hora.'}),
  isDiet: z.enum(['on-diet', 'out-diet'], {
    required_error: 'É necessário informar se está dentro ou fora dieta.'
  })
})

export type MealSchema = z.infer<typeof mealSchema>

export interface MealFormProps {
  form: UseFormReturn<MealSchema>
}

export function CreateMealForm({ form }: MealFormProps) {
  return (
    <View style={{ gap: 24 }}>
      <FormTextInput 
        label="Nome"
        name="title"
        control={form.control}
      />

      <FormTextInput 
        label="Descrição"
        name="description"
        control={form.control}
      />
    
      <View style={{ flexDirection: 'row', gap: 12}}>
        <View style={{flex: 1}}>
        <FormDatePicker 
          label="Data"
          name="date"
          control={form.control}
          mode="date"
        />
        </View>
        <View style={{flex: 1}}>
          <FormDatePicker 
            label="Hora"
            name="hour"
            control={form.control}
            mode="time"
          />
        </View>
      </View>
      <Controller 
        control={form.control}
        name="isDiet"
        render={({ field, fieldState }) => (
        <View>
          <View style={{ flexDirection: 'row', gap: 12}}>
            <ButtonOption 
              label="Sim"
              isDiet={true}
              onPress={() => field.onChange('on-diet')}
              selected={field.value === 'on-diet'}
            />
              <ButtonOption 
                label="Não"
                isDiet={false}
                onPress={() => field.onChange('out-diet')}
                selected={field.value === 'out-diet'}
            />
          </View>

          {fieldState.error && (
              <Text size={"sm"} color="red.dark">
                {fieldState.error.message}
              </Text>
          )}
          </View>
        )}
      
      />

    </View>
  )
}

const styles = StyleSheet.create({
  
})
