import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../pages/Home'
import { Statistics } from '../pages/Statistics'
import { Meal } from '../pages/Meal'
import { MealCreate } from '../pages/MealCreate'
import { MealEdit } from '../pages/MealEdit'
import { Feedback } from '../pages/Feedback'
import { Profile } from '../pages/Profile'
import { PasswordChangePage } from '../pages/PasswordChangePage'


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
      <Screen 
        name='MealCreate'
        component={MealCreate}
      />
       <Screen 
        name='MealEdit'
        component={MealEdit}
      />
         <Screen 
        name='Feedback'
        component={Feedback}
      />

      <Screen 
        name='Profile'
        component={Profile}
      />
        <Screen 
        name='PasswordChangePage'
        component={PasswordChangePage}
      />
    </Navigator>
  )
}