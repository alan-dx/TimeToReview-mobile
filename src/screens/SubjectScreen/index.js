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
import api from '../../services/api';

const SubjectScreen = (props) => {

    const { subjects, setSubjects, reviews, allReviews } = useContext(AuthContext)
    const [data, setData] = useState(subjects)

    const navigation = useNavigation()

    function handleClickGoBack() {
        navigation.goBack()
    }

    function handlePressGoToAddSubjectScreen() {
        navigation.navigate("AddSubjectScreen", {
            onGoBack: handleUpdateDataOnAdd
        })
    }

    function handleUpdateDataOnAdd(passData) {
        setData([...data, passData.subject])
        setSubjects([...subjects, passData.subject])
    }

    function handlePressGoToEditScreen(screenData) {
        navigation.navigate("EditSubjectScreen", {
            screenData: screenData,
            onGoBack: handleUpdateDataOnEdit
        })
    }

    function handleUpdateDataOnEdit(passData) {

        //map is working here, wtf?
        allReviews.map(item => {//VERIFICAR A POSSIBILIDADE DE USAR PARA ATUALIZAR A FLATLIST OU A SUBJECTS NO CONTEXTO
            //PARA ATUALIZAR A MATÉRIA DENTRO DA REVISÃO A QUAL ESSA ESTA ASSOCIADA, SEM PRECISAR FAZER UMA REQUISIÇÃO
            if (item.subject_id._id == passData._id) {
                item.subject_id = passData
            }
        })
        // reviews.map(item => {
        //     if (item.subject_id._id == passData._id) {
        //         item.subject_id = passData
        //     }
        // })
        const newData = data
        setData([])//For some reason, it is necessary to do this to update the list, perhaps because I am using the method findIndex
        const indexData = newData.findIndex(item => item._id == passData._id)
        newData[indexData] = passData
        
        setData(newData)
        setSubjects(newData)
    }

    function handlePressDeleteSubject(subject) {
        if (subject.associatedReviews.length == 0) {
            api.delete("/deleteSubject", {
                params: {
                    id: subject._id
                }
            }).then((response) => {
                if (response) {
                    alert("Matéria deletada com sucesso!")
                    const newData = data.filter(item => item._id != subject._id)
                    setData(newData)
                    setSubjects(newData)
                }
            }).catch((err) => {
                alert(err)
            })
        } else {
            alert("Você não pode deletar esta matéria, pois ainda há revisões associadas a ela!")
        }
    }



    return (
        <View style={styles.container}>
            {data != null && 
                <FlatList
                    style={styles.flatlist}
                    data={data}
                    keyExtractor={ item => item._id}
                    renderItem={({item}) => <SubjectContainer onPressEdit={() => handlePressGoToEditScreen(item)} onPressDelete={() => handlePressDeleteSubject(item)} data={item} />}
                />
            }
            <FloatAddButton onPress={handlePressGoToAddSubjectScreen}/>
        </View>
    )
    
}

export default SubjectScreen;