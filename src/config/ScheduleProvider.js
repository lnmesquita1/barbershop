import React, { createContext } from 'react';
import { database } from '../config/firebase';

export const ScheduleContext = createContext();

export const ScheduleProvider = (props) => {
  return (
    <ScheduleContext.Provider
      value={{
        schedule: (idProfessional, selectedDay, selectedTime, navigation) => {
          try {
            database.ref(`schedule/${idProfessional}/${selectedDay}`).set({
              selectedTime: selectedTime
            }).then(() => {
            
            });
          } catch (error) {
            console.warn(error);
          }
        },
      }}>
      {props.children}
    </ScheduleContext.Provider>
  )
}

export default ScheduleProvider;