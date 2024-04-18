import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../pages/Home'
import { Statistics } from '../pages/Statistics'
import { Meal } from '../pages/Meal'
import { MealCreate } from '../pages/MealCreate'
import { MealEdit } from '../pages/MealEdit'
import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppStackRoutes() {
  return(
    <Navigator
      initialRouteName='SignIn'
      screenOptions={{ headerShown: false }}
    >
      <Screen
        name='SignIn'
        component={SignIn}
      />
      <Screen
        name='SignUp'
        component={SignUp}
      />
    </Navigator>
  )
}