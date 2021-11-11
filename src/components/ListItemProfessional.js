import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const renderDeleteArea = (data, deleteAction, listAction) => {
  if (deleteAction) {
    return (
      <View style={styles.trashArea}>
        <Icon
          name='trash'
          type='font-awesome'
          color='#fa5252'
          onPress={() => deleteAction(data.key).then(() => {
            listAction();
          })} />
      </View>
    );
  }
}

const ListItemProfessional = ({ data, deleteAction, listAction, onPressAction }) => {
  return (
    <TouchableOpacity onPress={onPressAction} style={styles.item}>
      <View style={styles.titleContainer}>
        <Text style={styles.itemP1}>{data.professionalName}</Text>
      </View>
      <View style={styles.infoContainer}>
        {
          renderDeleteArea(data, deleteAction, listAction)
        }
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
  titleContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  infoContainer: {
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'row'
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

export default ListItemProfessional;
