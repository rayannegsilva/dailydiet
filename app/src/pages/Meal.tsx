import { StyleSheet, View } from "react-native";
import { theme } from "../global/theme";
import dayjs from 'dayjs';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text } from "../components/ui/Typography/Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MealProps } from "../components/meal-item";
import { RectButton } from "react-native-gesture-handler";

import { AntDesign } from '@expo/vector-icons'

export function Meal() {
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useNavigation()
  const route  = useRoute()

  const { meal } = route.params as MealProps


  const formattedDate = dayjs(meal.date).format('DD/MM/YYYY [às] HH:mm');

  return (
    <View 
      style={[styles.container, { paddingTop: top + 12, backgroundColor: meal.onDiet ? theme.colors.green.light : theme.colors.red.light}]}
    >
      <View style={styles.header}>
        <RectButton style={styles.goBackButton}>
          <AntDesign name="arrowleft" size={24} color={meal.onDiet ? theme.colors.green.dark : theme.colors.red.dark}/>
        </RectButton>
        <Text size="lg" weight="bold">Refeição</Text>
      </View>

      <View  style={[styles.content, { paddingBottom: bottom + 12 }]}>
        <Text>{meal.title}</Text>
        <Text>{meal.description}</Text>


        <Text>Data e Hora</Text>
        <Text>{formattedDate}</Text>
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
    backgroundColor: theme.colors.white,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
})