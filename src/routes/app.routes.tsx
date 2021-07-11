import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from '../screens/Home'
import { AppointmentDetails } from '../screens/AppointmentDetails'
import { AppointmentCreate } from '../screens/AppointmentCreate'

import { theme } from '../global/styles/theme'

const { Navigator, Screen } = createStackNavigator()

export function AppRoutes() {
  return (
    <Navigator
      headerMode="none" // stack-navigation adiciona por padrão a head, então isso remove.
      screenOptions={{ 
        cardStyle: { 
          backgroundColor: theme.colors.secondary100 // respeita o background aplicado.
        }
      }}
    >      
      <Screen // recebe 2 parâmetros e será a primeira screen que vai ser aberta.
        name="Home"
        component={Home} // component a ser renderizado
      />      
      <Screen
        name="AppointmentDetails"
        component={AppointmentDetails}
      />      
      <Screen
        name="AppointmentCreate"
        component={AppointmentCreate}
      />      
    </Navigator>
  )
}