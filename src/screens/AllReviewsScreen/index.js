import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import Header from '../../components/Header';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import ReviewContainer from '../../components/ReviewContainer';
import api from '../../services/api';
import AuthContext from '../../contexts/auth';

const AllReviewsScreen = (props) => {

    //PARA FAZER O FILTRO UTILIZE DOIS CAMPOS (ROTINAS E MATÉRIAS), QUANDO SELECIONAR UMA ROTINA/MATÉRIA
    //PARA FILTRAR A LISTA EDITE O DATA DO FLATLIST FILTRANDO AS REVISÕES

    const { allReviews, setAllReviews, subjects, setSubjects, routines, setRoutines } = useContext(AuthContext)

    const [data, setData] = useState(allReviews)
    const navigation = useNavigation()

    async function handleDeleteReview(review) {

        api.delete('/deleteReview', {
            params: {
                id: review._id
            }
        }).then((response) => {
            alert("Revisão deletada com sucesso!")
        }).catch((err) => {
            alert(err)
        })

        const newData = data.filter(item => item._id != review._id)//to update flatlist
        setData(newData)
        setAllReviews(newData)

        const newSubjects = subjects
        const indexSubject = subjects.findIndex(item => item._id == review.subject_id._id)
        newSubjects[indexSubject].associatedReviews = subjects[indexSubject].associatedReviews.filter(item => review._id != item)
        // console.log(subjects[index].associatedReviews.filter(item => review._id != item))

        const newRoutines = routines
        const indexRoutine = routines.findIndex(item => item._id == review.routine_id._id)
        newRoutines[indexRoutine].associatedReviews = routines[indexRoutine].associatedReviews.filter(item => review._id != item)

        setSubjects(newSubjects)
        setRoutines(newRoutines)
    }

    function handlePressGoBack() {
        navigation.goBack()
        props.route.params.onGoBack(allReviews)
    }

    function handleGoToEditScreen(screenData) {
        navigation.navigate("EditScreen", {
            screenData: screenData,
            onGoBack: handleUpdateDataOnEdit
        })
    }

    function handleUpdateDataOnEdit(passData) {
        console.log(passData)
        const newData = data
        setData([])
        const index = data.findIndex(item => item._id == passData._id)
        newData[index] = passData
        setData(newData)
        // setReviews(newData)
        
    }

    return (
        <View style={styles.container}>
            {data != null &&
                <FlatList 
                    style={styles.flatlist} 
                    data={data}
                    keyExtractor={item => item._id}
                    renderItem={({item}) => <ReviewContainer titleRightButton="DELETAR" data={item} onPressConclude={() => handleDeleteReview(item)} onPressEdit={() => handleGoToEditScreen(item)}/>}
                />
            }
        </View>
    )
    
}

export default AllReviewsScreen;