import { StyleSheet, View } from "react-native";
import { ControllerTextInput } from "./controller-input";
import { z } from 'zod'
import { Controller, UseFormReturn } from "react-hook-form";
import { ControllerDatePicker } from "./controller-datepicker";
import { ButtonOption } from "../button-option";

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
      <ControllerTextInput 
        label="Nome"
        name="title"
        control={form.control}
      />

      <ControllerTextInput 
        label="Descrição"
        name="description"
        control={form.control}
      />
    
      <View style={{ flexDirection: 'row', gap: 12}}>
        <View style={{flex: 1}}>
        <ControllerDatePicker 
          label="Data"
          name="date"
          control={form.control}
          mode="date"
        />
        </View>
        <View style={{flex: 1}}>
          <ControllerDatePicker 
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
        render={({ field }) => (
          <>
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
          </>
        )}
      
      />

    </View>
  )
}

const styles = StyleSheet.create({
  
})
