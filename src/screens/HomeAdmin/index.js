import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Container } from './styles';
import Tabs from '../../components/Tabs';
import LineChart from '../../components/charts/LineChart';
import Modal from '../../components/Modal';
import Card from '../../components/Card';
import { Icon } from 'react-native-elements';
import AppLoading from 'expo-app-loading';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';

const iconColor = 'black';
const weekAttendances = [8, 10, 15, 9, 12, 19];
const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

export const ContainerDashboard = styled.View`
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
`;

export const HeaderArea = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const WelcomeMessage = styled.Text`
  display: flex;
  line-height: 20px;
  margin-right: auto;
  text-transform: uppercase;
`;

export const RevenueTitle = styled.Text`
  display: flex;
  line-height: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 13px;
  margin-top: 20px;
`;

export const RevenueValue = styled.Text`
  font-size: 37px;
  line-height: 43px;
  text-transform: uppercase;
  margin-top: 5px;
`;

export default () => {
  const [modalVisible, setModalVisible] = useState(false);
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Container>
        <ContainerDashboard>
          <HeaderArea>
            <WelcomeMessage style={{ fontFamily: 'Roboto_400Regular', fontSize: 17 }}>Bem vindo, Lucas</WelcomeMessage>
            <Icon name='cog' type='font-awesome' color={iconColor} />
          </HeaderArea>
          <RevenueTitle>Saldo</RevenueTitle>
          <RevenueValue>R$ 3650,00</RevenueValue>
          <Card
            title='Atendimentos na semana'
            titleValue={weekAttendances.reduce((accumulator, a) => { return accumulator + a }, 0)}
            onPressAction={() => { setModalVisible(true); }}
          >
            <LineChart
              labels={daysOfWeek}
              data={weekAttendances}
            />
          </Card>
          <Modal
            title='Teste modal'
            modalVisible={modalVisible}
            onRequestClose={() => {setModalVisible(!modalVisible);}}
            onHideModal={() => {setModalVisible(!modalVisible);}}
            hideModalText='Fechar modal'
          />
        </ContainerDashboard>
        <Tabs></Tabs>
      </Container>
    )
  }


}
