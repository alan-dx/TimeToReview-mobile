import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import styles from './styles';
import { ProgressChart } from 'react-native-chart-kit';

const ChartOverall = (props) => {

    const data = {
        data: [0.9]
    };

    // color: (opacity = 1) => `rgba(15, 129, 0, ${opacity})`, verde

    const chartConfig = {
        backgroundGradientFrom: "#FFFF",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#FFFF",
        backgroundGradientToOpacity: 0,
        color:  (opacity = 1) => {
            if (data.data < 0.5) {
                return `rgba(15, 129, 0, ${opacity})`
            } else {
                return `rgba(15, 129, 0, ${opacity})`
            }
        },
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };

    return (
        <View style={styles.container}>
            <ProgressChart
                data={data}
                width={Dimensions.get("window").width * 0.95}
                height={220}
                strokeWidth={8}
                radius={80}
                chartConfig={chartConfig}
                hideLegend={true}
            />
            <View style={styles.chartOverallCenter}>
                <Text style={styles.chartOverallText}>{data.data * 100}%</Text>
                <Text style={styles.chartOverallSubText}>de sua média diária</Text>
            </View>
        </View>
    )
}


export default ChartOverall;