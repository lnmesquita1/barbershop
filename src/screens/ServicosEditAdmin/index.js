import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, ImageBackground, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { TimePicker } from 'react-native-simple-time-picker';
import { ServicesContext } from '../../config/ServicesProvider';
import { 
    Container, 
    InputArea, 
    CustomButton, 
    CustomButtonText,
    TitleTime
} from './styles';

import SignInput from '../../components/SignInput';

export default props => {
  useEffect(() => {
    const params = props.route.params;
    if (params) {
      setServiceName(params.serviceName);
      setServiceValue(params.serviceValue);
      setHours(params.serviceTimeHours);
      setMinutes(params.serviceTimeMinutes);
    }
}, []);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [serviceName, setServiceName] = useState('');
  const [serviceValue, setServiceValue] = useState('');

  const { createService } = useContext(ServicesContext);

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <StatusBar
        animated={true}
        barStyle='dark-content' />
      <InputArea>
        <SignInput
          placeholder='Nome do serviço'
          value={serviceName}
          onChangeText={t => setServiceName(t)}
        />
        <TitleTime>Tempo do serviço:</TitleTime>
        <TimePicker
          value={{ hours, minutes }}
          onChange={value => {
            setHours(value.hours);
            setMinutes(value.minutes);
          }}
          hoursUnit="hrs"
          minutesUnit="min"
        />
        <SignInput
          placeholder='Valor do serviço'
          value={serviceValue}
          onChangeText={t => setServiceValue(t)}
          numeric={true}
        />
        <CustomButton onPress={async () => await createService(props.route.params?.key, serviceName, hours, minutes, serviceValue, props.navigation)}>
          <CustomButtonText>Cadastrar</CustomButtonText>
        </CustomButton>
      </InputArea>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
});
