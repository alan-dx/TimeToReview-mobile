import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import Header from '../../components/Header';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ReviewContainer from '../../components/ReviewContainer';
import FloatAddButton from '../../components/FloatAddButton';
import api from '../../services/api';

const ReviewsScreen = (props) => {

    const [data, setData] = useState([])
    const navigation = useNavigation()

    //DO TO => Put the functions of the API in a apart file
        
    async function loadUserReviews() {
        try {
            const response = await api.get('/indexReviews')
            return response.data
        } catch (err) {
            alert(err)
        }
    }

    useEffect(() => {//THIS AVOIDS THE BUG OF EXCESSIVE REQUIREMENTS
        
        navigation.addListener('focus', async () => {
            console.log('arrrow')
            setData([])//Necessary to solve the bug: No update the sequence on ReviewContainer
            const newData = await loadUserReviews()
            setData(newData)
        });
    
      }, []);

    async function handleConcludeReview(id) {

        api.post('/concludeReview',null, {
            params: {
                id: id
            }
        }).catch((err) => {
            console.log(err)
        })

        const newData = data.filter(item => item._id != id)//to update flatlist, removing the conclude review
        setData(newData)
    }

    function handlePressGoBack() {
        navigation.goBack()
    }


    function handlePressGoToAddScreen() {
        navigation.navigate("AddScreen")
    }

    function handleGoToEditScreen(screenData) {
        navigation.navigate("EditScreen", screenData)
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