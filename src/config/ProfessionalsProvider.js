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
        createProfessional: (navigation) => {
          try {
            setLoading(true);
            const newProfessionalKey = database.ref().child('professionals').push().key;
            database.ref('professionals/' + newProfessionalKey).set({ 
              teste: 'teste'
            }).then(() => {
              navigation.navigate('ServicosListAdmin');
              setLoading(false);
            });
          } catch (error) {
            setLoading(false);
            console.warn(error);
          }
        },
        listProfessionals: () => {
          try {
            database.ref().child('professionals').get().then(list => {
              if (list.exists()) {
                const keys = Object.keys(list.val());
                const items = [];
                Object.values(list.val()).map((item, index) => {
                  item.key = keys[index];
                  items.push(item)
                });
                setProfessionals(items);
              }
            });
          } catch (error) {
            console.warn(error);
          }
        },
        deleteProfessional: async (key) => {
          try {
            const item = database.ref().child('professionals/' + key);
            if (item) {
              item.remove();
            }
          } catch (error) {
            console.warn(error);
          }
        }
      }}>
      {props.children}
    </ProfessionalsContext.Provider>
  )
}

export default ProfessionalsProvider;