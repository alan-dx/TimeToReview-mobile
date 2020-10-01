import React, {useContext, useEffect, useState} from 'react';
import { View, Modal, Text } from 'react-native';
import Header from '../../components/Header';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import FloatAddButton from '../../components/FloatAddButton';
import SubjectContainer from '../../components/SubjectContainer';
import AuthContext from '../../contexts/auth';

const SubjectScreen = (props) => {

    const { subjects } = useContext(AuthContext)

    const [data, setData] = useState(subjects)

    const navigation = useNavigation()

    function handleClickGoBack() {
        navigation.goBack()
    }

    function handlePressGoToAddSubjectScreen() {
        navigation.navigate("AddSubjectScreen", {
            onGoBack: updateData
        })
    }

    function handlePressGoToEditScreen(screenData) {
        navigation.navigate("EditSubjectScreen", {
            screenData: screenData
        })
    }

    function updateData(passData) {
        setData([...data, passData.subject])
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
                    keyExtractor={ item => item._id}
                    renderItem={({item}) => <SubjectContainer onPressEdit={() => handlePressGoToEditScreen(item)} data={item} />}
                />
            }
            <FloatAddButton onPress={handlePressGoToAddSubjectScreen}/>
        </View>
    )
    
}

export default SubjectScreen;