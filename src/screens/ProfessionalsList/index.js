import React, { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, FlatList } from 'react-native';
import { ProfessionalsContext } from '../../config/ProfessionalsProvider';
import { Container } from './styles';
import ListItemProfessional from '../../components/ListItemProfessional';

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default props => {
  const { listProfessionals, professionals } = useContext(ProfessionalsContext);
  const navigation = useNavigation();
  const onPressItem = (item) => navigation.navigate(props.route.params.nextScreen, {
    professionalId: item.key
  });

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      listProfessionals();
    });

    return unsubscribe;
  }, []);

  return (

    <Container>
      <FlatList
        data={professionals}
        style={styles.list}
        renderItem={({ item }) => <ListItemProfessional onPressAction={() => onPressItem(item)} data={item} />}
        keyExtractor={(item) => item.key}
      />
    </Container>
  )
}
