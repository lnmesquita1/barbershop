import React from 'react';
import { Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Text from './Text';

export const Container = styled.View``;

export const SocialMediaArea = styled.View`
    padding-left: 40px;
    padding-right: 40px;
    width: 100%;
    margin-bottom: 10px;
    flex-direction: row;
    align-items: center;
`;

export const SocialMediaButton = styled.TouchableOpacity`
    height: 46px;
    background: #323232;
    border-radius: 10px;
    width: 31%;
    margin-bottom: 15px;
    flex-wrap: wrap;
    align-content: center
    justify-content: center;
    margin: 0 6px;
`;

export default props => {
    return (
        <Container>
            <Text message={'- Ou faça o login com -'}/>
            <SocialMediaArea>
                <SocialMediaButton>
                    <Image style={styles.imageGmail} source={require('../assets/gmail.png')} />
                </SocialMediaButton>
                <SocialMediaButton>
                    <Image style={styles.image} source={require('../assets/microsoft.png')} />
                </SocialMediaButton>
                <SocialMediaButton>
                    <Image style={styles.image} source={require('../assets/facebook.png')} />
                </SocialMediaButton>
            </SocialMediaArea>
        </Container>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 28,
        height: 28,
    },
    imageGmail: {
        width: 28,
        height: 31,
    }
});