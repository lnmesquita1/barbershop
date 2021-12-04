import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Text, Image, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { AuthContext } from '../../config/AuthProvider';
import { 
    Container, 
    InputArea, 
    CustomButton, 
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold 
} from './styles';

import SignInput from '../../components/SignInput';
import background from '../../assets/background.jpg';
import SocialMediaLogin from '../../components/SocialMediaLogin';

export default () => {

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const { login } = useContext(AuthContext);
    const navigation = useNavigation();

    return (
        
        <Container>
             <StatusBar
                animated={true}
                barStyle='dark-content'/>
            {/* <ImageBackground source={background} resizeMode="cover" style={styles.background}> */}
                <Image style={styles.image} source={require('../../assets/logo.png')} />
                <InputArea>
                    <SignInput
                        placeholder='Usuário'
                        value={emailField}
                        onChangeText={t => setEmailField(t)}
                    />
                    <SignInput
                        placeholder='Senha'
                        value={passwordField}
                        onChangeText={t => setPasswordField(t)}
                        password={true}
                    />
                    <CustomButton onPress={async () => await login(emailField, passwordField)}>
                        <CustomButtonText>Login</CustomButtonText>
                    </CustomButton>
                </InputArea>

                {/* <Image style={styles.mustache} source={require('../../assets/mustache.png')} /> */}
                <SignMessageButton onPress={() => navigation.navigate('SignUp')}>
                    <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                    <SignMessageButtonTextBold> Cadastre-se</SignMessageButtonTextBold>
                </SignMessageButton>
            {/* </ImageBackground> */}
        </Container>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 100,
    },
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, .9)'
    },
});