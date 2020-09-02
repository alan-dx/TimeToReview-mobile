import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import Header from '../../components/Header';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import ReviewContainer from '../../components/ReviewContainer';
import FloatAddButton from '../../components/FloatAddButton';

const ReviewsScreen = () => {

    const navigation = useNavigation()

    const [data, setData] = useState([1,2])

    function handlePressGoBack() {
        navigation.goBack()
    }

    function handlePressGoToAddScreen() {
        // setData([...data, 1])
        navigation.navigate("AddScreen")
    }

    return (
        <View style={styles.container}>
            <Header title='REVISÕES' onPress={handlePressGoBack}>
                <Icon name="left" size={25} color="#025CE2" />
            </Header>
            <FlatList 
                style={styles.flatlist} 
                data={data}
                renderItem={() => <ReviewContainer />}
            >

            </FlatList>

            <FloatAddButton onPress={handlePressGoToAddScreen}/>
        </View>
    )
    
}

export default ReviewsScreen;