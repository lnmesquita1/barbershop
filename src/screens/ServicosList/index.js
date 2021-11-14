import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, FlatList } from 'react-native';
import { ServicesContext } from '../../config/ServicesProvider';
import { Container } from './styles';
import ListItemService from '../../components/ListItemService';

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default props => {
  const { listService, services } = useContext(ServicesContext);
  const [ professionalId, setProfessionalId ] = useState('');
  const navigation = useNavigation();
  const onPressItem = (item) => navigation.navigate('Schedule', {
    professionalId,
    serviceId: item.key
  });

  useEffect(() => {
    const params = props.route.params;
    if (params) {
      setProfessionalId(params.professionalId);
    }

    const unsubscribe = props.navigation.addListener('focus', () => {
      listService(true);
    });

    return unsubscribe;
  }, []);

  return (

    <Container>
      <FlatList
        data={services}
        style={styles.list}
        renderItem={({ item }) => <ListItemService onPressAction={() => onPressItem(item)} data={item} />}
        keyExtractor={(item) => item.key}
      />
    </Container>
  )
}
