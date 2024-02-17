import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '../pages/Home'
import { Statistics } from '../pages/Statistics'
import { Meal } from '../pages/Meal'
import { MealProps } from '../components/meal-item'


const { Navigator, Screen } = createNativeStackNavigator()

export function PrivateStackRoutes() {
  return(
    <Navigator
      initialRouteName='Home'
      screenOptions={{ headerShown: false }}
    >
      <Screen
        name='Home'
        component={Home}
      />
      <Screen
        name='Statistics'
        component={Statistics}
      />
      <Screen 
        name='Meal'
        component={Meal} 
      />
    </Navigator>
  )
}