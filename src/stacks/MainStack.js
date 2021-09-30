import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="SignIn"
    >
        {/* <Stack.Screen options={{
      headerShown: false,
    }} name="Preload" component={Preload}/> */}
        <Stack.Screen options={{
      headerShown: false,
    }} name="SignIn" component={SignIn}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
    </Stack.Navigator>
)