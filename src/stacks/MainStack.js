import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp/SignUp';
import SignUpCreateLogin from '../screens/SignUp/SignUpCreateLogin';

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
    }} name="SignIn" component={SignIn} />
    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={() => ({
        headerTitle: 'Insira seus dados',
        headerBackTitle: 'Voltar'
      })} />
    <Stack.Screen
      name="SignUpCreateLogin"
      component={SignUpCreateLogin}
      options={() => ({
        headerTitle: 'Crie seu usuário',
        headerBackTitle: 'Voltar'
      })} />
  </Stack.Navigator>
)