import {FlatList, StyleSheet, View } from "react-native";

import LogoSvg from '../assets/logo.svg'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar } from "../components/avatar";
import { Button } from "../components/button";
import { Percent } from "../components/percent";
import { Text } from "../components/ui/Typography/Text";
import { RectButton } from "react-native-gesture-handler";
import { MealItem } from "../components/meal-item";
import { meals } from "../mocks/meal-mock";


export function Home () {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top + 12 }]}>
      <View style={styles.header}>
        <LogoSvg />
        <Avatar />
      </View>
      <RectButton activeOpacity={0}>
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
  }
})