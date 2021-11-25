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
  const [ professionalData, setProfessionalData ] = useState('');
  const [ time, setTime ] = useState('');
  const [ selectedDay, setSelectedDay ] = useState('');
  const navigation = useNavigation();
  // Navigate to ScheduleCostumerAdmin or Schedule
  const onPressItem = (item) => navigation.navigate(props.route.params.navigateTo, {
    professionalData,
    time,
    selectedDay,
    serviceData: { serviceId: item.key, serviceName: item.serviceName, serviceValue: item.serviceValue }
  });

  useEffect(() => {
    const params = props.route.params;
    if (params) {
      setProfessionalData(params.professionalData);
      setTime(params.time);
      setSelectedDay(params.selectedDay);
    }

    const unsubscribe = props.navigation.addListener('focus', () => {
      listService();
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
