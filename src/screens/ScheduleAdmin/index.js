import React, { useState } from 'react';
import CardDay from '../../components/CardDay';
import { Icon } from 'react-native-elements';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import { 
  Container,
  ContainerCards,
  Header,
  HeaderMidleArea,
  DayOfWeek,
  DayOfMonth
} from './styles';

const horarios = [
  { time: '09:00', status: 'Reservado'},
  { time: '09:30', status: 'Reservado'},
  { time: '10:00', status: 'Reservado'},
  { time: '10:30', status: 'Reservado'},
  { time: '11:00', status: 'Reservado'},
  { time: '11:30', status: 'Reservado'},
  { time: '12:00', status: 'Reservado'},
  { time: '12:30', status: 'Reservado'},
  { time: '13:00', status: 'Reservado'},
  { time: '13:30', status: 'Reservado'},
  { time: '14:00', status: 'Reservado'},
  { time: '14:30', status: 'Reservado'},
  { time: '15:00', status: 'Reservado'},
  { time: '15:30', status: 'Reservado'},
]
export default () => {
  const timeInterval = '00:30';
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Container>
        <Header>
          <Icon
            style={{marginLeft: 20}}
            name='arrow-left'
            type='font-awesome'
            color='black' />
          <HeaderMidleArea>
            <DayOfMonth style={{ fontFamily: 'Roboto_400Regular' }}>05 de novembro</DayOfMonth>
            <DayOfWeek style={{ fontFamily: 'Roboto_400Regular' }}>Hoje</DayOfWeek>
          </HeaderMidleArea>
          <Icon
            style={{marginRight: 20}}
            name='arrow-right'
            type='font-awesome'
            color='black' />
        </Header>
        <ContainerCards>
          {horarios.map((horario, index) => {
            return (
              <CardDay key={index} time={horario.time} status={horario.status} />
            );
          })}
        </ContainerCards>
      </Container>
    );
  }
}
