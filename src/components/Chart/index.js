import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {
    PieChart
  } from "react-native-chart-kit";

const Chart = () => {

    return (
        <View>
            <PieChart
                data={[
                    {
                        name: "SEGUNDA",
                        population: 40,
                        color: "#fa4",
                        legendFontColor: "#7F7F7F",
                        legendFontSize: 10
                    },
                    {
                        name: "TERÇA",
                        population: 10,
                        color: "#ff2",
                        legendFontColor: "#7F7F7F",
                        legendFontSize: 10
                    },
                    {
                        name: "QUARTA",
                        population: 10,
                        color: "#623",
                        legendFontColor: "#7F7F7F",
                        legendFontSize: 10
                    },
                    {
                        name: "QUINTA",
                        population: 30,
                        color: "#af98",
                        legendFontColor: "#7F7F7F",
                        legendFontSize: 10
                    },
                  ]}
                width={Dimensions.get('screen').width} // from react-native
                height={250}
                accessor="population"
                chartConfig={{
                    backgroundGradientFrom: "#F7F7F7",
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientTo: "#F7F7F7",
                    backgroundGradientToOpacity: 0.5,
                    color: (opacity = 1) => `rgba(10, 10, 10, ${opacity})`,
                    strokeWidth: 2, // optional, default 3
                    barPercentage: 0.5,
                    useShadowColorFromDataset: false, // optional
                }}
                absolute
                paddingLeft="15"
            />
        </View>
    )
}

export default Chart;