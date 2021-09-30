import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Firebase from '../config/firebase';

import MainStack from './MainStack';
import NavStack from './NavStack';
import AdminStack from './AdminStack';
import AuthProvider, { AuthContext } from './../config/AuthProvider';

const auth = Firebase.auth();

export default () => {

  const {user, setUser, userDetails} = useContext(AuthContext);
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
    if (userDetails) {
      if (userDetails.admin) {
        return <AdminStack/>;
      }
      return <NavStack/>;
    } else {
      return <MainStack/>;
    }
  }
  return (
    <NavigationContainer>
      { render() }
    </NavigationContainer>
  )
}