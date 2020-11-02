import React, {useContext, useEffect, useState} from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

import ChartLine from '../../components/ChartLine';
import ChartBar from '../../components/ChartBar';
import ChartPiee from '../../components/ChartPiee';
import AuthContext from '../../contexts/auth';

const PerformanceScreen = () => {

    const { allReviews, subjects, routines } = useContext(AuthContext);
    const [mostUseSubject, setMostUseSubject] = useState(findMostUse(subjects))
    const [mostUseRoutine, setMostUseRoutine] = useState(findMostUse(routines))

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
                    <Text style={styles.textChartPieBox}>Média diária: 7 revisões</Text>
                    <View style={styles.lineChartPieBox} />
                    <View style={styles.subLineChartPieBox}>
                        <Text style={styles.subLineText}>Rotina recorrente: {routines[mostUseRoutine].label}</Text>
                        <Text style={styles.subLineText}>Dia de maior desempenho: Sáb</Text>
                    </View>
                    <ChartLine height={300} />
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