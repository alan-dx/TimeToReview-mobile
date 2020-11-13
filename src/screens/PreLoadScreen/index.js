import React, { useCallback, useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../contexts/auth';

const PreLoadScreen = () => {

    const { setSubjects, setRoutines, setAllReviews, loadServerData, setPerformance} = useContext(AuthContext);
    const navigation = useNavigation()

    useEffect(() => {
        loadServerData().then((response) => {
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
            navigation.navigate("HomeScreen")
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Carregando...</Text>
        </View>
    )
    
}

export default PreLoadScreen;