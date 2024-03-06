import { StatusBar, StyleSheet, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons'
import { useNavigation, useRoute } from "@react-navigation/native";
import { theme } from "../global/theme";
import { Text } from "../components/ui/Typography/Text";
import { CreateMealForm, MealSchema, mealSchema } from "../components/form/create-meal-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/button";

import { getUserMealById, updatedUserMeal } from "../hooks/useMeal";
import { MealNavigationProps } from "../@types/navigation";


export function MealEdit() {
  const { top, bottom } = useSafeAreaInsets();
  const route  = useRoute()
  const navigation = useNavigation()

  const { mealId } = route.params as MealNavigationProps

  const queryMealById = getUserMealById(mealId)
  const queryUpdateMeal = updatedUserMeal(mealId)

  const goBack = () => {
    navigation.goBack()
  }

  const form = useForm<MealSchema>({
    resolver: zodResolver(mealSchema),
    defaultValues: 
    queryMealById.mealById ? { 
        title: queryMealById.mealById.title,
        description: queryMealById.mealById.description,
        date: new Date(queryMealById.mealById.date),
        hour: new Date(queryMealById.mealById.date),
        isDiet: queryMealById.mealById.isDiet ? 'on-diet' : 'out-diet'
      } 
      : undefined
  })


  const onEditMeal = async (data: MealSchema) => {
    try {
     data.date.setHours(data.hour.getHours())
     data.date.setMinutes(data.hour.getMinutes())
     data.date.setSeconds(0)
     data.date.setMilliseconds(0)
 
     const isDiet = data.isDiet === 'on-diet'
 
      await queryUpdateMeal.mutateAsync({
        mealId: mealId,
        title: data.title,
        description: data.description,
        date: data.date,
        isDiet
      })
   
    } catch (error) {
     console.log(error)
    }
   }

  return (
    <View style={[styles.container,  { paddingTop: top + 12 }]}>
      <StatusBar backgroundColor={theme.colors.gray[500]}/>
      <View style={styles.header}>
       <RectButton style={styles.goBackButton} onPress={goBack}>
        <AntDesign name="arrowleft" size={24} color={theme.colors.gray[200]}/>
       </RectButton>

       <Text size="lg" weight="bold">Editar Refeição</Text>
      </View>

      <View style={[styles.content, { paddingBottom: bottom + 12 }]}>

        <CreateMealForm 
          form={form}
        />

       <View style={{ marginTop: 'auto'}}>
          <Button
            onPress={() => form.handleSubmit(onEditMeal)()}
            title="Cadastrar Refeição"
          />
        </View>   
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[500],
  },
  header: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 24,
  },
  goBackButton: {
    position: 'absolute',
    left: 16,
    top: -8,
    padding: 8,
    borderRadius: 6,
  },
  content: {
    backgroundColor: theme.colors.white,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
})