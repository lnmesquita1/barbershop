import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Firebase from '../config/firebase';

import MainStack from './MainStack';
import NavStack from './NavStack';
import AdminStack from './AdminStack';
import { AuthContext } from './../config/AuthProvider';
import ServicesProvider from '../config/ServicesProvider';
import ProfessionalsProvider from '../config/ProfessionalsProvider';
import Loading from '../components/Loading';
const auth = Firebase.auth();

export default () => {

  const { setUser, userDetails, loading} = useContext(AuthContext);
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
      return <Loading/>
    } else {
      if (userDetails) {
        if (userDetails.admin) {
          return <AdminStack />
        }
        return <NavStack/>;
      } else {
        return <MainStack/>;
      }
    }
  }
  return (
    <NavigationContainer>
      <ServicesProvider>
        <ProfessionalsProvider>
          {render()}
        </ProfessionalsProvider>
      </ServicesProvider>
    </NavigationContainer>
  )
}