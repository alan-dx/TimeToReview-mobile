import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import ReviewContainer from '../../components/ReviewContainer';
import FloatAddButton from '../../components/FloatAddButton';
import api from '../../services/api';
import AuthContext from '../../contexts/auth';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import CicleContainer from '../../components/CicleContainer';

const ReviewsScreen = (props) => {

    const { reviews, allReviews, setAllReviews, performance, setPerformance } = useContext(AuthContext)

    const [data, setData] = useState(reviews)
    const [dataCycles, setDataCycles] = useState([{init: '00:00', finish: '00:00', reviews: 0, chronometer: '00:00', do: false}])
    const navigation = useNavigation()
    const [startController, setStartController] = useState(true)
    const [chronometer, setChronometer] = useState('00:00')
    const [reviewInitTime, setReviewInitTime] = useState(new Date())
    const [reviewInitTimeShow, setReviewInitTimeShow] = useState('00:00')
    const [reviewFinishTime, setReviewFinishTime] = useState(new Date())
    const [reviewFinishTimeShow, setReviewFinishTimeShow] = useState('00:00')


    async function handleConcludeReview(id) {

        api.post('/concludeReview',null, {
            params: {
                id: id
            }
        }).then((response) => {
            const newAllReviews = allReviews
            const index = allReviews.findIndex(item => item._id == id)
            newAllReviews[index] = response.data
            setAllReviews(newAllReviews)
            
        }).catch((err) => {
            alert(err)
        })

        const currentDate = new Date()
        const newData = data.filter(item => item._id != id)//to update flatlist, removing the conclude review
        setData(newData)
        dataCycles[dataCycles.length - 1].reviews++
        setDataCycles(dataCycles)
        performance[currentDate.getDay()].reviews++
        setPerformance(performance)
    }

    function handlePressGoBack() {
        navigation.goBack()
        props.route.params.onGoBack(allReviews)
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

    function timeFormat(hour, minute) {
        console.log(hour, minute)
        let hourReturn = hour
        let minuteReturn = minute
        
        if (hour < 10) {
            hourReturn = `0${hour}`
        }
        if (minute < 10) {
            minuteReturn = `0${minute}`
        }   

        return `${hourReturn}:${minuteReturn}`

    }

    function handleStartPauseController() {
        const currentDate = new Date()
        if (startController) {
            setStartController(false)
            setReviewInitTime(currentDate)
            // dataCycles[dataCycles.length - 1].init = `${currentDate.getHours()}:${currentDate.getMinutes()}`
            dataCycles[dataCycles.length - 1].init = timeFormat(currentDate.getHours(), currentDate.getMinutes())

            setDataCycles(dataCycles)
            setReviewInitTimeShow(`${currentDate.getHours()}:${currentDate.getMinutes()}`)
        } else {
            setStartController(true)
            setReviewFinishTime(currentDate)
            setReviewFinishTimeShow(`${currentDate.getHours()}:${currentDate.getMinutes()}`)
            console.log(reviewInitTime, reviewFinishTime)
            // setChronometer(`${currentDate.getHours() - currentDate.getHours()}:${currentDate.getMinutes() - reviewInitTime.getMinutes()}`)
            //SE A HORA FOR MAIOR, SIGNIFICA Q OS MINUTOS PODEM DAR NEGATIVO
            //CRIAR O SCROLL COM COMPONENTES FALSOS
            dataCycles[dataCycles.length - 1].finish = timeFormat(currentDate.getHours(), currentDate.getMinutes())
            dataCycles[dataCycles.length - 1].do = true
            dataCycles[dataCycles.length - 1].chronometer = timeFormat(currentDate.getHours() - reviewInitTime.getHours(), currentDate.getMinutes() - reviewInitTime.getMinutes())

            setDataCycles([...dataCycles, {
                init: '00:00', 
                finish: '00:00', 
                reviews: 0, 
                chronometer: '00:00',
                do: false
            }])
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                style={styles.flatlistCycle}
                data={dataCycles}
                
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