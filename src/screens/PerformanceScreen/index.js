import React, {useContext, useEffect, useState} from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';

import ChartLine from '../../components/ChartLine';
import ChartBar from '../../components/ChartBar';
import ChartPiee from '../../components/ChartPiee';
import AuthContext from '../../contexts/auth';
import averageCalculate from '../../utils/averageCalculate';

const PerformanceScreen = () => {

    const { allReviews, subjects, routines, performance } = useContext(AuthContext);
    const [mostUseSubject] = useState(findMostUse(subjects))
    const [mostUseRoutine] = useState(findMostUse(routines))
    const [dataReviewsChart] = useState(performance.map(({reviews}) => {
        return reviews
    }))
    const [dataChronometerChart, setDataChronometerChart] = useState([1,2,3,4,5,6,7])
    const [bestPerformanceDay] = useState(findBestPerformanceDay(dataReviewsChart))

    useEffect(() => {
        let tempArray = []

        performance.forEach(({cycles}, index) => {
            let teste = 0;
            cycles.forEach(({chronometer}) => {
                teste = teste + ((chronometer.getMinutes() * 60) + chronometer.getSeconds())/60
                console.log(teste)
                tempArray[index] = parseFloat(teste.toFixed(2))
            })
        })

        console.log(tempArray)

        setDataChronometerChart(tempArray)

    }, [])

    function findMostUse(item) {
        let temp = 0
        let indexReturn = 0

        item.map(({associatedReviews}, index) => {
            if (associatedReviews.length > temp) {
                temp = associatedReviews.length
                indexReturn = index
            }
        })

        return indexReturn
    }

    function findBestPerformanceDay(data) {
        let index = data.reduce((a,b) => Math.max(a,b))
        let day = ''
        switch (index) {
            case 0:
                day = 'Domingo'
                break;
            case 1:
                day = 'Segunda'
                break;
            case 2:
                day = 'Terça'
                break;
            case 3:
                day = 'Quarta'
                break;
            case 4:
                day = 'Quinta'
                break;
            case 5:
                day = 'Sexta'
                break;
            case 6:
                day = 'Sábado'
                break;
        }

        return day;
    }
    

    return (
        <View style={styles.container}>
            <ScrollView scrollEnabled contentContainerStyle={styles.scrollContainer}>
                <View style={styles.chartBox}>
                    <Text style={styles.textChartPieBox}>Você possui {allReviews.length} revisões ao todo</Text>
                    <View style={styles.lineChartPieBox} />
                    <View>
                        <Text style={styles.subLineText}>Matéria de maior uso: {subjects[mostUseSubject].label}</Text>
                    </View>
                    <ChartPiee data={subjects} />
                </View>
                <View style={styles.chartBox}>
                    {/* Melhorar o cálculo das médias */}
                    <Text style={styles.textChartPieBox}>Média diária: {Math.round(averageCalculate(dataReviewsChart))} revisões</Text>
                    <View style={styles.lineChartPieBox} />
                    <View style={styles.subLineChartPieBox}>
                        <Text style={styles.subLineText}>Rotina recorrente: {routines[mostUseRoutine].label}</Text>
                        <Text style={styles.subLineText}>Dia de maior desempenho: {bestPerformanceDay}</Text>
                    </View>
                    <ChartLine data={performance} height={300} />{/* For some reason, pass dataReviewsChart here cause a error */}
                </View>
                <View style={styles.chartBox}>
                    <Text style={styles.textChartPieBox}>Média diária: {averageCalculate(dataChronometerChart)} minutos</Text>
                    <View style={styles.lineChartPieBox} />
                    <ChartBar data={dataChronometerChart} />
                </View>
            </ScrollView>
        </View>
    )
    
}

export default PerformanceScreen;