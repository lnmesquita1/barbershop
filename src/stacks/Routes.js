import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Firebase from '../config/firebase';

import MainStack from './MainStack';
import NavStack from './NavStack';
import AdminStack from './AdminStack';
import AuthProvider, { AuthContext } from './../config/AuthProvider';
import styled from 'styled-components/native';
import ServicesProvider from '../config/ServicesProvider';
import { View } from 'react-native';

const auth = Firebase.auth();

const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export default () => {

  const {user, setUser, userDetails, loading} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = async (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  const render = () => {
    if (loading) {
      return <Container>
        <LoadingIcon size="large" color="#f1c40f"/>
      </Container>
    } else {
      if (userDetails) {
        if (userDetails.admin) {
                    return <ServicesProvider>
                    <AdminStack/>
                  </ServicesProvider>;
        }
        return <NavStack/>;
      } else {
        return <MainStack/>;
      }
    }
  }
  return (
    <NavigationContainer>
      { render() }
    </NavigationContainer>
  )
}