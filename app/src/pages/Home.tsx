import {ActivityIndicator, FlatList, Pressable, StyleSheet, View } from "react-native";

import LogoSvg from '../assets/logo.svg'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar } from "../components/avatar";
import { Button } from "../components/ui/buttons";
import { Percent } from "../components/percent";
import { Text } from "../components/ui/Typography/Text";
import { RectButton } from "react-native-gesture-handler";
import { MealItem } from "../components/meal-item";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../global/theme";

import { getUserMeals } from "../hooks/useMeal";
import { getUserStats } from "../hooks/useStatistics";
import dayjs from "dayjs";
import { useAuth } from "../hooks/auth";


export function Home () {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation()
  const { user  } = useAuth()


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

const avatarUrl = `https://ui-avatars.com/api/?background=EFF0F0&name=${user?.name}`; 

  return (
    <View style={[styles.container, { paddingTop: top + 12 }]}>
      <View style={styles.header}>
        <LogoSvg />
        <Pressable onPress={handleToProfile}>
           <Avatar
            url={avatarUrl}
            size={40}
           />
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
      renderItem={({ item, index} ) => {
        const firstMealOfDay = index === 0 ||
        new Date(item.date).getDate() !==
          new Date(meal.meals![index - 1].date).getDate();

          const Meal = (
            <RectButton onPress={() => handleToMeal(item.id)}>
              <MealItem 
                meal={item}
              />
          </RectButton>
          )

          if(firstMealOfDay) {
            return (
              <View style={{gap: 8, marginTop: 32}}>
                <Text size="lg" weight="bold" color="gray.100">
                  {dayjs(item.date).format('DD.MM.YYYY')}
                </Text>

                {Meal}
              </View>
            )
          }
        
         return Meal
      }}
    
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
  }
})