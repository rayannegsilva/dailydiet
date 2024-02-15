import { StyleSheet, View } from "react-native";
import { theme } from "../global/theme";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons'
import { RectButton } from "react-native-gesture-handler";
import { Text } from "../components/ui/Typography/Text";

export function CreateMeal() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={[styles.container,  { paddingTop: safeAreaInsets.top + 12 }]}>
      <View style={styles.header}>
       <RectButton style={styles.goBackButton}>
        <AntDesign name="arrowleft" size={24} color={theme.colors.gray[200]}/>
       </RectButton>

       <Text size="lg" weight="bold">Nova Refeição</Text>
      </View>

      <View style={[styles.content, { paddingBottom: safeAreaInsets.bottom + 12 }]}>
        <Text>oi</Text>
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