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

    const { allReviews, setReviews, setAllReviews } = useContext(AuthContext)

    const [data, setData] = useState(allReviews)
    const navigation = useNavigation()

    // useEffect(() => {
    //     console.log(allReviews)
    // }, [])

    async function handleConcludeReview(id) {

        api.delete('/deleteReview', {
            params: {
                id: id
            }
        }).then((response) => {
            alert("Revisão deletada com sucesso!")
        }).catch((err) => {
            alert(err)
        })

        const newData = data.filter(item => item._id != id)//to update flatlist
        setData(newData)
        setAllReviews(newData)
    }

    function handlePressGoBack() {
        navigation.goBack()
        props.route.params.onGoBack(allReviews)
    }

    // function handleUpdateDataOnAdd(passData) {
    //     setData([...data, passData])
    //     setReviews([...reviews, passData])
    // }

    function handleGoToEditScreen(screenData) {
        navigation.navigate("EditScreen", {
            screenData: screenData,
            onGoBack: handleUpdateDataOnEdit
        })
    }

    function handleUpdateDataOnEdit(passData) {
        // const newData = data
        // setData([])
        // const index = data.findIndex(item => item._id == passData._id)
        // newData[index] = passData
        // setData(newData)
        // setReviews(newData)
        

        //TERÁ QUE FAZER A MODIFICAÇÃO NO ARRAY DE MATÉRIAS COMO FOI FEITO NA TELA DE SUBJECTSCREEN, POIS NO CASO DE TROCA DE MATÉRIA VOCÊ TERA QUE REMOVER DO
        //ASSOCIATED REVIEWS DA MATÉRIA ANTERIOR E ADD NA NOVA MATÉRIA
        //ISSO TERÁ RELEVÂNCIA DURANTE A GERAÇÃO DOS GRÁFICOS
    }

    return (
        <View style={styles.container}>
            <Header title='TODAS REVISÕES' onPress={handlePressGoBack}>
                <Icon name="left" size={25} color="#025CE2" />
            </Header>
            {data != null &&
                <FlatList 
                    style={styles.flatlist} 
                    data={data}
                    keyExtractor={item => item._id}
                    renderItem={({item}) => <ReviewContainer titleRightButton="DELETAR" data={item} onPressConclude={() => handleConcludeReview(item._id)} onPressEdit={() => handleGoToEditScreen(item)}/>}
                />
            }
        </View>
    )
    
}

export default AllReviewsScreen;