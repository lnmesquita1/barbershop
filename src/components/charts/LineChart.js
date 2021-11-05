import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";


export default props => {
  return (
    <LineChart
      data={{
        labels: props.labels,
        datasets: [
          {
            data: props.data
          }
        ]
      }}
      width={Dimensions.get("window").width - 60} // from react-native
      height={220}
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
        decimalPlaces: 0,
        color: () => `#03A9F1`,
        labelColor: () => `#323232`,
        style: {
          borderRadius: 0
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#03A9F1"
        }
      }}
      bezier
      style={{
        marginVertical: 15,
        borderRadius: 16,
        left: -10
      }}
    />
  );
}