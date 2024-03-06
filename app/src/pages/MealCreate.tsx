import { StatusBar, StyleSheet, View } from "react-native";
import { theme } from "../global/theme";
import { zodResolver } from '@hookform/resolvers/zod';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons'
import { RectButton } from "react-native-gesture-handler";
import { Text } from "../components/ui/Typography/Text";
import { useNavigation } from "@react-navigation/native";
import { CreateMealForm, mealSchema, MealSchema } from "../components/form/create-meal-form";
import { useForm } from "react-hook-form";
import { Button } from "../components/button";
import { createUserMeal } from "../hooks/useMeal";



export function MealCreate() {
  const safeAreaInsets = useSafeAreaInsets();
  const navigation = useNavigation()

  const createNewMeal = createUserMeal()

  const goBack = () => {
    navigation.goBack()
  }

  const form = useForm<MealSchema>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      date: new Date(),
      hour: new Date()
    }
  })


  const onSubmit = async (data: MealSchema) => {
   try {
    data.date.setHours(data.hour.getHours())
    data.date.setMinutes(data.hour.getMinutes())
    data.date.setSeconds(0)
    data.date.setMilliseconds(0)

    const isDiet = data.isDiet === 'on-diet'

    await createNewMeal.mutateAsync({
      title: data.title,
      description: data.description,
      date: data.date,
      isDiet
    })

    navigation.navigate('Feedback', {
      isDiet
    })
   } catch (error) {
    console.log(error)
   }
  }

  return (
    <View style={[styles.container,  { paddingTop: safeAreaInsets.top + 12 }]}>
      <StatusBar backgroundColor={theme.colors.gray[500]}/>
      <View style={styles.header}>
       <RectButton style={styles.goBackButton} onPress={goBack}>
        <AntDesign name="arrowleft" size={24} color={theme.colors.gray[200]}/>
       </RectButton>

       <Text size="lg" weight="bold">Nova Refeição</Text>
      </View>

      <View style={[styles.content, { paddingBottom: safeAreaInsets.bottom + 12}]}>
        <CreateMealForm 
          form={form}
        />
        // TODO: DESABILITAR O BOTÃO QUANDO FOR FAZER O FETCH
        <View style={{ marginTop: 'auto'}}>
          <Button
            onPress={() => form.handleSubmit(onSubmit)()}
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