import React, { useCallback, useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../contexts/auth';

const PreLoadScreen = () => {

    const { setSubjects, setUser, setRoutines, setAllReviews, loadServerData, setPerformance, logoutContext, setLastWeekPerformance} = useContext(AuthContext);
    const navigation = useNavigation()

    useEffect(() => {
        loadServerData().then((response) => {
            
            // const reminderTime = new Date(response.data.reminderTime)
            console.log(response.data.performance)
            console.log('sub',response.data.subjects)
            console.log('sub',response.data.routines)

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

            response.data.lastWeekPerformance.forEach(item => {
                item.cycles.forEach(sub => {
                    sub.chronometer = new Date(sub.chronometer)
                })
            })

            setLastWeekPerformance(response.data.lastWeekPerformance)
            setPerformance(response.data.performance)

            navigation.reset({
                index: 0,
                routes: [{name: "HomeScreen"}]
            })

            console.log(response.data.reminderTime)

        }).catch((err) => {
            alert('Sessão expirada!')
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