import React, {useState} from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/Header';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import FloatAddButton from '../../components/FloatAddButton';
import SubjectContainer from '../../components/SubjectContainer';

const SubjectScreen = () => {

    const [data, setData] = useState([1,2,3])

    const navigation = useNavigation()

    function handleClickGoBack() {
        navigation.goBack()
    }

    function handlePressGoToAddSubjectScreen() {
        navigation.navigate("AddSubjectScreen")
    }

    return (
        <View style={styles.container}>
            <Header title='MATÉRIAS' onPress={handleClickGoBack}>
                <Icon name="left" size={25} color="#025CE2" />
            </Header>
            {data != null && 
                <FlatList
                    style={styles.flatlist}
                    data={data}
                    renderItem={() => <SubjectContainer onPressInfoButton={() => {}} />}
                />
            }
            <FloatAddButton onPress={handlePressGoToAddSubjectScreen}/>
        </View>
    )
    
}

export default SubjectScreen;