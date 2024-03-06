import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../pages/Home'
import { Statistics } from '../pages/Statistics'
import { Meal } from '../pages/Meal'
import { MealCreate } from '../pages/MealCreate'
import { MealEdit } from '../pages/MealEdit'
import { SignIn } from '../pages/SignIn'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppStackRoutes() {
  return(
    <Navigator
      initialRouteName='SigUp'
      screenOptions={{ headerShown: false }}
    >
      <Screen
        name='SignUp'
        component={SignIn}
      />
      
    </Navigator>
  )
}