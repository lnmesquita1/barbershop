import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const formatTime = (hours, minutes) => {
  if (hours != null && minutes != null) {
    let valueHours = Number(hours);
    let valueMinutes = Number(minutes);
    if (valueHours < 10) {
      valueHours = `0${hours}`;
    }
    if (valueMinutes < 10) {
      valueMinutes = `0${minutes}`;
    }
    return `${valueHours}:${valueMinutes}`;
  }
  return null;
};

const renderTime = (serviceTimeHours, serviceTimeMinutes) => {
  if (serviceTimeHours != null && serviceTimeMinutes != null) {
    return (
      <View style={styles.timeContainer}>
        <Text style={styles.itemP2}>Tempo</Text>
        <Text style={styles.itemP1}>{formatTime(serviceTimeHours, serviceTimeMinutes)}</Text>
      </View>
    );
  }
}

const renderValue = (serviceValue) => {
  if (serviceValue != null) {
    return (
      <View>
        <Text style={styles.itemP2}>Valor</Text>
        <Text style={styles.itemP1}>R$ {serviceValue}</Text>
      </View>
    );
  }
}

const renderDeleteArea = (deleteAction, listAction, key) => {
  if (deleteAction != null) {
    return (
      <View style={styles.trashArea}>
          <Icon
            name='trash'
            type='font-awesome'
            color='#fa5252'
            onPress={() => deleteAction(key).then(() => {
              listAction();
            })} />
        </View>
    );
  }
}

const ListItemService = ({ data, deleteAction, listAction, onPressAction }) => {
  return (
    <TouchableOpacity onPress={onPressAction} style={styles.item}>
      <View style={styles.titleContainer}>
        <Text style={styles.itemP1}>{data.serviceName}</Text>
      </View>
      <View style={styles.infoContainer}>
        {renderTime(data.serviceTimeHours, data.serviceTimeMinutes)}
        {renderValue(data.serviceValue)}
        {renderDeleteArea(deleteAction, listAction, data.key)}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 15,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  itemP1: {
    fontSize: 22,
    color: '#242425'
  },
  itemP2: {
    fontSize: 18,
    color: '#999999',
  },  
  titleContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  infoContainer: {
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'row'
  },
  timeContainer: {
    marginRight: 15
  },
  trashArea: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
    marginLeft: 10,
    borderLeftWidth: 1
  }
});

export default ListItemService;
