import { StyleSheet, View } from "react-native";
import { Text } from "./ui/Typography/Text";
import { theme } from "../global/theme";
import { Dot } from "./dot";

interface MealItemProps {
  id: string
  date: Date,
  title: string,
  description: string
  isDiet: boolean
}

export interface MealProps {
  meal: MealItemProps
}

export function MealItem({ meal }: MealProps) {
  const date = new Date(meal.date)
  
  function formatTime(date: Date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const  timeFormatted = formatTime(date)

  return (
    <View style={styles.container}>
      <Text size="xs" weight="bold">
        {timeFormatted}
      </Text>
      <View 
        style={styles.divider} 
      />
      <Text size="md" color="gray.200" style={{ flex: 1}}>
        {meal.title}
      </Text>
      <Dot 
        size={14}  
        color={meal.isDiet ? theme.colors.green.mid : theme.colors.red.mid}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: theme.colors.gray[500],
    borderRadius: 6
  },
  divider: {
    height: 14,
    width: 1,
    backgroundColor: theme.colors.gray[400]
  }
})