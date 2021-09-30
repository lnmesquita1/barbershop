import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Servicos from '../screens/Servicos';
import ScheduleService from '../screens/ScheduleService';

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
    </Stack.Navigator>
)