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
import { AuthContext } from '../../config/AuthProvider';
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
  const { loading, schedule, listSchedule, cancelSchedule } = useContext(ScheduleContext);
  const { userDetails } = useContext(AuthContext);
  const [ selectedDay, setSelectedDay ] = useState(new Date());
  const [ horarios, setHorarios ] = useState([]);

  useFonts({
    Roboto_400Regular,
  });

  useEffect(() => {
    const params = props.route.params;
    list(params.professionalData.professionalId, selectedDay);
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

  const confirmSchedule = (professionalData, serviceData, time) => {
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
          Promise.resolve(schedule(professionalData, serviceData, userDetails, toStringDate(selectedDay), time)).then(() => {
            list(professionalData.professionalId, selectedDay);
          }) 
        }}
      ]
    );
  }

  const confirmScheduleAction = (horario, professionalData, serviceData) => {
    if (horario.status === 'Passou') {
      return () => {};
    } else if (horario.status === 'Reservado' && userDetails.key === horario.userId) {
      return askToCancelSchedule(horario, professionalData, serviceData);
    } else if (horario.status === 'Reservado') {
      return () => {};
    } else {
      return confirmSchedule(professionalData, serviceData, horario.time);
    }
  }

  const askToCancelSchedule = (horario, professionalData, serviceData) => {
    Alert.alert(
      "Deseja cancelar o agendamento?",
      `Nome do profissional: ${horario.professionalName} ${horario.professionalLastName} \n Hora: ${horario.time} \n Serviço: ${horario.serviceName} \n Valor: R$ ${horario.serviceValue}`,
      [
        {
          text: "Não",
          onPress: () => {},
          style: "cancel"
        },
        { text: "Sim", onPress: () => {
            Promise.resolve(cancelSchedule(professionalData, serviceData, userDetails, toStringDate(selectedDay), horario.time, horario.key)).then(() => {
              list(professionalData.professionalId, selectedDay);
            });
          } 
        }
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
                onPressAction={ () => confirmScheduleAction(
                  horario,
                  props.route.params.professionalData, 
                  props.route.params.serviceData
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
