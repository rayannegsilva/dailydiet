import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import { theme } from "../global/theme";
import dayjs from 'dayjs';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text } from "../components/ui/Typography/Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MealProps } from "../components/meal-item";
import { RectButton } from "react-native-gesture-handler";

import { AntDesign } from '@expo/vector-icons'
import { Dot } from "../components/dot";
import { Button } from "../components/button";

import { MealNavigationProps } from "../@types/navigation";
import { deleteUserMeal, getUserMealById } from "../hooks/useMeal";

export function Meal() {
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useNavigation()
  const route  = useRoute()

  const { mealId } = route.params as MealNavigationProps
  const mealDelete = deleteUserMeal(mealId)

  const queryMealById = getUserMealById(mealId)

  const goBack = () => {
    navigation.goBack()
  }

  const handleToMealEdit = () => {
    navigation.navigate('MealEdit', {
      mealId
    })
  }

  const handleDeleteMeal = async () => {
    await mealDelete.mutateAsync()

    navigation.navigate('Home')
  }

  if(!queryMealById.mealById && queryMealById.mealIdLoading) {
    return (
      <View style={styles.fetching}>
        <ActivityIndicator color={theme.colors.green.dark} />
      </View>
    )
  }

  const formattedDate = dayjs(queryMealById.mealById.date).format('DD/MM/YYYY [às] HH:mm');

  return (
    <View 
      style={[styles.container, { paddingTop: top + 12, backgroundColor: queryMealById.mealById.isDiet ? theme.colors.green.light : theme.colors.red.light}]}
    >
      <StatusBar backgroundColor={queryMealById.mealById.isDiet ? theme.colors.green.light : theme.colors.red.light}/>
      <View style={styles.header}>
        <RectButton style={styles.goBackButton} onPress={goBack}>
          <AntDesign name="arrowleft" size={24} color={queryMealById.mealById.isDiet ? theme.colors.green.dark : theme.colors.red.dark}/>
        </RectButton>
        <Text size="lg" weight="bold">Refeição</Text>
      </View>

      <View  style={[styles.content, { paddingBottom: bottom + 12 }]}>
        <View style={[styles.meal]}>
           <Text size={"lg"} weight="bold" color="gray.100">{queryMealById.mealById.title}</Text>
          <Text>{queryMealById.mealById.description}</Text>
        </View>

        <View style={[styles.meal]}>
          <Text weight="bold" size={"sm"}>Data e Hora</Text>
           <Text>{formattedDate}</Text> 
         </View>
          
        <View style={styles.tag}>
          <Dot size={8} color={queryMealById.mealById.isDiet ? theme.colors.green.dark : theme.colors.red.dark}/>
          {queryMealById.mealById.isDiet ? (<Text>dentro da dieta</Text>) : <Text>fora da dieta</Text>}
        </View>

        <View style={styles.footer}>
          <Button title="Editar Refeição" icon="edit-3" variant="primary" onPress={handleToMealEdit}/>
          <Button title="Excluir Refeição" icon="trash-2" variant="outlined" onPress={handleDeleteMeal}/>
        </View>
      </View>
    </View> 
   )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 40,
    gap: 24,
  },
  meal: {
    gap: 8
  },
  tag: {
    backgroundColor: theme.colors.gray[600],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10000,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
  },
  footer: {
    marginTop: 'auto',
    gap: 8,
  },
  fetching: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})