import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {
    PieChart,
    LineChart
  } from "react-native-chart-kit";

const Chart = () => {

    return (
        <View>
            <LineChart
                data={{
                    labels: ["Seg", "Tera", "Qua", "Qui", "Sex", "Sáb", "Dom"],
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
                height={220}
                yAxisInterval={1} // optional, defaults to 1
                fromZero
                onDataPointClick={(a,b,c) => alert(a,b,c) }
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
                    marginVertical: 8,
                    borderRadius: 20,
                    elevation: 2
                }}

            />
        </View>
    )
}

export default Chart;