import React, {useContext, useEffect, useState} from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';

import ChartLine from '../../components/ChartLine';
import ChartBar from '../../components/ChartBar';
import ChartPiee from '../../components/ChartPiee';
import AuthContext from '../../contexts/auth';

const PerformanceScreen = () => {

    const { allReviews, subjects, routines, performance } = useContext(AuthContext);
    const [mostUseSubject] = useState(findMostUse(subjects))
    const [mostUseRoutine] = useState(findMostUse(routines))
    const [dataReviewsChart] = useState(performance.map(({reviews}) => {
        return reviews
    }))
    const [bestPerformanceDay] = useState(findBestPerformanceDay(dataReviewsChart))
    const [averageReviews] = useState(averageReviewsCalculate)

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

    function averageReviewsCalculate() {
        let div = 0

        dataReviewsChart.forEach(item => {
            if (item != 0) {
                div++
            }
        })

        return Math.round(dataReviewsChart.reduce((acumulator, currentValue) => acumulator + currentValue)/(div != 0 ? div : 1))
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
                    <ChartPiee data={subjects} />{/* For some reason, pass dataReviewsChart here cause a error */}
                </View>
                <View style={styles.chartBox}>
                    {/* Melhorar o cálculo das médias */}
                    <Text style={styles.textChartPieBox}>Média diária: {averageReviews} revisões</Text>
                    <View style={styles.lineChartPieBox} />
                    <View style={styles.subLineChartPieBox}>
                        <Text style={styles.subLineText}>Rotina recorrente: {routines[mostUseRoutine].label}</Text>
                        <Text style={styles.subLineText}>Dia de maior desempenho: {bestPerformanceDay}</Text>
                    </View>
                    <ChartLine data={performance} height={300} />
                </View>
                <View style={styles.chartBox}>
                    <Text style={styles.textChartPieBox}>Média diária: 67 minutos</Text>
                    <View style={styles.lineChartPieBox} />
                    <ChartBar />
                </View>
            </ScrollView>
        </View>
    )
    
}

export default PerformanceScreen;