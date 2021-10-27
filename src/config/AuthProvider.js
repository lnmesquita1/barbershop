import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import Firebase, { database }  from '../config/firebase';
import MESSAGES from '../constants/validations-messages';

export const AuthContext = createContext();
const auth = Firebase.auth();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

	const getUserDetailsById = async (userId) => {
		const dbRef = database.ref();
		await dbRef.child("users").child(userId).get().then((snapshot) => {
			if (snapshot.exists()) {
				setUserDetails(snapshot.val());
			} else {
				setUserDetails(null);
			}
		}).catch((error) => {
			console.error(error);
			setUserDetails(null);
		});
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				userDetails,
				setUserDetails,
				loading,
				login: async (email, password) => {
					try {
						setLoading(true);
						await auth.signInWithEmailAndPassword(email, password).then(async (userCredential) => {
							await getUserDetailsById(userCredential.user.uid);
							setLoading(false);
						}).catch(error => {
							if (error.code.includes('user-not-found')) {
								Alert.alert('Erro no login', MESSAGES.USER_NOT_FOUND);
							} else if (error.code.includes('wrong-password')) {
								Alert.alert('Erro no login', MESSAGES.WRONG_PASSWORD);
							} else if (error.code.includes('auth/invalid-email')) {
								Alert.alert('Erro no login', MESSAGES.INVALID_EMAIL)
							}
							setLoading(false);
						})
					} catch (e) {
						console.warn(e);
					}
				},
				register: (email, password, confirmPasswordField, name, lastName, phoneNumber) => {
					setLoading(true);
					try {
						if (!(password == confirmPasswordField)) {
							Alert.alert('Erro no cadastro', MESSAGES.PASSWORD_DONT_MATCH);
							setLoading(false);
						} else {
							auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
								database.ref('users/' + userCredential.user.uid).set({
									username: name,
									lastName: lastName,
									phoneNumber: phoneNumber
								});
								getUserDetailsById(userCredential.user.uid);
								setLoading(false);
							}).catch(error => {
								if (error.code.includes('invalid-email')) {
									Alert.alert('Erro no cadastro', MESSAGES.INVALID_EMAIL);
								} else if (error.code.includes('weak-password')) {
									Alert.alert('Erro no cadastro', MESSAGES.WEAK_PASSWORD);
								}
								setLoading(false);
							})
						}
					} catch (e) {
						console.warn(e);
					}
				},
				logout: async () => {
					setLoading(true);
					try {
						await auth.signOut().then(() => {
							setLoading(false);
						});
						setUserDetails(null);
					} catch (e) {
						console.log(e);
						setLoading(false);
					}
				}
			}}>
			{props.children}
		</AuthContext.Provider>
    )
}

export default AuthProvider;