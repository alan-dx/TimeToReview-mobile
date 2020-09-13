import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import Header from '../../components/Header';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
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

    useEffect(() => {

        const loadDataOnFocusScreen = navigation.addListener('focus', () => {
            loadUserReviews().then((response) => {
                setData(response)
            }).catch((err) => {alert(err)})
        });
    
        return loadDataOnFocusScreen;
      }, [navigation]);

    async function handleDeleteReview(id) {

        api.delete('/deleteReview', {
            params: {
                id: id
            }
        })

        const newData = data.filter(item => item._id != id)
        setData(newData)
    }

    function handlePressGoBack() {
        navigation.goBack()
    }

    function handlePressGoToAddScreen() {
        navigation.navigate("AddScreen")
        console.log(data)
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
                    renderItem={({item}) => <ReviewContainer data={item} onPressConclude={() => handleDeleteReview(item._id)} onPressEdit={() => handleGoToEditScreen(item)}/>}
                />
            }
            <FloatAddButton onPress={handlePressGoToAddScreen}/>
        </View>
    )
    
}

export default ReviewsScreen;