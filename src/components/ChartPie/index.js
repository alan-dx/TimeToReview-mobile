import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {
    PieChart
  } from "react-native-chart-kit";

const ChartPie = () => {

    return (
        <View>
            <PieChart
                data={[
                    {
                        name: "CÁLCULO G",
                        population: 40,
                        color: "#fa4",
                        legendFontColor: "#606060",
                        legendFontSize: 9
                    },
                    {
                        name: "FÍSICA III",
                        population: 10,
                        color: "#ff2",
                        legendFontColor: "#606060",
                        legendFontSize: 9
                    },
                    {
                        name: "MEC.SÓLIDOS",
                        population: 10,
                        color: "#623",
                        legendFontColor: "#606060",
                        legendFontSize: 9
                    },
                    {
                        name: "TEC.MATERIAIS",
                        population: 30,
                        color: "#af98",
                        legendFontColor: "#606060",
                        legendFontSize: 9
                    },
                  ]}
                width={Dimensions.get('screen').width * 0.95} // from react-native
                height={250}
                backgroundColor="#FFF"
                style={{
                    borderRadius: 20,
                    elevation: 1,
                    marginVertical: 10
                }}
                accessor="population"
                chartConfig={{
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  }}
                avoidFalseZero
                paddingLeft="20"
            />
        </View>
    )
}

export default ChartPie;