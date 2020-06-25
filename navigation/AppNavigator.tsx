import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import PlantsOverviewScreen from '../screens/PlantsOverviewScreen'
import PlantDetailScreen from '../screens/PlantDetailScreen'
import PlantGraphScreen from '../screens/PlantGraphScreen'
import BarCodeScannerScreen from '../screens/BarCodeScannerScreen'
import AddNewPlantScreen from '../screens/AddNewPlantScreen'
import NewPlantFormScreen from '../screens/NewPlantFormScreen'
import PlantNotesScreen from '../screens/PlantNotesScreen'
import LoginScreen from '../screens/LoginScreen'
import Colors from '../constants/Colors'

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.background,
  },
  headerTitleStyle: {
    fontFamily: 'roboto-regular',
  },
  headerTintColor: Colors.primaryText,
}

const StackAppNavigator = createStackNavigator()

export function AppNavigator() {
  return (
    <StackAppNavigator.Navigator screenOptions={defaultNavOptions} initialRouteName="Login">
      <StackAppNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
          cardStyle: {
            backgroundColor: Colors.primaryText,
          },
        }}
      />
      <StackAppNavigator.Screen
        name="PlantsOverview"
        component={PlantsOverviewScreen}
        options={{
          headerTitle: 'Your plants',
          headerTitleStyle: {
            ...defaultNavOptions.headerTitleStyle,
            alignSelf: 'center',
            fontFamily: 'roboto-regular',
          },
        }}
      />
      <StackAppNavigator.Screen
        name="PlantDetail"
        component={PlantDetailScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
          cardStyle: {
            backgroundColor: Colors.background,
          },
        }}
      />
      <StackAppNavigator.Screen
        name="PlantGraph"
        component={PlantGraphScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
          cardStyle: {
            backgroundColor: Colors.background,
          },
        }}
      />
      <StackAppNavigator.Screen
        name="AddNewPlant"
        component={AddNewPlantScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
          cardStyle: {
            backgroundColor: Colors.background,
          },
        }}
      />
      <StackAppNavigator.Screen
        name="BarCodeScanner"
        component={BarCodeScannerScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
          cardStyle: {
            backgroundColor: Colors.background,
          },
        }}
      />
      <StackAppNavigator.Screen
        name="NewPlantForm"
        component={NewPlantFormScreen}
        options={{
          headerTitle: 'Add Details About New Plant',
        }}
      />
      <StackAppNavigator.Screen
        name="PlantNotes"
        component={PlantNotesScreen}
        options={{
          headerTitle: 'Details About Plant',
        }}
      />
    </StackAppNavigator.Navigator>
  )
}
