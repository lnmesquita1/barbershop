import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements'

import HomeAdmin from '../screens/HomeAdmin';
import ServicosListAdmin from '../screens/ServicosListAdmin';
import ServicosEditAdmin from '../screens/ServicosEditAdmin';
import ScheduleAdmin from '../screens/ScheduleAdmin';
import ProfessionalsListAdmin from '../screens/ProfessionalsListAdmin';
import ProfessionalsEditAdmin from '../screens/ProfessionalsEditAdmin';
import { ServicesContext } from './../config/ServicesProvider';
import styled from 'styled-components/native';
import Loading from '../components/Loading';

export const AddArea = styled.View`
    margin-right: 12px;
`;

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator initialRouteName="HomeAdmin">
      <Stack.Screen options={{
        headerShown: false,
        headerTitle: 'Dashboard'
      }} name="HomeAdmin" component={HomeAdmin} />
      <Stack.Screen
        name="ServicosListAdmin"
        component={ServicosListAdmin}
        options={({ navigation, route }) => ({
          headerTitle: 'Serviços',
          headerRight: () => (
            <AddArea>
              <Icon
                name='plus'
                type='font-awesome'
                color='#323232'
                onPress={() => navigation.navigate('ServicosEditAdmin')} />
            </AddArea>
          )
        })} />
      <Stack.Screen
        name="ScheduleAdmin"
        component={ScheduleAdmin}
        options={({ navigation, route }) => ({
          headerTitle: 'Agenda',
          headerRight: () => (
            <AddArea>
              <Icon
                name='cog'
                type='font-awesome'
                color='#323232'
                onPress={() => navigation.navigate('ServicosEditAdmin')} />
            </AddArea>
          )
        })} />
      <Stack.Screen
        name="ProfessionalsListAdmin"
        component={ProfessionalsListAdmin}
        options={({ navigation, route }) => ({
          headerTitle: 'Profissionais',
          headerRight: () => (
            <AddArea>
              <Icon
                name='plus'
                type='font-awesome'
                color='#323232'
                onPress={() => navigation.navigate('ProfessionalsEditAdmin')} />
            </AddArea>
          )
        })} />
      <Stack.Screen
        name="ProfessionalsEditAdmin"
        component={ProfessionalsEditAdmin}
        options={() => ({
          headerTitle: 'Editar Profissional'
        })} />
      <Stack.Screen
        name="ServicosEditAdmin"
        component={ServicosEditAdmin}
        options={{ headerTitle: 'Editar Serviço' }} />
    </Stack.Navigator>
  )
}

