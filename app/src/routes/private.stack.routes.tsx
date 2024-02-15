import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '../pages/Home'

const { Navigator, Screen } = createNativeStackNavigator()

export function PrivateStackRoutes() {
  <Navigator
    initialRouteName='Home'
    screenOptions={{ headerShown: false }}
  >
    <Screen
      name='Home'
      component={Home}
    />
  </Navigator>
}