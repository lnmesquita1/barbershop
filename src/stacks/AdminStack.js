import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements'

import HomeAdmin from '../screens/HomeAdmin';
import ServicosListAdmin from '../screens/ServicosListAdmin';
import ServicosEditAdmin from '../screens/ServicosEditAdmin';
import { Button } from 'react-native';
import styled from 'styled-components/native';

export const AddArea = styled.View`
    margin-right: 12px;
`;

const Stack = createStackNavigator();

export default props => {
    return (
    
    <Stack.Navigator
        initialRouteName="HomeAdmin"
    >
        <Stack.Screen options={{
      headerShown: false,
      headerTitle: 'Dashboard'
    }} name="HomeAdmin" component={HomeAdmin}/>
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
                        onPress={() => navigation.navigate('ServicosEditAdmin') } />
                    </AddArea>
                )
            })}/>
        <Stack.Screen 
            name="ServicosEditAdmin" 
            component={ServicosEditAdmin} 
            options={{ headerTitle: 'Editar Serviço'}}/>
    </Stack.Navigator>
    )
}

