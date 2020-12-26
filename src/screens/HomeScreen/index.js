import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, BackHandler } from 'react-native';

import styles from './styles';
import stylesSteps from './stylesSteps';
import AuthContext from '../../contexts/auth';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import MenuButton from '../../components/MenuButton';
import Chart from '../../components/ChartLine';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import ScreenTutorial from '../../components/ScreenTutorial';

const HomeScreen = () => {

    //OPÇÕES (PRO) => REVISÕES, ROTINAS, MATÉRIAS, LISTAR TODAS AS REVISÕES, CONFIGURAÇÕES, SOBRE
    //OPÇÕES (BASIC) => REVISÕES, ROTINAS, LISTAR TODAS AS REVISÕES, MATÉRIAS, CONFIGURAÇÕES, TORNE-SE PREMIUM

    //Gambi? => As react navigation goBack does not cause the screen to render again, the chart was not updating. That was the only functional solution I found.

    const navigation = useNavigation()
    const { performance, subjects, routines, allReviews, setReviews } = useContext(AuthContext);
    const [numberOfReviews, setNumberOfReviews] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [dataChart, setDataChart] = useState(performance)
    const [loadingChart, setLoadingChart] = useState(true)
    const [handleOpenTutorialModal, setHandleOpenTutorialModal] = useState(false)

    useFocusEffect(
        useCallback(() => {
            console.log('homescreen')
            const currentDate = new Date()
            currentDate.setHours(3,0,0,0)
            const filteredReviews = allReviews.filter(item => new Date(item.dateNextSequenceReview) <= currentDate)
            setReviews(filteredReviews)
            setNumberOfReviews(filteredReviews.length)
            setLoadingChart(true)//Gambi

            checkIfItsTheFirstTime()

        }, [allReviews])
    )

    //User tutorial
    let Step0 = <View style={stylesSteps.container}>
        <Text style={stylesSteps.desciptionText}>
            Seja bem vindo a dashboard do TimeToReview!
            {"\n"}
            {"\n"}
            Esse é o menu do aplicativo, onde você poderá navegar pelas telas e acessar as funções do App.
            {"\n"}
            {"\n"}
            Você visualizará um breve tutorial em cada tela que acessar, o objetivo é lhe familiarizar com o ambiente.
        </Text>
    </View>

    async function checkIfItsTheFirstTime() { //See useFocusEffect
        const firstTimeOnScreen = await AsyncStorage.getItem("@TTR:firstTimeHomeScreen")
        console.log('asda', firstTimeOnScreen)
        if (!firstTimeOnScreen) {
            setHandleOpenTutorialModal(true)
            await AsyncStorage.setItem('@TTR:firstTimeHomeScreen', 'true')
        }

    }
    //User tutorial

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
        if (subjects.length != 0 && routines.length != 0) {
            navigation.navigate('PerformanceScreen')
        } else {
            alert('Você ainda não criou uma matéria ou rotina! Elas são necessárias para visualizar os dados de desempenho.')
        }
    }

    function handleGoToBePremiumScreen() {
        navigation.navigate('BePremiumScreen')
    }

    function handleUpdateChartOnBack() {
        console.log('atualizou o gráfico')
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
                        <Icon2 name="pie-chart" size={22} color="#FFF" />
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
                        <Icon name="bulb1" size={23} color="#303030" />
                    </MenuButton>
                </View>
                <View style={styles.menuItemBox}>
                    <MenuButton color="#FFF" textColor="#606060" onPress={handleClickGoToSettingScreen} title="Configurações">
                        <Icon2 name="settings" size={23} color="#303030" />
                    </MenuButton>
                </View>
            </View>
        </View>
        { handleOpenTutorialModal ? 
            <ScreenTutorial steps={[Step0]} /> :
            null
        }
    </>
    const landing = <><Text>Carregando</Text></>

    return (
        <View style={styles.container}>
            {!isLoading ? homeDash : <Text>Carregando</Text>}
        </View>
    )
}

export default HomeScreen;