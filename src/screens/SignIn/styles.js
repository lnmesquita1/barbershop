import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const InputArea = styled.View`
    padding: 40px;
    width: 100%;
`;

export const CustomButton = styled.TouchableOpacity`
    width: 133px;
    height: 46px;
    background: #323232;
    box-shadow: -4px 4px 18px rgba(0, 0, 0, 0.09);
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
export const CustomButtonText = styled.Text`
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
`;

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-bottom: 150px;
`;
export const SignMessageButtonText = styled.Text`
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    color: #969696;
`;
export const SignMessageButtonTextBold = styled.Text`
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    color: #000000;
`;
