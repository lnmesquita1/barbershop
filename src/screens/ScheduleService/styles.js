import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #FFF;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const CalendarArea = styled.View`
    padding: 40px;
    width: 100%;
`;

export const TimePickerArea = styled.View`
    padding: 40px;
    width: 100%;
`;

export const TimePicker = styled.View`
    height: 50px
    width: 100%;
    border: 1px solid #323232;
    border-radius: 10px;
    flex-direction: row;
    align-items: center;
`;

export const TimeText = styled.Text`
    display: flex;
    width: 15px;
    height: 15px;
    margin-right: 10px;
`;

export const DateInfo = styled.View`
    flex-direction: row;
`;

export const DatePrevArea = styled.TouchableOpacity`
    flex: 1;
    justify-content: flex-end;
    align-items: flex-end;
`;

export const DateTitleArea = styled.View`
    width: 140px;
    justify-content: center;
    align-items: center;
`;

export const DateTitle = styled.Text`
    font-size: 17px;
    font-weight: bold;
    color: #000000;
`;


export const DateNextArea = styled.TouchableOpacity`
    flex: 1;
    align-items: flex-start;
`;
