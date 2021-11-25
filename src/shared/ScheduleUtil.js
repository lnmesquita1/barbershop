export const generateTimes = (
    startHours, 
    startMinutes, 
    endHours, 
    endMinutes, 
    timeIntervalHours, 
    timeIntervalMinutes,
    schedules,
    selectedDay
    ) => {
  
  const horarios = [];
  const time = new Date();
  time.setDate(selectedDay.getDate());
  time.setMonth(selectedDay.getMonth());
  time.setFullYear(selectedDay.getFullYear());
  time.setHours(startHours);
  time.setMinutes(startMinutes);

  const end = new Date();
  end.setDate(selectedDay.getDate());
  end.setMonth(selectedDay.getMonth());
  end.setFullYear(selectedDay.getFullYear());
  end.setHours(endHours);
  end.setMinutes(endMinutes);

  while (time.getTime() < end.getTime()) {
    const horario = scheduledTime(time, schedules)
    horarios.push(horario);

    time.setHours(time.getHours() + timeIntervalHours);
    time.setMinutes(time.getMinutes() + timeIntervalMinutes);
  }
  return horarios;
}

const scheduledTime = (time, schedules) => {
  const hours = time.getHours() < 10 ? `0${time.getHours()}` : `${time.getHours()}`;
  const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`;
  if (time.getTime() < new Date().getTime()) {
    return { 
      status: 'Passou', 
      color: '#b5b5b5',
      time: `${hours}:${minutes}`
    };
  }
  const scheduled = schedules.filter(schedule => {
    return schedule.selectedTimeHours == time.getHours()
      && schedule.selectedTimeMinutes == time.getMinutes();
  });
  if (scheduled.length > 0) {
    return {
      status: 'Reservado', 
      color: '#b5b5b5',
      time: `${hours}:${minutes}`,
      professionalName: scheduled[0].professionalName,
      professionalLastName: scheduled[0].professionalLastName,
      serviceName: scheduled[0].serviceName,
      serviceValue: scheduled[0].serviceValue,
      username: scheduled[0].username,
      userLastName: scheduled[0].userLastName,
      key: scheduled[0].key,
      userId: scheduled[0].userId
    };
  }
  return { 
    status: 'Disponível', 
    color: '#AFE1AF',
    time: `${hours}:${minutes}`
  };
}

export const getDataExtenso = (date) => {
  const diaDoMes = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
  const mes = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"][date.getMonth()];

  return `${diaDoMes} de ${mes}`
}

export const toStringDate = (date) => {
  const diaDoMes = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
  return `${date.getFullYear()}-${date.getMonth()}-${diaDoMes}`;
}

export const previousDay = (selectedDay) => {
  var day = new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate());
  var previousDay = new Date(day);
  previousDay.setDate(day.getDate() - 1);
  return previousDay;
}

export const nextDay = (selectedDay) => {
  var day = new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate());
  var nextDay = new Date(day);
  nextDay.setDate(day.getDate() + 1);
  return nextDay;
}

export const isToday = (selectedDay) => {
  const today = new Date();
  if (selectedDay.getFullYear() == today.getFullYear()
  && selectedDay.getMonth() == today.getMonth()
  && selectedDay.getDate() == today.getDate()) {
    return true;
  }
  return false;
}

export const isTomorrow = (selectedDay) => {
  const today = new Date();
  if (selectedDay.getFullYear() == today.getFullYear()
  && selectedDay.getMonth() == today.getMonth()
  && selectedDay.getDate() == today.getDate()+1) {
    return true;
  }
  return false;
}

export const getDayOfWeek = (selectedDay) => {
  const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  if (isToday(selectedDay)) {
    return 'Hoje';
  } else if (isTomorrow(selectedDay)) {
    return 'Amanhã';
  } else {
    return daysOfWeek[selectedDay.getDay()];
  }
}

export const arrowLeftColor = (selectedDay) => {
  if (isToday(selectedDay)) {
    return '#b5b5b5'
  }
  return '#323232'
}
