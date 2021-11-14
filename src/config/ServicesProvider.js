import React, { createContext, useState } from 'react';
import { database } from '../config/firebase';

export const ServicesContext = createContext();

export const ServicesProvider = (props) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <ServicesContext.Provider
      value={{
        loading,
        services,
        createService: (key, serviceName, serviceTimeHours, serviceTimeMinutes, serviceValue, navigation) => {
          try {
            setLoading(true);
            let serviceKey = key;
            if (!serviceKey) {
              serviceKey = database.ref().child('services').push().key;
            }
            database.ref('services/' + serviceKey).set({
              serviceName: serviceName,
              serviceTimeHours: serviceTimeHours,
              serviceTimeMinutes: serviceTimeMinutes,
              serviceValue: serviceValue
            }).then(() => {
              navigation.navigate('ServicosListAdmin');
              setLoading(false);
            }).catch(() => {
              setLoading(false);
            });
          } catch (error) {
            setLoading(false);
            console.warn(error);
          }
        },
        listService: (serviceName = false) => {
          try {
            setLoading(true);
            database.ref().child('services').get().then(list => {
              const items = [];
              if (list.exists()) {
                const keys = Object.keys(list.val());
                Object.values(list.val()).map((item, index) => {
                  if (serviceName) {
                    items.push( { key: keys[index], serviceName: item.serviceName })
                  } else {
                    item.key = keys[index];
                    items.push(item)
                  }
                });
              }
              setLoading(false);
              setServices(items);
            });
          } catch (error) {
            console.warn(error);
            setLoading(false);
          }
        },
        deleteService: async (key) => {
          try {
            const item = database.ref().child('services/' + key);
            if (item) {
              setLoading(true);
              item.remove().then(() => {
                setLoading(false);
              }).catch(() => {
                setLoading(false);
              });
            }
          } catch (error) {
            console.warn(error);
            setLoading(false);
          }
        }
      }}>
      {props.children}
    </ServicesContext.Provider>
  )
}

export default ServicesProvider;