import React, { useContext, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import stylesSteps from './stylesSteps';
import Icon from 'react-native-vector-icons/AntDesign';
import { FlatList } from 'react-native-gesture-handler';
import FloatAddButton from '../../components/FloatAddButton';
import RoutineContainer from '../../components/RoutineContainer';
import AuthContext from '../../contexts/auth';
import api from '../../services/api';
import MyModal from '../../components/MyModal';
import ScreenTutorial from '../../components/ScreenTutorial';
import AsyncStorage from '@react-native-community/async-storage';

const RoutineScreen = (props) => {

    const {routines, setRoutines, logoutContext, allReviews} = useContext(AuthContext)

    const [data, setData] = useState(routines)
    const [modalAddVisible, setModalAddVisible] = useState(false)
    const [modalEditVisible, setModalEditVisible] = useState(false)
    const [sequenceRoutine, setSequenceRoutine] = useState('')
    const [handleOpenTutorialModal, setHandleOpenTutorialModal] = useState(false)
    const [dataToEdit, setDataToEdit] = useState('')

    //User tutorial
    let Step0 = <View style={stylesSteps.container}>
        <Text style={stylesSteps.desciptionText}>
            Seja bem vindo a tela de Rotinas.
            {"\n"}
            {"\n"}
            Aqui é onde você poderá visualizar todas as rotinas criadas. 
            {"\n"}
            {"\n"}
            As rotinas são os ciclos de repetição
            usados no cálculo das datas de revisão de cada conteúdo.
        </Text>
    </View>
    let Step1 = <View style={stylesSteps.container}>
        <View style={stylesSteps.floatAddButton}>
            <Icon name="plus" size={20} color="#FCFCFC" />
        </View>
        <Text style={stylesSteps.desciptionText}>
            Esse é o botão que você ira utilizar quando desejar criar novas rotinas!
            {"\n"}
            {"\n"}
            Por padrão, uma rotina de revisão já vem criada junto com o App. Essa rotina foi desenvolvida pela
            nossa equipe com base na curva de esquecimento, entretanto você é livre para criar suas próprias rotinas personalizadas.
        </Text>
    </View>
    let Step2 = <View style={stylesSteps.container}>
        <RoutineContainer 
            onPressEdit={() => {}} 
            onPressDelete={() => {}}
            data={
                {"associatedReviews": ["1", "2", "3", "4", "5"], "label": "0-1-3-7-14-21-30"}
            }
        />
        <Text style={stylesSteps.desciptionText}>
            Container de rotina.
            {"\n"}
            {"\n"}
            É dessa forma que as suas rotinas irão aparecer, cada container possui a sequência da rotina, quantidade de revisões associadas e 
            dois botões: "EDITAR" e "CONCLUIR". O primeio permite modificar a rotina em questão, já o segundo permite que você apague a rotina.
            {"\n"}
            {"\n"}
            Só será possível apagar uma rotina quando não houver revisões associadas a ela!
        </Text>
    </View>

    useEffect(() => {
        async function checkIfItsTheFirstTime() {
            const firstTimeOnScreen = await AsyncStorage.getItem("@TTR:firstTimeRoutineScreen")
            console.log(firstTimeOnScreen)
            if (!firstTimeOnScreen) {
                setHandleOpenTutorialModal(true)
                await AsyncStorage.setItem('@TTR:firstTimeRoutineScreen', 'true')
            }

        }

        checkIfItsTheFirstTime()
    }, [])
    //User tutorial

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
            { handleOpenTutorialModal ? 
               <ScreenTutorial steps={[Step0, Step1, Step2]} /> 
                : null
            }
        </View>
    )
    
}

export default RoutineScreen;