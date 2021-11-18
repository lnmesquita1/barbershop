import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { ProfessionalsContext } from '../../config/ProfessionalsProvider';
import { 
    InputArea, 
    CustomButton, 
    CustomButtonText
} from './styles';

import SignInput from '../../components/SignInput';
import Loading from '../../components/Loading';

export default props => {
  const navigation = useNavigation();
  const navigateAction = () => navigation.navigate('ProfessionalsListAdmin');
  useEffect(() => {
    const params = props.route.params;
    if (params) {
      setProfessionalName(params.name);
      setLastNameField(params.lastName);
      setPhoneNumberField(params.phoneNumber);
      setEmailField(params.email)
    }
  }, []);


  const [professionalName, setProfessionalName] = useState('');
  const [lastName, setLastNameField] = useState('');
  const [phoneNumber, setPhoneNumberField] = useState('');
  const [emailField, setEmailField] = useState('');
  const { loading, createProfessional, updateProfessional } = useContext(ProfessionalsContext);

  const createOrUpdateProfessional = () => {
    if (props.route.params?.key) {
      return updateProfessional(
        props.route.params?.key, emailField, props.route.params.oldEmail, professionalName, lastName, phoneNumber, navigateAction);
    } else {
      return createProfessional(
        emailField, professionalName, lastName, phoneNumber, navigateAction);
    }
  }
 
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
            placeholder='Nome do profissional'
            value={professionalName}
            onChangeText={t => setProfessionalName(t)}
          />
          <SignInput
            placeholder='Sobrenome'
            value={lastName}
            onChangeText={t => setLastNameField(t)}
          />
          <SignInput
            placeholder='Telefone'
            value={phoneNumber}
            onChangeText={t => setPhoneNumberField(t)}
          />
          <SignInput
            placeholder='Email'
            value={emailField}
            onChangeText={t => setEmailField(t)}
          />
          <CustomButton onPress={async () => await createOrUpdateProfessional()}>
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
