import React, { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, FlatList } from 'react-native';
import { ProfessionalsContext } from '../../config/ProfessionalsProvider';
import { Container } from './styles';
import ListItemProfessional from '../../components/ListItemProfessional';
import Loading from '../../components/Loading';

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default props => {
  const { loading, listProfessionals, professionals, deleteProfessional } = useContext(ProfessionalsContext);
  const navigation = useNavigation();
  const onPressItem = (item) => navigation.navigate('ProfessionalsEditAdmin', {
    professionalName: item.professionalName,
    key: item.key
  });

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      listProfessionals();
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <Loading/>
  } else {
    return (
      <Container>
        <FlatList
          data={professionals}
          style={styles.list}
          renderItem={({ item }) => <ListItemProfessional onPressAction={ () => onPressItem(item)} data={item} deleteAction={deleteProfessional} listAction={listProfessionals} />}
          keyExtractor={(item) => item.key}
        />
      </Container>
    )
  }
}
