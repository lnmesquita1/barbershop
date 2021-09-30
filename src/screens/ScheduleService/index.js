import React, { useContext } from 'react';
import { Button, Image, StatusBar, StyleSheet } from 'react-native';
import Text from '../../components/Text';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import { LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['pt'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan','Fev.','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['Dom','Seg', 'Ter', 'Qua','Qui','Sex','Sab'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt';

import { 
    Container,
    CalendarArea,
    TimePickerArea,
    TimePicker,
    TimeText,
    DateInfo,
    DateNextArea,
    DatePrevArea,
    DateTitleArea,
    DateTitle
} from './styles';

export default () => {

    return (
        <Container>
            <CalendarArea>
                {/* <Calendar/>  */}
                <DateInfo>
                    <DatePrevArea>
                        <Button title='<'></Button>
                    </DatePrevArea>
                    <DateTitleArea>
                        <DateTitle>Setembro 2021</DateTitle>
                    </DateTitleArea>
                    <DateNextArea>
                        <Button title='>'></Button>
                    </DateNextArea>
                </DateInfo>
            </CalendarArea>
            <TimePickerArea>
                <TimePicker>
                    <TimeText>
                        teste
                    </TimeText>
                </TimePicker>
            </TimePickerArea>
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