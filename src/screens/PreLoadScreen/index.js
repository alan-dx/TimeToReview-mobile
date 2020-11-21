import React, { useCallback, useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../contexts/auth';
import notifications from '../../services/notifications';

const PreLoadScreen = () => {

    const { setSubjects, setUser, setRoutines, setAllReviews, loadServerData, setPerformance, logoutContext} = useContext(AuthContext);
    const navigation = useNavigation()

    useEffect(() => {
        loadServerData().then((response) => {
            
            // const reminderTime = new Date(response.data.reminderTime)

            setUser({
                name: response.data.name,
                email: response.data.email,
                reminderTime: response.data.reminderTime
            })
            setSubjects(response.data.subjects)
            setRoutines(response.data.routines)
            // setReviews(response.data.filterReviews)
            setAllReviews(response.data.reviews)

            response.data.performance.forEach(item => {
                item.cycles.forEach(sub => {
                    sub.chronometer = new Date(sub.chronometer)
                })
            })
            
            setPerformance(response.data.performance)
            navigation.reset({
                index: 0,
                routes: [{name: "HomeScreen"}]
            })

            console.log(response.data.reminderTime)

            // console.log(currentDate.getDate())
            // console.log(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), reminderTime.getHours(), reminderTime.getMinutes(), reminderTime.getSeconds()))

            // notifications
            //     .configure()
            //     .localNotificationSchedule(
            //     {
            //         channelId: "default-channel-id",
            //         title:'TimeToReview!',
            //         message:`É hora de revisar, vamos lá?`,
            //         date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), reminderTime.getHours(), reminderTime.getMinutes(), reminderTime.getSeconds()),
            //         vibrate:500,
            //         priority: "high",
            //         allowWhileIdle: true
            //     }
            // )

        }).catch((err) => {
            console.log(err)
            alert("Houve um erro ao carregar as informações, verifique sua conexão!")
            logoutContext()
        })
    }, [])

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Carregando...</Text>
        </View>
    )
    
}

export default PreLoadScreen;