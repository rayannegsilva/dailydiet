import { StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "../components/ui/Typography/Text";
import { theme } from "../global/theme";
import { Feather } from '@expo/vector-icons'
import { BorderlessButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Percent } from "../components/percent";
import { getUserStats } from "../hooks/useStatistics";


export function Statistics() {
  const safeAreaInsets = useSafeAreaInsets();
  const navigation = useNavigation()

  const queryStats = getUserStats()

  const goBack = () => {
    navigation.goBack()
  }

  return (
  <View style={[styles.container, { paddingTop: safeAreaInsets.top + 12, backgroundColor: queryStats.userStats.insideOfDiet ? theme.colors.green.light : theme.colors.red.light }]}>
    <StatusBar backgroundColor={queryStats.userStats.insideOfDiet ? theme.colors.green.light : theme.colors.red.light }/>
    <View style={styles.header}>
      <BorderlessButton style={styles.backButton} onPress={goBack}>
        <Feather
          name="arrow-left"
          size={24}
          color={queryStats.userStats.insideOfDiet ? theme.colors.green.dark : theme.colors.red.dark }
        />
      </BorderlessButton>
      <Text size={"3xl"} weight="bold">{queryStats.userStats.percentage}%</Text>
      <Text>das refeições dentro da dieta</Text>
    </View>

    <View style={styles.content}>
      <Text color="gray.100" weight="bold" size={"sm"} style={{ textAlign: "center"}}>Estatísticas</Text>

      <View style={styles.cardsContainer}>
        <Percent>
          <Text weight="bold" size={"2xl"} color="gray.200">{queryStats.userStats.bestSequence}</Text>
          <Text color="gray.200" size={"sm"}>melhor sequência de pratos dentro da dieta</Text>
        </Percent>

        <Percent>
          <Text weight="bold" size={"2xl"} color="gray.200">{queryStats.userStats.total}</Text>
          <Text color="gray.200" size={"sm"}>refeições registradas</Text>
        </Percent>

        <View style={styles.row}>
          <Percent style={{ flex: 1 }} variant="green">
            <Text weight="bold" size={"2xl"} color="gray.200">{queryStats.userStats.inDiet}</Text>
            <Text color="gray.200" size={"sm"} style={styles.text}>refeições dentro da dieta</Text>
          </Percent>
          <Percent style={{ flex: 1 }} variant="red">
            <Text weight="bold" size={"2xl"} color="gray.200" >{queryStats.userStats.outDiet}</Text>
            <Text color="gray.200" size={"sm"} style={styles.text}>refeições fora da dieta</Text>
          </Percent>
        </View>


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
    alignItems: "center",
    position: "relative"
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: -8,
    padding: 8,
    borderRadius: 6,
  },
  content: {
    flex: 1,
    backgroundColor: theme.colors.gray[700],
    marginTop: 34,
    paddingTop: 34,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24
  },
  cardsContainer: {
    marginTop: 24,
    gap: 12
  },
  row: {
    flexDirection: "row",
    gap: 12
  },
  text: {
    textAlign: 'center'
  }
})