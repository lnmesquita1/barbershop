import React from 'react';
import styled from 'styled-components/native';
import { Container } from './styles';
import Tabs from '../../components/Tabs';
import { Icon } from 'react-native-elements';
import AppLoading from 'expo-app-loading';
import { useFonts, Roboto_500Medium } from '@expo-google-fonts/roboto';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from 'react-native';

const iconColor = 'black';

export const ContainerDashboard = styled.View`
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
`;

export const HeaderArea = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const WelcomeMessage = styled.Text`
  display: flex;
  line-height: 20px;
  margin-right: auto;
  text-transform: uppercase;
`;

export const Chart = styled.View`
  background: #FFFFFF;
  margin-top: 20px;
  height: 240px;
  width: 100%;
  border-radius: 20px;
  box-shadow: 0px 0px 10px #EEF0F3;
`;

export default () => {
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Container>
        <ContainerDashboard>
          <HeaderArea>
            <WelcomeMessage style={{ fontFamily: 'Roboto_500Medium', fontSize: 17 }}>Bem vindo, Lucas</WelcomeMessage>
            <Icon name='cog' type='font-awesome' color={iconColor} />
          </HeaderArea>
          <Chart>
          <LineChart
            data={{
              labels: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
              datasets: [
                {
                  data: [
                    8,
                    10,
                    15,
                    9,
                    12,
                    19
                  ]
                }
              ]
            }}
            width={Dimensions.get("window").width - 60} // from react-native
            height={220}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundGradientFrom: "#0000fff",
              backgroundGradientTo: "#0000fff",
              decimalPlaces: 0,
              color:  () => `#323232`,
              labelColor: () => `#323232`,
              style: {
                borderRadius: 0
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#323232"
              }
            }}
            bezier
            style={{
              marginVertical: 15,
              borderRadius: 16,
              left: -10
            }}
          />
          </Chart>
        </ContainerDashboard>
        <Tabs></Tabs>
      </Container>
    )
  }


}
