import React, { useEffect, useContext, useState } from 'react';
import CardDay from '../../components/CardDay';
import { Icon } from 'react-native-elements';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { getDataExtenso, generateTimes, toStringDate } from '../../shared/ScheduleUtil';
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
  const { loading, schedule, listSchedule } = useContext(ScheduleContext);
  const [ selectedDay, setSelectedDay ] = useState(new Date());
  const [ horarios, setHorarios ] = useState([]);

  useFonts({
    Roboto_400Regular,
  });

  useEffect(() => {
    const params = props.route.params;
    list(params.professionalId, params.serviceId, selectedDay);
  }, []);

  const list = (professionalId, serviceId, selectedDay) => {
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

  const previousDay = async () => {
    if (!isToday()) {
      var day = new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate());
  
      var previousDay = new Date(day);
      previousDay.setDate(day.getDate() - 1);
      setSelectedDay(previousDay);
      list(props.route.params.professionalId, props.route.params.serviceId, previousDay);
    }
  }

  const nextDay = async () => {
    var day = new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate());

    var nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);
    setSelectedDay(nextDay);
    list(props.route.params.professionalId, props.route.params.serviceId, nextDay);
  }

  const arrowLeftColor = () => {
    if (isToday()) {
      return '#b5b5b5'
    }
    return '#323232'
  }

  const isToday = () => {
    const today = new Date();
    if (selectedDay.getFullYear() == today.getFullYear()
    && selectedDay.getMonth() == today.getMonth()
    && selectedDay.getDate() == today.getDate()) {
      return true;
    }
    return false;
  }

  const isTomorrow = () => {
    const today = new Date();
    if (selectedDay.getFullYear() == today.getFullYear()
    && selectedDay.getMonth() == today.getMonth()
    && selectedDay.getDate() == today.getDate()+1) {
      return true;
    }
    return false;
  }

  const getDayOfWeek = () => {
    const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const today = new Date();
    if (isToday()) {
      return 'Hoje';
    } else if (isTomorrow()) {
      return 'Amanhã';
    } else {
      return daysOfWeek[selectedDay.getDay()];
    }
  }

  const confirmSchedule = (professionalId, serviceId, time) => {
    Alert.alert(
      "Agendar horário",
      "Tem certeza que deseja agendar esse horário?",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel"
        },
        { text: "Sim", onPress: () => { 
          Promise.resolve(schedule(professionalId, serviceId, toStringDate(selectedDay), time)).then(() => {
            list(professionalId, serviceId, selectedDay);
          }) 
        }}
      ]
    );
  }

  const confirmScheduleAction = (status, professionalId, serviceId, time) => {
    if (status === 'Reservado' || status === 'Passou') {
      return () => {};
    } else {
      return confirmSchedule(professionalId, serviceId, time);
    }
  }

  if (loading) {
    return <Loading />;
  } else {
    return (
      <Container>
        <Header>
          <Icon
            onPress={ () => previousDay()}
            style={{marginLeft: 20}}
            name='arrow-left'
            type='font-awesome'
            color={arrowLeftColor()} />
          <HeaderMidleArea>
            <DayOfMonth style={{ fontFamily: 'Roboto_400Regular' }}>{getDataExtenso(selectedDay)}</DayOfMonth>
            <DayOfWeek style={{ fontFamily: 'Roboto_400Regular' }}>{getDayOfWeek()}</DayOfWeek>
          </HeaderMidleArea>
          <Icon
            onPress={ () => nextDay()}
            style={{marginRight: 20}}
            name='arrow-right'
            type='font-awesome'
            color='#323232' />
        </Header>
        <ContainerCards>
          {horarios.map((horario, index) => {
            return (
              <CardDay 
                onPressAction={ () => confirmScheduleAction(
                  horario.status,
                  props.route.params.professionalId, 
                  props.route.params.serviceId, 
                  horario.time
                )} 
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
