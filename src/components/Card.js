import React from 'react';
import styled from 'styled-components/native';

export const Card = styled.View`
  background: #FFFFFF;
  height: 320px;
  width: 100%;
  border-radius: 20px;
  box-shadow: 0px 0px 10px #EEF0F3;
  padding-top: 20px;
  margin-top: 20px;
`;

export const CardTitle = styled.Text`
  display: flex;
  line-height: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 13px;
  margin-left: 20px;
`;

export const TitleValue = styled.Text`
  font-size: 37px;
  line-height: 43px;
  text-transform: uppercase;
  margin-left: 20px;
  margin-top: 5px;
`;

export default props => {
  return (
    <Card>
      <CardTitle onPress={props.onPressAction}>{props.title}</CardTitle>
      <TitleValue>{props.titleValue}</TitleValue>
        {props.children}
    </Card>
  );
};