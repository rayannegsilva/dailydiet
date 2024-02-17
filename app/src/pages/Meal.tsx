import { StyleSheet, View } from "react-native";
import { theme } from "../global/theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text } from "../components/ui/Typography/Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MealProps } from "../components/meal-item";
import { RectButton } from "react-native-gesture-handler";

export function Meal() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation()
  const route  = useRoute()

  const { meal } = route.params as MealProps
  console.log( meal )
  

  return (
    <View 
      style={[styles.container, { paddingTop: top + 12, backgroundColor: theme.colors.gray[500]}]}
    >
      <View>
        <RectButton onPress={() => navigation.goBack()}>
          <Text>Voltar</Text>
        </RectButton>
        <Text>{meal.title}</Text>
        <Text>{meal.description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {

  }
})