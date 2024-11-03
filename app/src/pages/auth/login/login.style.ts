import { StyleSheet } from "react-native";
import { theme } from "../../../global/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 60,
    paddingHorizontal: 24,
  },
  content: {
    gap: 24,
    width: '100%',
    
  }
})