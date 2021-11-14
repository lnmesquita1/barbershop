import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  horizontal: false,
})`
  padding: 20px;
`;

export const ContainerCards = styled.View`
  width: 100%;
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
`;

export const Header = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
`;

export const HeaderMidleArea = styled.View`
  align-items: center;
`;

export const DayOfWeek = styled.Text`
  color: black;
  font-size: 20px;
`;

export const DayOfMonth = styled.Text`
  color: black;
  font-size: 18px;
`;