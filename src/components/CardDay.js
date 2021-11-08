import React from 'react';
import styled from 'styled-components/native';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';

export const CardDay = styled.TouchableOpacity`
  flex: 0 1 21%;
  height: 90px;
  background: #FFFFFF;
  border-radius: 15px;
  box-shadow: -4px 4px 15px rgba(0, 0, 0, 0.2);
  justify-content: center;
  align-items: center;
  margin: 2%;
`;

export const Time = styled.Text`
  font-size: 20px;
  letter-spacing: 1px;
`;

export const Status = styled.Text`
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 1px;
`;

export default props => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <CardDay>
        <Time style={{ fontFamily: 'Roboto_400Regular' }}>{props.time}</Time>
        <Status style={{ fontFamily: 'Roboto_400Regular' }}>{props.status}</Status>
      </CardDay>
    );
  }
};