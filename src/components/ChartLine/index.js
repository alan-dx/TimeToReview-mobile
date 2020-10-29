import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {
    PieChart,
    LineChart
  } from "react-native-chart-kit";

const ChartLine = (props) => {

    return (
        <View >
            <LineChart
                data={{
                    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
                    datasets: [
                    {
                        data: [
                            10,
                            7,
                            6,
                            9,
                            8,
                            15,
                            12,
                        ]
                    }
                    ],
                    legend: ["Número de revisões/dia"]
                }}
                width={Dimensions.get("window").width * 0.95} // from react-native
                height={props.height}
                yAxisInterval={1} // optional, defaults to 1
                fromZero
                onDataPointClick={() => alert() }
                chartConfig={{
                    backgroundColor: "#FFF",
                    backgroundGradientFrom: "#FFF",
                    backgroundGradientTo: "#FCFCFC",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(231, 78, 54, ${opacity})`,
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
                bezier
                style={{
                    borderRadius: 20,
                    elevation: props.elevation
                }}

            />
        </View>
    )
}

export default ChartLine;