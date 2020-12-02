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

    const {routines, setRoutines, logoutContext, allReviews} = useContext(AuthContext)

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

        if (sequenceRoutine) {
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
                console.log(err)
                if (err == 'Error: Request failed with status code 500') {
                    alert("Erro interno do servidor, tente novamente mais tarde!")
                } else if (err = 'Error: Network Error') {
                    alert("Sessão expirada!")
                    logoutContext()
                } else {
                    alert('Houve um erro ao tentar salvar sua rotina no banco de dados, tente novamente!')
                }
            })
        } else {
            setModalAddVisible(false)
            setSequenceRoutine('')
            setDataToEdit('')
        }

    }

    function handlePressDeleteRoutine(routine) {
        if (routine.associatedReviews.length == 0) {
            api.delete("/deleteRoutine", {
                params: {
                    id: routine._id
                }
            }).then((response) => {
                alert("Rotina deletada com sucesso!")
                const newData = data.filter(item => item._id != routine._id)
                setData(newData)
                setRoutines(newData)
            }).catch((err) => {
                console.log(err)
                if (err == 'Error: Request failed with status code 500') {
                    alert("Erro interno do servidor, tente novamente mais tarde!")
                } else if (err = 'Error: Network Error') {
                    alert("Sessão expirada!")
                    logoutContext()
                } else if (err = 'Error: Request failed with status code 401') {
                    alert('Opa! Isso não deveria acontecer, entre em contato com o suporte relatando um erro do tipo NTO')
                } else {
                    alert('Houve um erro ao tentar salvar sua rotina no banco de dados, tente novamente!')
                }
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

        if (sequenceRoutine) {
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
                console.log(err)
                if (err == 'Error: Request failed with status code 500') {
                    alert("Erro interno do servidor, tente novamente mais tarde!")
                } else if (err = 'Error: Network Error') {
                    alert("Sessão expirada!")
                    logoutContext()
                } else {
                    alert('Houve um erro ao tentar salvar sua rotina no banco de dados, tente novamente!')
                }
            })
        } else {
            alert('ROTINA NÃO EDITADA. Você não pode criar uma rotina sem uma sequência de revisão, preencha todos os campos corretamente!')
            setModalEditVisible(false)
            setSequenceRoutine('')
            setDataToEdit('')
        }
    }

    return (
        <View style={styles.container}>
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