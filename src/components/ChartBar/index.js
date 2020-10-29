import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {
    LineChart
  } from "react-native-chart-kit";

const ChartBar = () => {

    return (
        <View >
            <LineChart
                data={{
                    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
                    datasets: [
                    {
                        data: [
                            10,
                            2,
                            12,
                            4,
                            5,
                            12,
                            1,
                        ]
                    }
                    ],
                    legend: ["Horas revisadas/dia"]
                }}
                width={Dimensions.get("window").width * 0.95} // from react-native
                height={300}
                yAxisInterval={1} // optional, defaults to 1
                fromZero
                onDataPointClick={() => alert() }
                chartConfig={{
                    backgroundColor: "#FFF",
                    backgroundGradientFrom: "#FFF",
                    backgroundGradientTo: "#FCFCFC",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(96, 195, 235, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(48, 48, 48, ${opacity})`,
                    style: {
                        borderRadius: 20,
                    },
                    propsForDots: {
                        r: "5",
                        strokeWidth: "1",
                        stroke: "#303030"
                    }
                }}
                style={{
                    marginVertical: 0,
                    borderRadius: 20,
                }}

            />
        </View>
    )
}

export default ChartBar;