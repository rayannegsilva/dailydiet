import { NavigationContainer } from "@react-navigation/native";
import { PrivateStackRoutes } from "./private.stack.routes";
import { AppStackRoutes } from "./app.stack.routes";
import { useAuth } from "../hooks/auth";

export function Routes() {
  const { user } = useAuth()


  return (
    <NavigationContainer>
      {
        user && user.token
        ? (<PrivateStackRoutes />)
        : (<AppStackRoutes />)
      }
    </NavigationContainer>
  )
}