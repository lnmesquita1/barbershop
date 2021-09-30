import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const InputArea = styled.View`
    padding-left: 40px;
    padding-right: 40px;
    width: 100%;
`;

export const SocialMediaArea = styled.View`
    padding-left: 40px;
    padding-right: 40px;
    width: 100%;
    margin-bottom: 10px;
    flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SocialMediaButton = styled.TouchableOpacity`
    height: 46px;
    background: #323232;
    border-radius: 10px;
    width: 95px;
    margin-bottom: 15px;
    flex-wrap: wrap;
    align-content: center
    justify-content: center;
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

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-bottom: 15px;
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
