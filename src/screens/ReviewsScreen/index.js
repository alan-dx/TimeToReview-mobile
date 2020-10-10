import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import Header from '../../components/Header';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import ReviewContainer from '../../components/ReviewContainer';
import FloatAddButton from '../../components/FloatAddButton';
import api from '../../services/api';
import AuthContext from '../../contexts/auth';

const ReviewsScreen = (props) => {

    const { reviews, setReviews, setSubjects } = useContext(AuthContext)

    const [data, setData] = useState(reviews)
    const navigation = useNavigation()

    async function handleConcludeReview(id) {

        api.post('/concludeReview',null, {
            params: {
                id: id
            }
        }).catch((err) => {
            alert(err)
        })

        const newData = data.filter(item => item._id != id)//to update flatlist, removing the conclude review
        setData(newData)
        setReviews(newData)
    }

    function handlePressGoBack() {
        navigation.goBack()
    }

    function handlePressGoToAddScreen() {
        navigation.navigate("AddScreen", {
            onGoBack: handleUpdateDataOnAdd
        })
    }

    function handleUpdateDataOnAdd(passData) {
        setData([...data, passData])
        setReviews([...reviews, passData])
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
        setReviews(newData)
        

        //TERÁ QUE FAZER A MODIFICAÇÃO NO ARRAY DE MATÉRIAS COMO FOI FEITO NA TELA DE SUBJECTSCREEN, POIS NO CASO DE TROCA DE MATÉRIA VOCÊ TERA QUE REMOVER DO
        //ASSOCIATED REVIEWS DA MATÉRIA ANTERIOR E ADD NA NOVA MATÉRIA
        //ISSO TERÁ RELEVÂNCIA DURANTE A GERAÇÃO DOS GRÁFICOS
    }

    return (
        <View style={styles.container}>
            <Header title='REVISÕES' onPress={handlePressGoBack}>
                <Icon name="left" size={25} color="#025CE2" />
            </Header>
            {data != null &&
                <FlatList 
                    style={styles.flatlist} 
                    data={data}
                    keyExtractor={item => item._id}
                    renderItem={({item}) => <ReviewContainer data={item} onPressConclude={() => handleConcludeReview(item._id)} onPressEdit={() => handleGoToEditScreen(item)}/>}
                />
            }
            <FloatAddButton onPress={handlePressGoToAddScreen}/>
        </View>
    )
    
}

export default ReviewsScreen;