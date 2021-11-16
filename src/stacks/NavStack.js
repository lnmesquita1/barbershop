import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import ScheduleService from '../screens/ScheduleService';
import ProfessionalsList from '../screens/ProfessionalsList';
import Schedule from '../screens/Schedule';
import ServicosList from '../screens/ServicosList';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="Home"
    >
        <Stack.Screen options={{
      headerShown: false,
    }} name="Home" component={Home}/>
        <Stack.Screen 
          name="ServicosList" 
          component={ServicosList}
          options={() => ({
            headerTitle: 'Escolha um serviço'
          })}/>
        <Stack.Screen name="ScheduleService" component={ScheduleService}/>
        <Stack.Screen
        name="ProfessionalsList"
        component={ProfessionalsList}
        options={() => ({
          headerTitle: 'Escolha um profissional'
        })} />
        <Stack.Screen
        name="Schedule"
        component={Schedule}
        options={() => ({
          headerTitle: 'Escolha um horário',
          headerBackTitle: 'Voltar'
        })} />
    </Stack.Navigator>
)