import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const MessageArea = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-bottom: 15px;
`;
export const Message = styled.Text`
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    color: #969696;
`;

export default props => {
    return (
        <Container>
            <MessageArea>
                <Message>{props.message}</Message>
            </MessageArea>
        </Container>
    );
}