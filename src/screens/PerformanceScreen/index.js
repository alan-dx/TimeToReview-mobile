import React, {useContext} from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

import ChartLine from '../../components/ChartLine';
import ChartPie from '../../components/ChartPie';
import ChartBar from '../../components/ChartBar';
import ChartPiee from '../../components/ChartPiee';
import AuthContext from '../../contexts/auth';

const PerformanceScreen = () => {

    const { allReviews} = useContext(AuthContext);

    const navigation = useNavigation()

    function handleClickGoBack() {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <ScrollView scrollEnabled contentContainerStyle={styles.scrollContainer}>
                <View style={styles.chartBox}>
                    <Text style={styles.textChartPieBox}>Você possui {allReviews.length} revisões ao todo</Text>
                    <View style={styles.lineChartPieBox} />
                    <View>
                        <Text style={styles.subLineText}>Matéria de maior uso: FÍSICA III</Text>
                    </View>
                    <ChartPiee />
                </View>
                <View style={styles.chartBox}>
                    <Text style={styles.textChartPieBox}>Média diária: 7 revisões</Text>
                    <View style={styles.lineChartPieBox} />
                    <View style={styles.subLineChartPieBox}>
                        <Text style={styles.subLineText}>Rotina recorrente: 10-3-1-2-5-1-10</Text>
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