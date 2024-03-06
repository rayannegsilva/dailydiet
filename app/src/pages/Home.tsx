import {ActivityIndicator, FlatList, Pressable, StyleSheet, View } from "react-native";

import LogoSvg from '../assets/logo.svg'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar } from "../components/avatar";
import { Button } from "../components/button";
import { Percent } from "../components/percent";
import { Text } from "../components/ui/Typography/Text";
import { RectButton } from "react-native-gesture-handler";
import { MealItem, MealProps } from "../components/meal-item";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../global/theme";
import { getMealById, getMeals, getMetrics } from "../hooks/meal";
import { MealNavigationProps } from "../@types/navigation";
import { getUserMeals } from "../hooks/useMeal";
import { getUserStats } from "../hooks/useStatistics";
// import { getUserStatistics } from "../hooks/useStatistics";

export function Home () {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation()

  const meal = getUserMeals()
  const queryStats = getUserStats()

  const toStatistics = () => {
    navigation.navigate('Statistics')
  }

  const handleToMeal = (mealId: string) => {
    navigation.navigate('Meal', {
      mealId
    });
  };

  const handleToProfile = () => {
    navigation.navigate('Profile')
  }

function handleCreateMeal() {
  navigation.navigate('MealCreate')
}

  return (
    <View style={[styles.container, { paddingTop: top + 12 }]}>
      <View style={styles.header}>
        <LogoSvg />
        <Pressable onPress={handleToProfile}>
           <Avatar />
        </Pressable> 
      </View>
     {
      queryStats.userStatsLoading 
      ? (<ActivityIndicator 
          size={20}
          color={theme.colors.green.dark}
        />) :
        (
          <RectButton activeOpacity={0} onPress={toStatistics}>
            <Percent
              icon="arrow-up-right"
              variant={queryStats.userStats.insideOfDiet ? 'green' : 'red' }
            >
              <Text weight="bold" size={"2xl"}>
                {queryStats.userStats.percentage}%
              </Text> 
              <Text> das refeições dentro da dieta </Text>
            </Percent>
         </RectButton>
        
        )
     }
          

      <View style={styles.listHeader}>
        <Text size="md" color="gray.100">Refeições</Text>
        <Button
          icon="plus"
          title="Refeições"
          onPress={handleCreateMeal}
        />
      </View>

      {(meal.mealsLoading || meal.mealsFetching ) &&  (
        <ActivityIndicator 
        style={{ marginTop: 40 }}
        color={theme.colors.green.dark}
      />)}

    <FlatList
      data={meal.meals}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      contentContainerStyle={{ paddingBottom: 24 }}
      keyExtractor={(item) => item.id}
      renderItem={({ item } ) => (
        <RectButton onPress={() => handleToMeal(item.id)}>
          <MealItem 
            meal={item}
          />
        </RectButton>
      )}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: theme.colors.gray[700]
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  listHeader: {
    marginTop: 40,
    gap: 8,
    marginBottom: 32,
  }
})