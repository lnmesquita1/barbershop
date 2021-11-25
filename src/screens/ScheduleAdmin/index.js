import React, { useEffect, useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import CardDay from '../../components/CardDay';
import { Icon } from 'react-native-elements';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { 
  getDataExtenso, 
  generateTimes, 
  toStringDate,
  isToday,
  previousDay,
  nextDay,
  arrowLeftColor,
  getDayOfWeek
} from '../../shared/ScheduleUtil';
import { ScheduleContext } from '../../config/ScheduleProvider';
import { 
  Container,
  ContainerCards,
  Header,
  HeaderMidleArea,
  DayOfWeek,
  DayOfMonth
} from './styles';
import { Alert } from 'react-native';
import Loading from '../../components/Loading';

const startHours = 9;
const startMinutes = 0;
const endHours = 19;
const endMinutes = 0;
const timeIntervalHours = 0;
const timeIntervalMinutes = 30;

export default props => {
  const navigation = useNavigation();
  const { loading, listSchedule } = useContext(ScheduleContext);
  const [ selectedDay, setSelectedDay ] = useState(new Date());
  const [ horarios, setHorarios ] = useState([]);

  useFonts({
    Roboto_400Regular,
  });

  useEffect(() => {
    const params = props.route.params;
    props.navigation.addListener('focus', () => {
      list(params.professionalData.professionalId, selectedDay);
    });
  }, []);

  const list = (professionalId, selectedDay) => {
    return Promise.resolve(listSchedule(professionalId, toStringDate(selectedDay))).then(schedules => {
      setHorarios(generateTimes(
        startHours, 
        startMinutes, 
        endHours, 
        endMinutes, 
        timeIntervalHours, 
        timeIntervalMinutes,
        schedules,
        selectedDay
      ));
    });
  }

  const setPreviousDay = async () => {
    if (!isToday(selectedDay)) {
      const previous = previousDay(selectedDay);
      setSelectedDay(previous);
      list(props.route.params.professionalData.professionalId, previous);
    }
  }

  const setNextDay = async () => {
    const next = nextDay(selectedDay);
    setSelectedDay(next);
    list(props.route.params.professionalData.professionalId, next);
  }

  const cardPress = (horario) => {
    switch (horario.status) {
      case 'Disponível':
        return schedule(horario);
      case 'Reservado':
        return readScheduledTime(horario);
      default:
        return () => {};
    }
  }

  const schedule = (horario) => navigation.navigate('ServicosList', {
    professionalData: props.route.params.professionalData,
    time: horario.time,
    selectedDay: toStringDate(selectedDay),
    navigateTo: 'ScheduleCostumerAdmin'
  });

  const readScheduledTime = (horario) => {
    Alert.alert(
      "Agendamento",
      `Nome do cliente: ${horario.username} ${horario.userLastName ? horario.userLastName : ''} \n Hora: ${horario.time} \n Serviço: ${horario.serviceName}`,
      [
        { text: "Ok", onPress: () => {} }
      ]
    );
  }

  if (loading) {
    return <Loading />;
  } else {
    return (
      <Container>
        <Header>
          <Icon
            onPress={ () => setPreviousDay()}
            style={{marginLeft: 20}}
            name='arrow-left'
            type='font-awesome'
            color={arrowLeftColor(selectedDay)} />
          <HeaderMidleArea>
            <DayOfMonth style={{ fontFamily: 'Roboto_400Regular' }}>{getDataExtenso(selectedDay)}</DayOfMonth>
            <DayOfWeek style={{ fontFamily: 'Roboto_400Regular' }}>{getDayOfWeek(selectedDay)}</DayOfWeek>
          </HeaderMidleArea>
          <Icon
            onPress={ () => setNextDay()}
            style={{marginRight: 20}}
            name='arrow-right'
            type='font-awesome'
            color='#323232' />
        </Header>
        <ContainerCards>
          {horarios.map((horario, index) => {
            return (
              <CardDay 
                onPressAction={ () => cardPress(horario)} 
                key={index} 
                time={horario.time} 
                status={horario.status}
                color={horario.color} />
            );
          })}
        </ContainerCards>
      </Container>
    );
  }
}
