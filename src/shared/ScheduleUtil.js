export const generateTimes = (
    startHours, 
    startMinutes, 
    endHours, 
    endMinutes, 
    timeIntervalHours, 
    timeIntervalMinutes,
    schedules
    ) => {
  
  const horarios = [];
  const time = new Date();
  time.setHours(startHours);
  time.setMinutes(startMinutes);

  const end = new Date();
  end.setHours(endHours);
  end.setMinutes(endMinutes);

  while (time.getTime() < end.getTime()) {
    const hours = time.getHours() < 10 ? `0${time.getHours()}` : `${time.getHours()}`;
    const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`;
    const resultStatus = setStatusAndColor(time, schedules);
    const horario = { time: `${hours}:${minutes}`, status: resultStatus.status, color: resultStatus.color};
    horarios.push(horario);

    time.setHours(time.getHours() + timeIntervalHours);
    time.setMinutes(time.getMinutes() + timeIntervalMinutes);
  }
  return horarios;
}

const setStatusAndColor = (time, schedules) => {
  if (time.getTime() < new Date().getTime()) {
    return { status: 'Passou', color: '#b5b5b5' };
  } else if (isScheduled(time, schedules)) {
    return { status: 'Reservado', color: '#b5b5b5' };
  } else {
    return { status: 'Disponível', color: '#AFE1AF' };
  }
}

const isScheduled = (time, schedules) => {
  return schedules.filter(schedule => {
    return schedule.selectedTimeHours == time.getHours()
      && schedule.selectedTimeMinutes == time.getMinutes();
  }).length > 0;
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