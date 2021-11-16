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
            const key = database.ref(`schedule/${idProfessional}/${selectedDay}/${idServico}`).push().key;
            database.ref(`schedule/${idProfessional}/${selectedDay}/${idServico}/${key}`).set({
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
        listSchedule: (idProfessional, selectedDay) => {
          try {
            setLoading(true);
            return database.ref().child(`schedule/${idProfessional}/${selectedDay}`).get().then(list => {
              const items = [];
              if (list.exists()) {
                Object.values(list.val()).forEach(value => {
                  const keys = Object.keys(value);
                  Object.values(value).map((item, index) => {
                    item.key = keys[index];
                    items.push(item)
                  });
                })
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