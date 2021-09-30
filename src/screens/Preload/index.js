import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useContext } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container, LoadingIcon } from './styles';
import { AuthContext } from '../../config/AuthProvider';

export default () => {

    const { getData } = useContext(AuthContext);

    const navigation = useNavigation();

    useEffect(() => {
        //getData('name/');
        navigation.navigate('SignIn');
    }, []);

    return (
        <Container>
            <Image style={styles.image} source={require('../../assets/logo.png')} />
            <LoadingIcon size="large" color="#000"></LoadingIcon>
        </Container>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 310,
    }
});