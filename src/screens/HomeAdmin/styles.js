import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #FFF;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const ServicesArea = styled.View`
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
    margin-bottom: 15px;
`;
export const CustomButtonText = styled.Text`
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
`;