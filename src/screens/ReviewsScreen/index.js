import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, FlatList, ToastAndroid, Text } from 'react-native';
import styles from './styles';
import stylesSteps from './stylesSteps';
import { useNavigation } from '@react-navigation/native';
import ReviewContainer from '../../components/ReviewContainer';
import FloatAddButton from '../../components/FloatAddButton';
import api from '../../services/api';
import AuthContext from '../../contexts/auth';
import CicleContainer from '../../components/CicleContainer';
import timeFormat from '../../utils/formatDateTime';
import AsyncStorage from '@react-native-community/async-storage';
import ScreenTutorial from '../../components/ScreenTutorial';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';


const ReviewsScreen = (props) => {

    const currentDate = new Date()

    const { reviews, allReviews, setAllReviews, performance, setPerformance, logoutContext } = useContext(AuthContext)

    const [data, setData] = useState(reviews)
    const [dataCycles, setDataCycles] = useState(performance[currentDate.getDay()].cycles)
    const navigation = useNavigation()
    const [startController, setStartController] = useState(true)
    const [reviewInitTime, setReviewInitTime] = useState(new Date())
    const [handleOpenTutorialModal, setHandleOpenTutorialModal] = useState(false)

    const cycleFlatList = useRef(null)

    useEffect(() => {
        navigation.setParams({finishCycleActive: startController})
    }, [startController])

    //User tutorial
    let Step0 = <View style={stylesSteps.container}>
        <Text style={stylesSteps.desciptionText}>
            Seja bem vindo a tela de Revisões.
            {"\n"}
            {"\n"}
            Aqui é onde você irá criar, editar e concluir uma revisão pendente.
        </Text>
    </View>
    let Step1 = <View style={stylesSteps.container}>
        <View style={stylesSteps.floatAddButton}>
            <Icon name="plus" size={20} color="#FCFCFC" />
        </View>
        <Text style={stylesSteps.desciptionText}>Esse é o botão que você ira utilizar quando desejar criar novas revisões!</Text>
    </View>
    let Step2 = <View style={stylesSteps.container}>
        <View style={stylesSteps.timerBox}>
            <View style={stylesSteps.timerController}>
                <Icon  name="check" size={25} color="#303030" />
            </View>
            <Text style={stylesSteps.timerText2}>Início: 17:25:32</Text>
                <Text style={stylesSteps.timerText2}> Término: 17:48:12</Text>
                <View>
                    <Text style={stylesSteps.timerText2}>Cont.</Text>
                    <View style={stylesSteps.timerCountReviews}>
                            <Text style={stylesSteps.timerText}>7</Text>
                    </View>
                </View>
                <View style={stylesSteps.timerChronometerBox}>
                    <Text style={stylesSteps.timerText2}>Período</Text>
                    <View style={stylesSteps.timerChronometer}>
                        <Text style={stylesSteps.timerText}>00:27:40</Text>
                    </View>
                </View>
        </View>
        <Text style={stylesSteps.desciptionText}>Esse é o controlador de ciclos.
            {"\n"}
            {"\n"}
            Seu objetivo é auxiliar no gerenciamento do desempenho em cada período de revisão.
            A quantidade de ciclos é definida de acordo com seu método de estudos, você pode fazer todas as revisões do dia de uma única vez ou fazer
            isso em intervalos, fica a seu critério.
            {"\n"}
            {"\n"}
            Ao finalizar um ciclo, outro é criado automaticamente!
        </Text>
    </View>
    let Step3 = <View style={stylesSteps.container}> 
    <ReviewContainer 
            titleRightButton="CONCLUIR" 
            data={{
                routine_id: {sequence: ["1", "2", "4", "5"]},
                subject_id: {marker: '#60c3eb'},
                timer: '13:00',
                title: 'REVISÃO X',

            }} 
            onPressConclude={() => {}} 
            onPressEdit={() => {}} 
        />
        <Text style={stylesSteps.desciptionText}>
            Container de Revisão.
            {"\n"}
            {"\n"}
            É dessa forma que as revisões serão visualizadas. Observe que existe um botão "EDITAR" e outro "CONCLUIR",
            o primeiro permite que você edite todos os detalhes, já o segundo conclue e calcula a data da próxima revisão.
            {"\n"}
            {"\n"}
            O marcador colorido indica a qual matéria a revisão é associada.
        </Text>
    </View>
    let Step4 = <View style={stylesSteps.container}> 
        <Icon2 name="alert-triangle" size={35} color="red" />
        <Text style={stylesSteps.desciptionText}>
            Revisão atrasada!
            {"\n"}
            {"\n"}
            Quando uma revisão estiver em atraso você visualizará esse ícone junto ao container.
        </Text>
    </View>

    useEffect(() => {
        async function checkIfItsTheFirstTime() {
            const firstTimeOnScreen = await AsyncStorage.getItem("@TTR:firstTimeReviewsScreen")
            
            if (!firstTimeOnScreen) {
                setHandleOpenTutorialModal(true)
                await AsyncStorage.setItem('@TTR:firstTimeReviewsScreen', 'true')
            }

        }

        checkIfItsTheFirstTime()
    }, [])
    //User tutorial

    async function handleConcludeReview(id) {
        const currentDate = new Date()

        api.post('/concludeReview',null, {
            params: {
                id: id,
                date: currentDate
            }
        }).then((response) => {
            const newAllReviews = allReviews
            const index = allReviews.findIndex(item => item._id == id)
            newAllReviews[index] = response.data
            setAllReviews(newAllReviews)
            
        }).catch((err) => {
            console.log(err)
            if (err == 'Error: Request failed with status code 500') {
                alert("Erro interno do servidor, tente novamente mais tarde!")
            } else if (err = 'Error: Network Error') {
                alert("Sessão expirada!")
                logoutContext()
            } else {
                alert('Houve um erro ao tentar concluir sua revisão, tente novamente!')
            }
        })

        const newData = data.filter(item => item._id != id)//to update flatlist, removing the conclude review
        setData(newData)
        dataCycles[dataCycles.length - 1].reviews++
        setDataCycles(dataCycles)
        performance[currentDate.getDay()].reviews++
        setPerformance(performance)
        
        if (startController) {
            handleStartPauseController()
        }
    }

    function handlePressGoToAddScreen() {
        navigation.navigate("AddScreen", {
            onGoBack: handleUpdateDataOnAdd
        })
    }

    function handleUpdateDataOnAdd(passData) {
        console.log('essa karalha aq, função updateDataOnAdd')
        setData([...data, passData])
    }

    function handleGoToEditScreen(screenData) {
        navigation.navigate("EditScreen", {
            screenData: screenData,
            onGoBack: handleUpdateDataOnEdit
        })
    }

    function handleUpdateDataOnEdit(passData) {
        const newData = data
        setData([])
        const index = data.findIndex(item => item._id == passData._id)
        newData[index] = passData
        setData(newData)
    }

    async function handleStartPauseController() {
        
        const currentDate = new Date()

        if (startController) {

            setStartController(false)
            setReviewInitTime(currentDate)
            dataCycles[dataCycles.length - 1].init = timeFormat(currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds())

            setDataCycles(dataCycles)

            ToastAndroid.show('Ciclo iniciado!', 1500)

        } else {

            setStartController(true)

            let chronometer = new Date(currentDate - reviewInitTime)
            dataCycles[dataCycles.length - 1].finish = timeFormat(currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds())
            dataCycles[dataCycles.length - 1].do = true
            dataCycles[dataCycles.length - 1].chronometer = chronometer

            dataCycles.push({
                init: '00:00:00', 
                finish: '00:00:00', 
                reviews: 0, 
                chronometer: new Date(new Date().setUTCHours(0,0,0,0)),
                do: false
            })

            // setDataCycles(dataCycles)

            await api.post('/concludeCycle', {
                day: currentDate.getDay(),
                cycles: dataCycles
            }).then((response) => {
                console.log(response.data)
            }).catch((err) => {
                alert(err)
            })

            ToastAndroid.show('Novo ciclo criado!', 1600)

        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                ref={cycleFlatList}
                style={styles.flatlistCycle}
                data={dataCycles}
                keyExtractor={(item, index) => `${index}`}
                onContentSizeChange={() => cycleFlatList.current.scrollToEnd()}
                renderItem={item => 
                    <CicleContainer
                        data={item}
                        handleStartPauseController={handleStartPauseController} 
                        startController={startController} 
                    />
                }
            />
            {data != null &&
                <FlatList 
                    style={styles.flatlist} 
                    data={data}
                    keyExtractor={item => item._id}
                    renderItem={({item}) => <ReviewContainer haveDelay={true} titleRightButton="CONCLUIR" data={item} onPressConclude={() => handleConcludeReview(item._id)} onPressEdit={() => handleGoToEditScreen(item)}/>}
                />
            }
            <FloatAddButton onPress={handlePressGoToAddScreen}/>
            {handleOpenTutorialModal ? 
                <ScreenTutorial 
                    modalVisible={handleOpenTutorialModal}
                    steps={[Step0, Step1, Step2, Step3, Step4]}
                />
                : null
            }
        </View>
    )
    
}

export default ReviewsScreen;