import React, { useCallback, useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../contexts/auth';

const PreLoadScreen = () => {

    const { setSubjects, setRoutines, setReviews, setAllReviews, loadServerData} = useContext(AuthContext);
    const navigation = useNavigation()

    useEffect(() => {
        loadServerData().then((response) => {
            setSubjects(response.data.subjects)
            setRoutines(response.data.routines)
            setReviews(response.data.filterReviews)
            setAllReviews(response.data.reviews)
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