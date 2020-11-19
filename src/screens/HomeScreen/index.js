import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import AuthContext from '../../contexts/auth';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import MenuButton from '../../components/MenuButton';
import Chart from '../../components/ChartLine';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';


const HomeScreen = () => {

    //OPÇÕES (PRO) => REVISÕES, ROTINAS, MATÉRIAS, LISTAR TODAS AS REVISÕES, CONFIGURAÇÕES, SOBRE
    //OPÇÕES (BASIC) => REVISÕES, ROTINAS, LISTAR TODAS AS REVISÕES, MATÉRIAS, CONFIGURAÇÕES, TORNE-SE PREMIUM

    //Gambi? => As react navigation goBack does not cause the screen to render again, the chart was not updating. That was the only functional solution I found.

    const navigation = useNavigation()
    const { performance, setPerformance, allReviews, setReviews, setAllReviews } = useContext(AuthContext);
    const [numberOfReviews, setNumberOfReviews] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [dataChart, setDataChart] = useState(performance)
    const [loadingChart, setLoadingChart] = useState(true)

    useFocusEffect(
        useCallback(() => {
            console.log('homescreen')
            const currentDate = new Date()
            currentDate.setHours(3,0,0,0)
            const filteredReviews = allReviews.filter(item => new Date(item.dateNextSequenceReview) <= currentDate)
            setReviews(filteredReviews)
            setNumberOfReviews(filteredReviews.length)
            // setLoadingChart(false)
            setLoadingChart(true)//Gambi
        }, [allReviews])
    )

    function handleClickGoToReviewsScreen() {
        navigation.navigate('ReviewsScreen', {
            onGoBack: handleUpdateChartOnBack
        })
    }

    function handleClickGoToRoutineScreen() {
        navigation.navigate('RoutineScreen')
    }

    function handleClickGoToSubjectScreen() {
        navigation.navigate('SubjectScreen')
    }

    function handleClickGoToSettingScreen() {
        navigation.navigate('SettingScreen')
    }

    function handleClickGoToPerformanceScreen() {
        navigation.navigate('PerformanceScreen')
    }

    function handleGoToBePremiumScreen() {
        navigation.navigate('BePremiumScreen')
    }

    function handleUpdateChartOnBack() {
        console.log('aaa')
        const currentDate = new Date()
        console.log(performance[currentDate.getDay()])
        setLoadingChart(false)//Gambi
    }

    function handleClickGoToAllReviewsScreen() {
        navigation.navigate("AllReviewsScreen")
    }

    const homeDash = <>
        <View style={styles.graphBox}>
            <Text style={styles.graphBoxTitle}>Você possui {numberOfReviews} revisões pendentes!</Text>
            {/* NESSE GRÁFICO INDICAR A QUANTIDADE DE REVISÕES POR DIA */}
            {loadingChart ? <Chart height={220} elevation={2} data={dataChart} /> : <Text>Atualizando...</Text>}
            <View style={styles.performanceBox}>
                <View style={styles.performanceButtonBox}>
                    <BorderlessButton onPress={handleClickGoToPerformanceScreen} style={styles.performanceButton}>
                        <Icon name="barchart" size={22} color="#FFF" />
                    </BorderlessButton>
                </View>
                <Text style={styles.performanceButtonText}>Visualizar desempenho completo</Text>
            </View>
        </View>

        <View style={styles.menuBox}>
            <View style={styles.menuRow}>
                <View style={styles.menuItemBox}>
                    <MenuButton color="#FFF" textColor="#606060" onPress={handleClickGoToReviewsScreen} title="Revisões" subtitle="15 Revisões Cadastradas">
                        <Icon name="exception1" size={23} color="#303030" />
                    </MenuButton>
                </View>
                <View style={styles.menuItemBox}>
                    <MenuButton color="#FFF" textColor="#606060" onPress={handleClickGoToRoutineScreen} title="Rotinas" subtitle="7 Rotinas">
                        <Icon name="sync" size={23} color="#303030" />
                    </MenuButton>
                </View>
                <View style={styles.menuItemBox}>
                    <MenuButton color="#FFF" textColor="#606060" onPress={handleClickGoToAllReviewsScreen} title="Todas Revisões" subtitle="7 Rotinas">
                        <Icon name="profile" size={23} color="#303030" />
                    </MenuButton>
                </View>
            </View>
            <View style={styles.menuRow}>
                <View style={styles.menuItemBox}>
                    <MenuButton color="#FFF" textColor="#606060" onPress={handleClickGoToSubjectScreen} title="Matérias" subtitle="12 Matérias">
                        <Icon name="book" size={23} color="#303030" />
                    </MenuButton>
                </View>
                <View style={styles.menuItemBox}>
                    <MenuButton color="#FFF" textColor="#606060" onPress={handleGoToBePremiumScreen} title="Dicas de Estudo">
                        <Icon2 name="trending-up" size={23} color="#303030" />
                    </MenuButton>
                </View>
                <View style={styles.menuItemBox}>
                    <MenuButton color="#FFF" textColor="#606060" onPress={handleClickGoToSettingScreen} title="Configurações">
                        <Icon name="setting" size={23} color="#303030" />
                    </MenuButton>
                </View>
            </View>
        </View>
    </>
    const landing = <><Text>Carregando</Text></>

    return (
        <View style={styles.container}>
            {!isLoading ? homeDash : <Text>Carregando</Text>}
        </View>
    )
}

export default HomeScreen;