import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { ProfessionalsContext } from '../../config/ProfessionalsProvider';
import { 
    InputArea, 
    CustomButton, 
    CustomButtonText
} from './styles';

import SignInput from '../../components/SignInput';

export default props => {
  useEffect(() => {
    const params = props.route.params;
    if (params) {
      setProfessionalName(params.professionalName);
    }
}, []);

  const [professionalName, setProfessionalName] = useState('');
  const { createProfessional } = useContext(ProfessionalsContext);

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
        <CustomButton onPress={async () => await createProfessional(props.route.params?.key, professionalName, props.navigation)}>
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
