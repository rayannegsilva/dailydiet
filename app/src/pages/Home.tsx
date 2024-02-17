import {FlatList, StyleSheet, View } from "react-native";

import LogoSvg from '../assets/logo.svg'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar } from "../components/avatar";
import { Button } from "../components/button";
import { Percent } from "../components/percent";
import { Text } from "../components/ui/Typography/Text";
import { RectButton } from "react-native-gesture-handler";
import { MealItem, MealProps } from "../components/meal-item";
import { meals } from "../mocks/meal-mock";
import { useNavigation } from "@react-navigation/native";

export function Home () {
  const { top, bottom } = useSafeAreaInsets();

  const navigation = useNavigation()

  const toStatistics = () => {
    navigation.navigate('Statistics')
  }

  const toMeal = ( meal: MealProps ) => {
    navigation.navigate('Meal', {
      meal
    })
  }

  return (
    <View style={[styles.container, { paddingTop: top + 12 }]}>
      <View style={styles.header}>
        <LogoSvg />
        <Avatar />
      </View>
      <RectButton activeOpacity={0} onPress={toStatistics}>
        <Percent
          icon="arrow-up-right"
          variant="red"
        >
          <Text weight="bold" size={"2xl"}>
            90,86%
          </Text>
          <Text>
            das refeições dentro da dieta
          </Text>
        </Percent>
      </RectButton>

      <View style={styles.listHeader}>
        <Text size="md" color="gray.100">Refeições</Text>
        <Button
          icon="plus"
          title="Refeições"
        />
      </View>

    <FlatList
      data={meals}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      contentContainerStyle={{ paddingBottom: 24 }}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item } ) => (
        <RectButton onPress={() => {toMeal({ meal: item })}}>
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
    paddingHorizontal: 24
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