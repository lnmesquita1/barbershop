import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/core';
import styled from 'styled-components/native';
import { Container } from './styles';
import Tabs from '../../components/Tabs';
import AppLoading from 'expo-app-loading';
import { AuthContext } from '../../config/AuthProvider';
import { Icon } from 'react-native-elements';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Image, StyleSheet } from 'react-native';

export const ContainerDashboard = styled.View`
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
`;

export const ContainerImage = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
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

export default () => {
  const iconColor = 'black';
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);

  const tabProperties = [
    {
      iconName: 'calendar',
      iconColor: '#fff',
      text: 'Agendar',
      navigateAction: () => { navigation.navigate('ProfessionalsList') }
    },
    {
      iconName: 'calendar-check',
      iconColor: '#fff',
      text: 'Meus agendamentos',
      textStyle: { fontSize: 11 },
      navigateAction: () => {}
    },
    {
      iconName: 'user-edit',
      iconColor: '#fff',
      text: 'Alterar cadastro',
      navigateAction: () => {}
    },
    {
      iconName: 'sign-out-alt',
      iconColor: '#fff',
      text: 'Sair',
      navigateAction: () => logout()
    },
    
  ];

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
          </HeaderArea>
        </ContainerDashboard>
        <ContainerImage>
          <Image style={styles.image} source={require('../../assets/logo.png')} />
        </ContainerImage>
        <Tabs tabProperties={tabProperties}></Tabs>
      </Container>
    )
  }

}

const styles = StyleSheet.create({
  image: {
      width: 130,
      height: 210,
  }
});
