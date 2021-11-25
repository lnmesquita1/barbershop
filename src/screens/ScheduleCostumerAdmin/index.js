import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { ScheduleContext } from '../../config/ScheduleProvider';
import { 
    InputArea, 
    CustomButton, 
    CustomButtonText
} from './styles';

import SignInput from '../../components/SignInput';
import Loading from '../../components/Loading';

export default props => {
  const navigation = useNavigation();
  const { loading, scheduleByAdminOrProfessional } = useContext(ScheduleContext);
  const [ costumerName, setCostumerName ] = useState('');
  const [ professionalData, setProfessionalData ] = useState('');
  const [ serviceData, setServiceData ] = useState('');
  const [ time, setTime ] = useState('');
  const [ selectedDay, setSelectedDay ] = useState('');

  const schedule = () => {
    Promise.resolve(scheduleByAdminOrProfessional(professionalData, serviceData, costumerName, selectedDay, time)).then(() => {
      navigation.navigate('ScheduleAdmin', {
        professionalData
      });
    });
  }

  useEffect(() => {
    const params = props.route.params;
    if (params) {
      setProfessionalData(params.professionalData);
      setServiceData(params.serviceData);
      setTime(params.time);
      setSelectedDay(params.selectedDay);
    }
  }, []);

  if (loading) {
    return <Loading/>
  } else {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        <StatusBar
          animated={true}
          barStyle='dark-content' />
        <InputArea>
          <SignInput
            placeholder='Nome do cliente'
            value={costumerName}
            onChangeText={t => setCostumerName(t)}
          />
          <CustomButton onPress={ () => schedule() }>
            <CustomButtonText>Cadastrar</CustomButtonText>
          </CustomButton>
        </InputArea>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
});
