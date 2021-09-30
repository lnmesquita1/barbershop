import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeAdmin from '../screens/HomeAdmin';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="HomeAdmin"
    >
        <Stack.Screen options={{
      headerShown: false,
    }} name="HomeAdmin" component={HomeAdmin}/>
    </Stack.Navigator>
)