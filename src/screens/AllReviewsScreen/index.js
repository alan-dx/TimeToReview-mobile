import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './styles';
import stylesSteps from './stylesSteps';
import { useNavigation } from '@react-navigation/native';
import ReviewContainer from '../../components/ReviewContainer';
import api from '../../services/api';
import AuthContext from '../../contexts/auth';
import AsyncStorage from '@react-native-community/async-storage';
import ScreenTutorial from '../../components/ScreenTutorial';

const AllReviewsScreen = (props) => {

    //PARA FAZER O FILTRO UTILIZE DOIS CAMPOS (ROTINAS E MATÉRIAS), QUANDO SELECIONAR UMA ROTINA/MATÉRIA
    //PARA FILTRAR A LISTA EDITE O DATA DO FLATLIST FILTRANDO AS REVISÕES

    const { allReviews, setAllReviews, subjects, setSubjects, routines, setRoutines, logoutContext } = useContext(AuthContext)

    const [data, setData] = useState(allReviews)
    const navigation = useNavigation()
    const [handleOpenTutorialModal, setHandleOpenTutorialModal] = useState(false)

    //User tutorial
    let Step0 = <View style={stylesSteps.container}>
        <Text style={stylesSteps.desciptionText}>
            Essa é a tela que irá listar todas as suas revisões.
            {"\n"}
            {"\n"}
            Aqui você pode editar e deletar uma revisão.
        </Text>
    </View>
    let Step1 = <View style={stylesSteps.container}> 
    <ReviewContainer 
            titleRightButton="DELETAR" 
            data={{
                routine_id: {sequence: ["1", "2", "4", "5"]},
                subject_id: {marker: '#60c3eb'},
                timer: '13:00',
                title: 'REVISÃO X',
                notes: {
                    title: 'ratata',
                    note: '',
                    align: 'left'
                },
                track: {
                    id: '11111',
                    url: '11111',
                    type: 'default',
                    title: 'dasdsad',
                    artist: 'asdsdsd',
                    album: 'TTR - audios',
                    artwork: 'https://picsum.photos/100',
                }

            }} 
            onPressConclude={() => {}} 
            onPressEdit={() => {}}
            onPressAudioButton={() => {}}
            onPressNotesButton={() => {}}
        />
        <Text style={stylesSteps.desciptionText}>
            Container de Revisão.
            {"\n"}
            {"\n"}
            É dessa forma que as revisões serão visualizadas. Observe que existe um botão "EDITAR" e outro "APAGAR",
            o primeiro permite que você edite todos os detalhes da revisão, já o segundo deleta permanentemente a revisão.
            {"\n"}
            {"\n"}
            O marcador colorido indica a qual matéria a revisão é associada.
        </Text>
    </View>

    useEffect(() => {
        async function checkIfItsTheFirstTime() {
            const firstTimeOnScreen = await AsyncStorage.getItem("@TTR:firstTimeAllReviewsScreen")
            
            if (!firstTimeOnScreen) {
                setHandleOpenTutorialModal(true)
                await AsyncStorage.setItem('@TTR:firstTimeAllReviewsScreen', 'true')
            }

        }

        checkIfItsTheFirstTime()
    }, [])
    //User tutorial


    async function handleDeleteReview(review) {

        api.delete('/deleteReview', {
            params: {
                id: review._id
            }
        }).then((response) => {
            alert("Revisão deletada com sucesso!")
        }).catch((err) => {
            console.log(err)
            if (err == 'Error: Request failed with status code 500') {
                alert("Erro interno do servidor, tente novamente mais tarde!")
            } else if (err = 'Error: Network Error') {
                alert("Sessão expirada!")
                logoutContext()
            } else if (err = 'Error: Request failed with status code 401') {
                alert('Opa! Isso não deveria acontecer, entre em contato com o suporte relatando um erro do tipo NTO')
            } else {
                alert('Houve um erro ao tentar deltar sua revisão no banco de dados, tente novamente!')
            }
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
            {handleOpenTutorialModal ? 
                <ScreenTutorial 
                    modalVisible={handleOpenTutorialModal}
                    steps={[Step0, Step1]}
                />
                : null
            }
        </View>
    )
    
}

export default AllReviewsScreen;