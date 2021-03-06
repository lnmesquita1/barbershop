import React, { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, FlatList } from 'react-native';
import { ServicesContext } from '../../config/ServicesProvider';
import { Container } from './styles';
import ListItemService from '../../components/ListItemService';
import Loading from '../../components/Loading';

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default props => {
  const { loading, listService, services, deleteService } = useContext(ServicesContext);
  const navigation = useNavigation();
  const onPressItem = (item) => navigation.navigate('ServicosEditAdmin', {
    serviceName: item.serviceName,
    serviceTimeHours: item.serviceTimeHours,
    serviceTimeMinutes: item.serviceTimeMinutes,
    serviceValue: item.serviceValue,
    key: item.key
  });

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      listService();
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <Loading/>
  } else {
    return (
      <Container>
        <FlatList
          data={services}
          style={styles.list}
          renderItem={({ item }) => <ListItemService onPressAction={ () => onPressItem(item)} data={item} deleteAction={deleteService} listAction={listService} />}
          keyExtractor={(item) => item.key}
        />
      </Container>
    )
  }
}
