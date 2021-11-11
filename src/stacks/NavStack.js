import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Servicos from '../screens/Servicos';
import ScheduleService from '../screens/ScheduleService';
import ProfessionalsList from '../screens/ProfessionalsList';
import Schedule from '../screens/Schedule';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="Home"
    >
        <Stack.Screen options={{
      headerShown: false,
    }} name="Home" component={Home}/>
        <Stack.Screen name="Servicos" component={Servicos}/>
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