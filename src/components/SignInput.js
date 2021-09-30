import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const InputArea = styled.View`
    width: 100%;
    height: 40px;
    flex-direction: row;
    border-radius: 30px;
    align-items: center;
    background: #F7F7F7;
    box-shadow: -4px 4px 18px rgba(0, 0, 0, 0.09);
    border-radius: 10px;
    margin-bottom: 15px;
`;

const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    margin-left: 10px;
`;
export default props => {
    return (
        <InputArea>
            <Input 
                placeholder={props.placeholder}
                placeholderTextColor="#969696"
                value={props.value}
                onChangeText={props.onChangeText}
                secureTextEntry={props.password}
                />
        </InputArea>
    );
}