import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { AuthContext } from '../../config/AuthProvider';
import { Alert } from 'react-native';
import {
	InputArea,
	CustomButton,
	CustomButtonText
} from './styles';

import SignInput from '../../components/SignInput';

export default props => {
	const [firstName, setFirstNameField] = useState('');
	const [lastName, setLastNameField] = useState('');
	const [phoneNumber, setPhoneNumberField] = useState('');
	const [emailField, setEmailField] = useState('');
	const [passwordField, setPasswordField] = useState('');
	const [confirmPasswordField, setConfirmPasswordField] = useState('');
	const { register, } = useContext(AuthContext);

	useEffect(() => {
		const params = props.route.params;
		setFirstNameField(params.firstName);
		setLastNameField(params.lastName);
		setPhoneNumberField(params.phoneNumber);
	}, []);

	const registerUser = () => {
		if (emailField === '' || passwordField === '' || confirmPasswordField === '' ) {
			Alert.alert('Verifique os campos', 'Preencha todos os campos.');
		} else {
			register(emailField, passwordField, confirmPasswordField, firstName, lastName, phoneNumber);
		}
	} 
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}>
			<InputArea>				
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
				<CustomButton onPress={() => registerUser()}>
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