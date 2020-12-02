import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, FlatList, ToastAndroid } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import ReviewContainer from '../../components/ReviewContainer';
import FloatAddButton from '../../components/FloatAddButton';
import api from '../../services/api';
import AuthContext from '../../contexts/auth';
import CicleContainer from '../../components/CicleContainer';
import timeFormat from '../../utils/formatDateTime';
import AsyncStorage from '@react-native-community/async-storage';


const ReviewsScreen = (props) => {

    // new Date(new Date().setUTCHours(0,0,0,0)) keep the hour in year-month-dayT00:00:00.000Z

    const currentDate = new Date()

    const { reviews, allReviews, setAllReviews, performance, setPerformance, logoutContext } = useContext(AuthContext)

    const [data, setData] = useState(reviews)
    const [dataCycles, setDataCycles] = useState(performance[currentDate.getDay()].cycles)
    const navigation = useNavigation()
    const [startController, setStartController] = useState(true)
    const [reviewInitTime, setReviewInitTime] = useState(new Date())

    const cycleFlatList = useRef(null)

    useEffect(() => {
        console.log(startController)
        navigation.setParams({finishCycleActive: startController})//EM OUTRAS TELAS, TALVEZ SEJA NECESSÁRIO PASSAR SEMPRE COMO TRUE
    }, [startController])

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
                    renderItem={({item}) => <ReviewContainer titleRightButton="CONCLUIR" data={item} onPressConclude={() => handleConcludeReview(item._id)} onPressEdit={() => handleGoToEditScreen(item)}/>}
                />
            }
            <FloatAddButton onPress={handlePressGoToAddScreen}/>
        </View>
    )
    
}

export default ReviewsScreen;