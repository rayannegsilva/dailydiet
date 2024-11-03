import { StatusBar, StyleSheet, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons'
import { useNavigation, useRoute } from "@react-navigation/native";
import { theme } from "../global/theme";
import { Text } from "../components/ui/Typography/Text";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CreateMealForm, MealSchema, mealSchema  } from "../components";

import { getUserMealById, updatedUserMeal } from "../hooks/useMeal";
import { MealNavigationProps } from "../@types/navigation";
import { HeaderSimple } from "../components/header-simple";


export function MealEdit() {
  const { top, bottom } = useSafeAreaInsets();
  const route  = useRoute()
  const navigation = useNavigation()

  const { mealId } = route.params as MealNavigationProps

  const queryMealById = getUserMealById(mealId)
  const queryUpdateMeal = updatedUserMeal(mealId)

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

      navigation.navigate('Home')
    } catch (error) {
     console.log(error)
    }
   }

  return (
    <View style={[styles.container,  { paddingTop: top + 12 }]}>
      <StatusBar backgroundColor={theme.colors.gray[500]}/>
      <HeaderSimple 
        title="Editar refeição"
      />

      <View style={[styles.content, { paddingBottom: bottom + 12 }]}>

        <CreateMealForm 
          form={form}
        />

       <View style={{ marginTop: 'auto'}}>
          <Button
            onPress={() => form.handleSubmit(onEditMeal)()}
            title="Editar Refeição"
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
  content: {
    backgroundColor: theme.colors.white,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
})