import React, { useContext } from 'react';
import { Button, Image, StatusBar, StyleSheet } from 'react-native';
import { AuthContext } from '../../config/AuthProvider';
import Text from '../../components/Text';

import { 
    Container, 
    CustomButton, 
    CustomButtonText,
    ServicesArea
} from './styles';
import { useNavigation } from '@react-navigation/core';

export default () => {

    const { user, logout } = useContext(AuthContext);
    const navigation = useNavigation();

    return (
        <Container>
            <StatusBar
                animated={true}
                barStyle='dark-content'/>
            <Image style={styles.image} source={require('../../assets/logo.png')} />
            <Text message={'Homee'}/>
            <ServicesArea>
                <CustomButton onPress={() => navigation.navigate('Servicos') }>
                    <CustomButtonText>Serviços</CustomButtonText>
                </CustomButton>
                <CustomButton>
                    <CustomButtonText>Quem somos</CustomButtonText>
                </CustomButton>
            </ServicesArea>
            {/* <Text>{user?.email}</Text> */}
            <Button title="logout" onPress={ () => logout()}></Button>
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