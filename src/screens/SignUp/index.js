import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { AuthContext } from '../../config/AuthProvider';
import { 
    Container, 
    InputArea, 
    CustomButton, 
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
    SocialMediaArea,
    SocialMediaButton
} from './styles';

import SignInput from '../../components/SignInput';
import SocialMediaLogin from '../../components/SocialMediaLogin';
import background from '../../assets/background.jpg';

export default () => {
    const navigation = useNavigation();
    const [firstName, setFirstNameField] = useState('');
    const [lastName, setLastNameField] = useState('');
    const [phoneNumber, setPhoneNumberField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [confirmPasswordField, setConfirmPasswordField] = useState('');
    const { register, user } = useContext(AuthContext);

    return (
        <Container>
                <Image style={styles.logo} source={require('../../assets/logo.png')} />
                <SignMessageButton>
                    <SignMessageButtonText>Crie sua conta</SignMessageButtonText>
                </SignMessageButton>
                <InputArea>
                    <SignInput
                        placeholder='Nome'
                        value={firstName}
                        onChangeText={t => setFirstNameField(t)}
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
                    <SignInput
                        placeholder='Senha'
                        value={passwordField}
                        onChangeText={t => setPasswordField(t)}
                        password={true}
                    />
                    <SignInput
                        placeholder='Repetir senha'
                        value={confirmPasswordField}
                        onChangeText={t => setConfirmPasswordField(t)}
                        password={true}
                    />
                    <CustomButton onPress={ () => register(emailField, passwordField, confirmPasswordField, firstName, lastName, phoneNumber)}>
                        <CustomButtonText>Cadastrar</CustomButtonText>
                    </CustomButton>
                </InputArea>
                <SocialMediaLogin/>
        </Container>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 60,
        height: 100,
        marginBottom: 10
    },
    image: {
        width: 28,
        height: 28,
    },
    imageGmail: {
        width: 28,
        height: 31,
    },
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, .9)'
    },
});