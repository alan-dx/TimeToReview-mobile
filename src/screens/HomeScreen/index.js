import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, Dimensions, Alert, ActivityIndicator } from 'react-native';

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
import TipsModal from '../../components/TipsModal';

const HomeScreen = () => {

    //OPÇÕES (PRO) => REVISÕES, ROTINAS, MATÉRIAS, LISTAR TODAS AS REVISÕES, CONFIGURAÇÕES, SOBRE
    //OPÇÕES (BASIC) => REVISÕES, ROTINAS, LISTAR TODAS AS REVISÕES, MATÉRIAS, CONFIGURAÇÕES, TORNE-SE PREMIUM

    //Gambi? => As react navigation goBack does not cause the screen to render again, the chart was not updating. That was the only functional solution I found.

    const navigation = useNavigation()
    const { performance, subjects, routines, allReviews, setReviews } = useContext(AuthContext);
    const [numberOfReviews, setNumberOfReviews] = useState(0)
    const [isLoading] = useState(false)
    const [dataChart, setData] = useState(performance)
    const [loadingChart, setLoadingChart] = useState(true)
    const [handleOpenTutorialModal, setHandleOpenTutorialModal] = useState(false)
    const [handleOpenTipsModal, setHandleOpenTipsModal] = useState(false)
    const [handelShowTips0, setHandleShowTips0] = useState(false)

    useFocusEffect(
        useCallback(() => {
            const currentDate = new Date()
            currentDate.setHours(3,0,0,0)
            const filteredReviews = allReviews.filter(item => new Date(item.dateNextSequenceReview) <= currentDate)
            setReviews(filteredReviews)
            setNumberOfReviews(filteredReviews.length)
            // setLoadingChart(true)//Gambi (solved)

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

    function handleUpdateChartOnBack() {
        //to update homescreen chart (solved Gambi)
        // setLoadingChart(false)//Gambi
        setData(performance)
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
            Alert.alert(
                "Ops... calma ai!",
                "Você não criou nenhuma disiciplina/sequência ainda, antes de visualizar os dados de desempenho é necessário ter ao menos uma sequênica e disciplina criadas.",
                [
                  {
                    text: "Ok!",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  }
                ],
                { cancelable: false }
              );
        }
    }

    async function handleOpenTips() {

        const firstTimeOnScreen = await AsyncStorage.getItem("@TTR:firstTimeOpenTips")
        
        if (!firstTimeOnScreen) {
            await AsyncStorage.setItem('@TTR:firstTimeOpenTips', 'true')
            setHandleShowTips0(true)
            setHandleOpenTipsModal(true)
        } else {
            setHandleShowTips0(false)
            setHandleOpenTipsModal(true)
        }

    }

    async function handleCloseTipsModal() {
        setHandleOpenTipsModal(false)
    }

    function handleClickGoToAllReviewsScreen() {
        navigation.navigate("AllReviewsScreen")
    }

    const homeDash = <>
        <View style={styles.graphBox}>
            <Text style={styles.graphBoxTitle}>Você possui {numberOfReviews} revisões pendentes!</Text>
            {/* NESSE GRÁFICO INDICAR A QUANTIDADE DE REVISÕES POR DIA */}
            <Chart showLabel height={Dimensions.get("window").height * 0.3} elevation={2} data={dataChart} />
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
                    <MenuButton color="#FFF" textColor="#606060" onPress={handleClickGoToRoutineScreen} title="Sequências">
                        <Icon name="sync" size={23} color="#303030" />
                    </MenuButton>
                </View>
                <View style={styles.menuItemBox}>
                    <MenuButton color="#FFF" textColor="#606060" onPress={handleClickGoToAllReviewsScreen} title="Todas Revisões">
                        <Icon name="profile" size={23} color="#303030" />
                    </MenuButton>
                </View>
            </View>
            <View style={styles.menuRow}>
                <View style={styles.menuItemBox}>
                    <MenuButton color="#FFF" textColor="#606060" onPress={handleClickGoToSubjectScreen} title="Disciplinas">
                        <Icon name="book" size={23} color="#303030" />
                    </MenuButton>
                </View>
                <View style={styles.menuItemBox}>
                    <MenuButton color="#FFF" textColor="#606060" onPress={handleOpenTips} title="Dica de Estudo">
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
        {
            handleOpenTipsModal ?
            <TipsModal 
                handleCloseModal={handleCloseTipsModal}
                handelShowTips0={handelShowTips0}
            /> :
            null
        }
    </>

    return (
        <View style={styles.container}>
            {!isLoading ? homeDash : <Text>Carregando</Text>}
        </View>
    )
}

export default HomeScreen;