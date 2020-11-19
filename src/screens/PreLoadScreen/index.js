import React, { useCallback, useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../contexts/auth';

const PreLoadScreen = () => {

    const { setSubjects, setUser, setRoutines, setAllReviews, loadServerData, setPerformance, logoutContext} = useContext(AuthContext);
    const navigation = useNavigation()

    useEffect(() => {
        loadServerData().then((response) => {
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