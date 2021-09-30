import React, { useContext } from 'react';
import { Button, Image, StatusBar, StyleSheet } from 'react-native';
import { AuthContext } from '../../config/AuthProvider';
import Text from '../../components/Text';
import { useNavigation } from '@react-navigation/core';

import { 
    Container, 
    CustomButton, 
    CustomButtonText,
    ServicesArea
} from './styles';

export default () => {

    const { user, logout } = useContext(AuthContext);
    const navigation = useNavigation();

    return (
        <Container>
            <StatusBar
                animated={true}
                barStyle='dark-content'/>
            <Image style={styles.image} source={require('../../assets/logo.png')} />
            <Text message={'Serviços'}/>
            <ServicesArea>
                <CustomButton onPress={ () => navigation.navigate('ScheduleService')}>
                    <CustomButtonText>Barba</CustomButtonText>
                </CustomButton>
                <CustomButton>
                    <CustomButtonText>Cabelo</CustomButtonText>
                </CustomButton>
            </ServicesArea>
            {/* <Text>{user?.email}</Text> */}
            {/* <Button title="logout" onPress={ () => logout()}></Button> */}
        </Container>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 100,
        marginBottom: 50
    }
});