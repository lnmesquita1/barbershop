import React, { useContext } from 'react';
import { Icon } from 'react-native-elements';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/core';
import { AuthContext } from '../config/AuthProvider';

const iconColor = '#fff';

export const Container = styled.View`
  height: 170px;
  margin-top: auto;
`;

export const TabsContainer = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: { paddingLeft: 10, paddingRight: 20 },
  showHorizontalScrollIndicator: false,
})``;

export const TabItem = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background: #323232;
  border-radius: 3px;
  margin-left: 10px;
  margin-top: 40px;
  padding: 10px;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid #323232;
  box-shadow: -4px 4px 18px rgba(0, 0, 0, 0.2);
`;

export const TabText = styled.Text`
  font-size: 13px;
  color: #fff;
`;

export default props => {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);

    return (
      <Container>
        <TabsContainer>
          <TabItem onPress={() => navigation.navigate('ScheduleAdmin')}>
            <Icon
              name='calendar'
              type='font-awesome'
              color={iconColor} />
            <TabText>Agenda</TabText>
          </TabItem>
          <TabItem onPress={() => navigation.navigate('ServicosListAdmin')}>
            <Icon
              name='cut'
              type='font-awesome'
              color={iconColor} />
            <TabText>Serviços</TabText>
          </TabItem>
          <TabItem>
            <Icon
              name='male'
              type='font-awesome'
              color={iconColor} />
            <TabText>Profissionais</TabText>
          </TabItem>
          <TabItem>
            <Icon
              name='address-card'
              type='font-awesome'
              color={iconColor} />
            <TabText>Clientes</TabText>
          </TabItem>
          <TabItem>
            <Icon
              name='shopping-cart'
              type='font-awesome'
              color={iconColor} />
            <TabText>Produtos</TabText>
          </TabItem>
          <TabItem>
            <Icon
              name='money'
              type='font-awesome'
              color={iconColor} />
            <TabText>Financeiro</TabText>
          </TabItem>
          <TabItem onPress={ () => logout()}>
            <Icon
              name='sign-out'
              type='font-awesome'
              color={iconColor} />
            <TabText>Sair</TabText>
          </TabItem>
        </TabsContainer>
      </Container>
    );
}