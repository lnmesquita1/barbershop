import React, { useEffect, useContext, useState } from 'react';
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
  const { loading, schedule, listSchedule } = useContext(ScheduleContext);
  const [ selectedDay, setSelectedDay ] = useState(new Date());
  const [ horarios, setHorarios ] = useState([]);

  useFonts({
    Roboto_400Regular,
  });

  useEffect(() => {
    const params = props.route.params;
    list(params.professionalId, selectedDay);
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
      list(props.route.params.professionalId, previous);
    }
  }

  const setNextDay = async () => {
    const next = nextDay(selectedDay);
    setSelectedDay(next);
    list(props.route.params.professionalId, next);
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
            list(professionalId, selectedDay);
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
                onPressAction={ () => {}} 
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
