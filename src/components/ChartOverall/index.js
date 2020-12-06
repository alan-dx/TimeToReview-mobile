import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import styles from './styles';
import { ProgressChart } from 'react-native-chart-kit';

const ChartOverall = (props) => {

    const [dataChart, setDataChart] = useState(
        (props.data.days[new Date().getDay()]/props.data.reviewsAverage) > 1 ?
        1 :
        props.data.days[new Date().getDay()]/props.data.reviewsAverage
    )

    const data = {
        data: [dataChart]
    };

    useEffect(() => {
        const currentDate = new Date()
        console.log(props.data.days[currentDate.getDay()])
    }, [])

    // color: (opacity = 1) => `rgba(15, 129, 0, ${opacity})`, verde

    const chartConfig = {
        backgroundGradientFrom: "#FFFF",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#FFFF",
        backgroundGradientToOpacity: 0,
        color:  (opacity = 1) => {
            if (data.data < 0.5) {
                return `rgba(255, 0, 0, ${opacity})`
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
                strokeWidth={10}
                radius={85}
                chartConfig={chartConfig}
                hideLegend={true}
            />
            <View style={styles.chartOverallCenter}>
                <Text style={styles.chartOverallText}>{((props.data.days[new Date().getDay()]/props.data.reviewsAverage)*100).toFixed(0)}%</Text>
                <Text style={styles.chartOverallSubText}>de sua média diária</Text>
            </View>
        </View>
    )
}


export default ChartOverall;