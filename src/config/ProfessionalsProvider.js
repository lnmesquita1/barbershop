import React, { createContext, useState } from 'react';
import { database } from '../config/firebase';

export const ProfessionalsContext = createContext();

export const ProfessionalsProvider = (props) => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(false);

  const setFlagProfessional = (email, flagProfessional) => {
    database.ref().child('users').orderByChild('email').equalTo(email).get().then(user => {
      if (user.exists()) {
        const key = Object.keys(user.val())[0];
        const newUser = Object.values(user.val())[0];
        newUser.flagProfessional = flagProfessional;
        database.ref().child('users/' + key).set(newUser);
      }
    });
  }

  return (
    <ProfessionalsContext.Provider
      value={{
        loading,
        professionals,
        createProfessional: (email, professionalName, lastName, phoneNumber, navigateAction) => {
          try {
            setLoading(true);
            const professionalKey = database.ref().child('professionals').push().key;
            database.ref('professionals/' + professionalKey).set({ 
              name: professionalName,
              lastName,
              phoneNumber,
              email
            }).then(() => {
              // Busca na tabela de usuários se existe um usuário com o email do profissional.
              // Caso encontre, o usuário deve ser setado com a flagProfessional = true
              setFlagProfessional(email, true);
              navigateAction();
              setLoading(false);
            });
          } catch (error) {
            setLoading(false);
            console.warn(error);
          }
        },
        updateProfessional: (key, email, oldEmail, professionalName, lastName, phoneNumber, navigateAction) => {
          try {
            setLoading(true);
            database.ref().child('professionals/' + key).set({ 
              name: professionalName,
              lastName,
              phoneNumber,
              email
            }).then(() => {
              // Busca na tabela de usuários se existe um usuário com o email do profissional.
              // Caso encontre, o usuário deve ser setado com a flagProfessional = true
              setFlagProfessional(email, true);
              // Verifica se o email está sendo alterado. Caso sim, a flagProfessional do usuário 
              // do email antigo deve ser removida
              if (oldEmail != email) {
                setFlagProfessional(oldEmail, null);
              }
              navigateAction();
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
            database.ref('professionals').on('value', list => {
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
        deleteProfessional: async (key, email) => {
          try {
            const item = database.ref().child('professionals/' + key);
            if (item) {
              setLoading(true);
              item.remove().then(() => {
                setFlagProfessional(email, null);
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