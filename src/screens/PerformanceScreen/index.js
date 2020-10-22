import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

import ChartLine from '../../components/ChartLine';
import ChartPie from '../../components/ChartPie';
import ChartBar from '../../components/ChartBar';

const PerformanceScreen = () => {

    const navigation = useNavigation()

    function handleClickGoBack() {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <ScrollView scrollEnabled contentContainerStyle={styles.scrollContainer}>
                <ChartLine />
                <Text>Número de revisões por matéria</Text>
                <ChartPie />
                <ChartBar />
            </ScrollView>
        </View>
    )
    
}

export default PerformanceScreen;