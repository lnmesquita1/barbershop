import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, ImageBackground, StatusBar, FlatList } from 'react-native';
import { ServicesContext } from '../../config/ServicesProvider';
import { 
    Container, 
    InputArea, 
    CustomButton, 
    CustomButtonText
} from './styles';

import ListItem from '../../components/ListItem';

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
});

export default props => {

    const { listService, services, deleteService } = useContext(ServicesContext);

    useEffect(() => {
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
                renderItem={({ item }) => <ListItem data={item} deleteAction={deleteService} listAction={listService}/>}
                keyExtractor={(item) => item.key}
            />
        </Container>
    )
}
