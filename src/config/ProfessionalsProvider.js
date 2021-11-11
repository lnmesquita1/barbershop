import React, { createContext, useState } from 'react';
import { database } from '../config/firebase';

export const ProfessionalsContext = createContext();

export const ProfessionalsProvider = (props) => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <ProfessionalsContext.Provider
      value={{
        loading,
        professionals,
        createProfessional: (key, professionalName, navigation) => {
          try {
            setLoading(true);
            let professionalKey = key;
            if (!professionalKey) {
              professionalKey = database.ref().child('professionals').push().key;
            }
            database.ref('professionals/' + professionalKey).set({ 
              professionalName: professionalName
            }).then(() => {
              navigation.navigate('ProfessionalsListAdmin');
              setLoading(false);
            });
          } catch (error) {
            setLoading(false);
            console.warn(error);
          }
        },
        listProfessionals: () => {
          try {
            setLoading(true);
            database.ref().child('professionals').get().then(list => {
              const items = [];
              if (list.exists()) {
                const keys = Object.keys(list.val());
                Object.values(list.val()).map((item, index) => {
                  item.key = keys[index];
                  items.push(item)
                });
              }
              setProfessionals(items);
              setLoading(false);
            });
          } catch (error) {
            console.warn(error);
            setLoading(false);
          }
        },
        deleteProfessional: async (key) => {
          try {
            const item = database.ref().child('professionals/' + key);
            if (item) {
              setLoading(true);
              item.remove().then(() => {
                setLoading(false);
              }).catch(() => {
                setLoading(false);
              })
            }
          } catch (error) {
            console.warn(error);
            setLoading(false);
          }
        }
      }}>
      {props.children}
    </ProfessionalsContext.Provider>
  )
}

export default ProfessionalsProvider;