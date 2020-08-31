import React from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/Header';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const PerformanceScreen = () => {

    const navigation = useNavigation()

    function handleClickGoBack() {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Header title='MEU DESEMPENHO' onPress={handleClickGoBack}>
                <Icon name="left" size={25} color="#025CE2" />
            </Header>
            <Text>Tela de Performance</Text>
        </View>
    )
    
}

export default PerformanceScreen;