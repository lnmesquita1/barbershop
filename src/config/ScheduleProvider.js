import React, { createContext, useState } from 'react';
import { database } from '../config/firebase';

export const ScheduleContext = createContext();

export const ScheduleProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [schedules, setSchedules] = useState([]);
  return (
    <ScheduleContext.Provider
      value={{
        loading,
        schedules,
        schedule: (idProfessional, idServico, selectedDay, selectedTime) => {
          try {
            setLoading(true);
            const selectedTimeHours = Number(selectedTime.split(':')[0]);
            const selectedTimeMinutes = Number(selectedTime.split(':')[1]);
            const key = database.ref(`schedule/${idProfessional}/${idServico}/${selectedDay}`).push().key;
            database.ref(`schedule/${idProfessional}/${idServico}/${selectedDay}/${key}`).set({
              selectedTimeHours,
              selectedTimeMinutes
            }).then(() => {
              setLoading(false);
            }).catch(() => {
              setLoading(false);
            });
          } catch (error) {
            console.warn(error);
            setLoading(false);
          }
        },
        listSchedule: (idProfessional, idServico, selectedDay) => {
          try {
            setLoading(true);
            return database.ref().child(`schedule/${idProfessional}/${idServico}/${selectedDay}`).get().then(list => {
              const items = [];
              if (list.exists()) {
                const keys = Object.keys(list.val());
                Object.values(list.val()).map((item, index) => {
                  item.key = keys[index];
                  items.push(item)
                });
              }
              setLoading(false);
              return items;
            }).catch(error => {
              console.warn(error);
            })
          } catch (error) {
            console.warn(error);
            setLoading(false);
            return null;
          }
        }
      }}>
      {props.children}
    </ScheduleContext.Provider>
  )
}

export default ScheduleProvider;