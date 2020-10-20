import React, { useContext, useState } from 'react';
import { View, Text, Modal, TouchableHighlight } from 'react-native';
import Header from '../../components/Header';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import FloatAddButton from '../../components/FloatAddButton';
import RoutineContainer from '../../components/RoutineContainer';
import AuthContext from '../../contexts/auth';
import api from '../../services/api';
import MyModal from '../../components/MyModal';

const RoutineScreen = (props) => {

    const {routines, setRoutines, reviews, allReviews} = useContext(AuthContext)

    const [data, setData] = useState(routines)
    const [modalAddVisible, setModalAddVisible] = useState(false)
    const [modalEditVisible, setModalEditVisible] = useState(false)
    const [sequenceRoutine, setSequenceRoutine] = useState('')
    const navigation = useNavigation()
    const [dataToEdit, setDataToEdit] = useState('')

    function handleClickGoBack() {
        navigation.goBack()///THE PROBLEM, HE DON'T DESTROY THE BACK SCREEN
    }

    function handleOpenAddModal() {
        setSequenceRoutine('')
        setModalAddVisible(true)
    }

    function handleCloseAddModal() {
        setModalAddVisible(false)
        setSequenceRoutine('')
        setDataToEdit('')
    }

    function handleCloseModalAndAdd() {

        api.post('/createRoutine', {
            sequence: sequenceRoutine
        }).then((response) => {
            console.log(response.data.routine)
            setData([...data, response.data.routine])
            setRoutines([...data, response.data.routine])
            setModalAddVisible(false)
            setSequenceRoutine('')
            setDataToEdit('')
        }).catch((err) => {
            alert(err)
        })
    }

    function handlePressDeleteRoutine(routine) {
        if (routine.associatedReviews.length == 0) {
            api.delete("/deleteRoutine", {
                params: {
                    id: routine._id
                }
            }).then((response) => {
                alert("Matéria deletada com sucesso!")
                const newData = data.filter(item => item._id != routine._id)
                setData(newData)
                setRoutines(newData)
            }).catch((err) => {
                alert(err)
            })
        } else {
            alert("Você não pode deletar esta rotina, pois ainda há revisões associadas a ela!")
        }
    }

    function handlePressEditRoutine(routine) {
        setModalEditVisible(true)
        setSequenceRoutine(routine.label)
        setDataToEdit(routine._id)
    }

    function handleCloseEditModal() {
        setModalEditVisible(false)
        setSequenceRoutine('')
        setDataToEdit('')
    }

    function handleCloseModalAndEdit() {
        api.put('/editRoutine', {
            sequence: sequenceRoutine
        }, {
            params: {
                id: dataToEdit
            }
        }).then((response) => {

            const newData = data
            setData([])
            const index = newData.findIndex(item => item._id == dataToEdit)
            newData[index] = response.data.routine
            setRoutines(newData)
            setData(newData)

            allReviews.map(item => {
                //EDITA AS INFORMAÇÕES DENTRO DAS REVISÕES QUE ESTAO ASSOCIADAS A ESSA ROTINA
                if (item.routine_id._id == dataToEdit) {
                    console.log('jablau')
                    item.routine_id = response.data.routine
                }
            } )
            // reviews.map(item => {
            //     if (item.routine_id._id == dataToEdit) {
            //         item.routine_id = response.data.routine
            //     }
            // })

            setModalEditVisible(false)
            setSequenceRoutine('')
            setDataToEdit('')
        }).catch((err) => {
            alert(err)
        })
    }

    return (
        <View style={styles.container}>
            <Header title='ROTINAS' onPress={handleClickGoBack}>
                <Icon name="left" size={25} color="#025CE2" />
            </Header>
            {data != null && 
                <FlatList
                    style={styles.flatlist}
                    data={data}
                    keyExtractor={ item => item._id}
                    renderItem={({item}) => <RoutineContainer onPressEdit={() => handlePressEditRoutine(item)} onPressDelete={() => handlePressDeleteRoutine(item)} data={item} />}
                />
            }
            <MyModal
                modalTitle="ADICIONAR ROTINA"
                modalVisible={modalAddVisible}
                handleCloseModal={handleCloseAddModal} 
                handleCloseModalAndAdd={handleCloseModalAndAdd}
                sequenceRoutine={sequenceRoutine}
                setSequenceRoutine={setSequenceRoutine}
            />
            <MyModal
                modalTitle="EDITAR ROTINA"
                modalVisible={modalEditVisible}
                handleCloseModal={handleCloseEditModal}
                handleCloseModalAndAdd={handleCloseModalAndEdit}
                sequenceRoutine={sequenceRoutine}
                setSequenceRoutine={setSequenceRoutine}
                data={dataToEdit}
            />
            <FloatAddButton onPress={handleOpenAddModal} />
        </View>
    )
    
}

export default RoutineScreen;