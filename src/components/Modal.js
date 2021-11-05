import { Modal, Pressable } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

export const ModalCenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;
export const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
  elevation: 5;
`;

export const Text = styled.Text`
  display: flex;
  line-height: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 13px;
  margin-top: 20px;
`;

export default props => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={props.onRequestClose}
    >
      <ModalCenteredView>
        <ModalView>
          <Text>{props.title}</Text>
          <Pressable
            onPress={props.onHideModal}
          >
            <Text>{props.hideModalText}</Text>
          </Pressable>
        </ModalView>
      </ModalCenteredView>
    </Modal>
  );
};