import React, {useContext, useEffect, useState} from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import styles from './styles';

import ChartLine from '../../components/ChartLine';
import ChartBar from '../../components/ChartBar';
import ChartPiee from '../../components/ChartPiee';
import AuthContext from '../../contexts/auth';
import averageCalculate from '../../utils/averageCalculate';
import ChartOverall from '../../components/ChartOverall';

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
                tempArray[index] = parseFloat(teste.toFixed(2))
            })
        })


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
        console.log(data)
        let index = data.indexOf(data.reduce((a,b) => Math.max(a,b)))
        console.log(index)
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
                <View style={styles.performanceItemBox}>
                    <Text style={styles.textBold}>INFORMAÇÕES GERAIS</Text>
                    <View style={styles.lineChartPieBox} />
                    <View style={{alignItems: 'flex-start', width: '90%', paddingVertical: 10}}>
                        <Text style={styles.subText}>Dia de maior desempenho: {bestPerformanceDay} </Text>
                        <Text style={styles.subText}>Rotina mais utilizada: {routines[mostUseRoutine].label} </Text>
                        <Text style={styles.subText}>Matéria de maior uso: {subjects[mostUseSubject].label}</Text>
                    </View>
                </View>
                <View style={styles.performanceItemBox}>
                    <Text style={styles.textBold}>DESEMPENHO DO DIA</Text>
                    <View style={styles.lineChartPieBox} />
                    <Text style={styles.subText}>Você concluiu {dataReviewsChart[new Date().getDay()]} revisões hoje!</Text>
                    <ChartOverall 
                        data={{
                            reviewsAverage: Math.round(averageCalculate(dataReviewsChart)),
                            days: dataReviewsChart
                        }} 
                    />
                </View>
                <View style={styles.performanceItemBox}>
                    <Text style={styles.textBold}>REVISÕES/MATÉRIA</Text>
                    <View style={styles.lineChartPieBox} />
                    <Text style={styles.subText}>{allReviews.length} revisões cadastradas</Text>
                    <ChartPiee data={subjects} />
                </View>
                <View style={styles.performanceItemBox}>
                    {/* Melhorar o cálculo das médias */}
                    <Text style={styles.textBold}>REVISÕES/DIA</Text>
                    <View style={styles.lineChartPieBox} />
                    <Text style={styles.subText}>Média diária: {Math.round(averageCalculate(dataReviewsChart))} revisões</Text>
                    <ChartLine data={performance} height={300} />{/* For some reason, pass dataReviewsChart here cause a error */}
                </View>
                <View style={styles.performanceItemBox}>
                    <Text style={styles.textBold}>MINUTOS REVISADOS/DIA</Text>
                    <View style={styles.lineChartPieBox} />
                    <Text style={styles.subText}>Média diária: {averageCalculate(dataChronometerChart)} minutos</Text>
                    <ChartBar data={dataChronometerChart} />
                </View>
            </ScrollView>
        </View>
    )
    
}

export default PerformanceScreen;