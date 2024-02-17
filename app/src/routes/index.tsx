import { NavigationContainer } from "@react-navigation/native";
import { PrivateStackRoutes } from "./private.stack.routes";

export function Routes() {
  return (
    <NavigationContainer>
      <PrivateStackRoutes />
    </NavigationContainer>
  )
}