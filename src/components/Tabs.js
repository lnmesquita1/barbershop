import React from 'react';
import { Icon } from 'react-native-elements';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: 170px;
  margin-top: auto;
`;

export const TabsContainer = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: { paddingLeft: 10, paddingRight: 20 },
  showHorizontalScrollIndicator: false,
})``;

export const TabItem = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background: #323232;
  border-radius: 3px;
  margin-left: 10px;
  margin-top: 40px;
  padding: 10px;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid #323232;
  box-shadow: -4px 4px 18px rgba(0, 0, 0, 0.2);
`;

export const TabText = styled.Text`
  font-size: 13px;
  color: #fff;
`;

export default props => {
    return (
      <Container>
        <TabsContainer>
          {
            props.tabProperties.map((item, index) => {
              return (
                <TabItem key={index} onPress={ item.navigateAction }>
                  <Icon
                    name={item.iconName}
                    type='font-awesome-5'
                    color={item.iconColor}
                    solid={true} />
                  <TabText style={item.textStyle ? item.textStyle : { fontSize: 13 } }>{item.text}</TabText>
                </TabItem>
              );
            }) 
          }
        </TabsContainer>
      </Container>
    );
}