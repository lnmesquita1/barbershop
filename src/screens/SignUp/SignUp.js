import React, { useState, useContext } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import {
	InputArea,
	CustomButton,
	CustomButtonText
} from './styles';

import SignInput from '../../components/SignInput';

export default () => {
	const [firstName, setFirstNameField] = useState('');
	const [lastName, setLastNameField] = useState('');
	const [phoneNumber, setPhoneNumberField] = useState('');
	const navigation = useNavigation();

	const navigateToCreateLogin = () => {
		if (firstName === '' || lastName === '' || phoneNumber === '' ) {
			Alert.alert('Verifique os campos', 'Preencha todos os campos.');
		} else {
			navigation.navigate('SignUpCreateLogin', {
				firstName,
				lastName,
				phoneNumber
			});
		}
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}>
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
					numeric={true}
					onChangeText={t => setPhoneNumberField(t)}
				/>				
				<CustomButton onPress={() => navigateToCreateLogin()}>
					<CustomButtonText>Próximo</CustomButtonText>
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