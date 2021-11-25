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
        schedule: (professionalData, serviceData, userDetails, selectedDay, selectedTime) => {
          try {
            setLoading(true);
            const selectedTimeHours = Number(selectedTime.split(':')[0]);
            const selectedTimeMinutes = Number(selectedTime.split(':')[1]);
            const key = database.ref(`schedule/${professionalData.professionalId}/${selectedDay}/${serviceData.serviceId}/`).push().key;
            database.ref(`schedule/${professionalData.professionalId}/${selectedDay}/${serviceData.serviceId}/${key}`).set({
              selectedTimeHours,
              selectedTimeMinutes,
              professionalName: professionalData.name,
              professionalLastName: professionalData.lastName,
              serviceName: serviceData.serviceName,
              serviceValue: serviceData.serviceValue,
              username: userDetails.username,
              userLastName: userDetails.lastName,
              userId: userDetails.key,
              flagActive: true
            }).then(() => {
              const userScheduleKey = database.ref(`userSchedule/${userDetails.key}/`).push().key;
              database.ref(`userSchedule/${userDetails.key}/${userScheduleKey}`).set({
                professionalId: professionalData.professionalId,
                day: selectedDay,
                serviceId: serviceData.serviceId,
                scheduleKey: key,
              }).then(() => {
                setLoading(false);
              }).catch(() => {
                setLoading(false);
              })
            }).catch(() => {
              setLoading(false);
            });
          } catch (error) {
            console.warn(error);
            setLoading(false);
          }
        },
        scheduleByAdminOrProfessional: (professionalData, serviceData, costumerName, selectedDay, selectedTime) => {
          try {
            setLoading(true);
            const selectedTimeHours = Number(selectedTime.split(':')[0]);
            const selectedTimeMinutes = Number(selectedTime.split(':')[1]);
            const key = database.ref(`schedule/${professionalData.professionalId}/${selectedDay}/${serviceData.serviceId}/`).push().key;
            database.ref(`schedule/${professionalData.professionalId}/${selectedDay}/${serviceData.serviceId}/${key}`).set({
              selectedTimeHours,
              selectedTimeMinutes,
              professionalName: professionalData.name,
              professionalLastName: professionalData.lastName,
              serviceName: serviceData.serviceName,
              serviceValue: serviceData.serviceValue,
              username: costumerName,
              flagActive: true
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
                    if (item.flagActive) {
                      items.push(item);
                    }
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
        },
        cancelSchedule: (professionalData, serviceData, userDetails, selectedDay, selectedTime, key) => {
          try {
            setLoading(true);
            const selectedTimeHours = Number(selectedTime.split(':')[0]);
            const selectedTimeMinutes = Number(selectedTime.split(':')[1]);
            database.ref(`schedule/${professionalData.professionalId}/${selectedDay}/${serviceData.serviceId}/${key}`).set({
              selectedTimeHours,
              selectedTimeMinutes,
              professionalName: professionalData.name,
              professionalLastName: professionalData.lastName,
              serviceName: serviceData.serviceName,
              serviceValue: serviceData.serviceValue,
              username: userDetails.username,
              userLastName: userDetails.lastName,
              userId: userDetails.key,
              flagActive: false
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
      }}>
      {props.children}
    </ScheduleContext.Provider>
  )
}

export default ScheduleProvider;