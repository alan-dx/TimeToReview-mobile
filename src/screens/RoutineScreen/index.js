import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';
import stylesSteps from './stylesSteps';
import Icon from 'react-native-vector-icons/AntDesign';
import { FlatList } from 'react-native-gesture-handler';
import FloatAddButton from '../../components/FloatAddButton';
import RoutineContainer from '../../components/RoutineContainer';
import AuthContext from '../../contexts/auth';
import api from '../../services/api';
import ScreenTutorial from '../../components/ScreenTutorial';
import AsyncStorage from '@react-native-community/async-storage';
import CustomModal from '../../components/CustomModal';

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
            Esta é a tela de Sequências.
            {"\n"}
            {"\n"}
            Aqui é onde você poderá visualizar, criar ou editar as sequências existentes. 
            {"\n"}
            {"\n"}
            As sequências são utilizadas no cálculo das datas em que cada revisão ocorre.
        </Text>
    </View>
    let Step1 = <View style={stylesSteps.container}>
        <View style={stylesSteps.floatAddButton}>
            <Icon name="plus" size={20} color="#FCFCFC" />
        </View>
        <Text style={stylesSteps.desciptionText}>
            Esse é o botão que você ira utilizar quando desejar criar novas sequências!
            {"\n"}
            {"\n"}
            Por padrão, já existe uma sequência de revisão criada automaticamente pelo app, essa sequência foi desenvolvida pela
            nossa equipe com base na curva de esquecimento (verifique a sessão "Sobre" no menu de configurações), entretanto você é livre para criar suas próprias rotinas personalizadas.
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
            Container de Sequência.
            {"\n"}
            {"\n"}
            É dessa forma que as sequências são visualizadas, interaga com o container para deletar ou editar uma sequência.
            {"\n"}
            {"\n"}
            Só será possível deletar uma sequência quando não houver revisões associadas a ela!
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
            setSequenceRoutine('')
            setDataToEdit('')
            alert('Preenhca o campo corretamente!')
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
    
    function handleOnInputChange(text) {
        //previousValue don't worked
        setSequenceRoutine(() => {

            if (text[text.length - 1] != ',' && text[text.length - 1] != '.' && text[text.length - 1] != '-' && text[text.length - 1] != ' ') {
                console.log('sdas')
                if ((text > sequenceRoutine) && (sequenceRoutine.length > 0)) {
                    //String.replace() doesn't worked when repeat a number
                    let text2 = `${text.substr(0, text.length - 1)}-${text.substr(-1,1)}`
    
                    return text2
                } else if (text < sequenceRoutine) {
                    
                    return text.substr(0, text.length - 1)//this delete the last word on string
                } else {
                    //used when sequenceRoutine.length == 0
                    return text
                }
            } else {
                return text.substr(0, text.length - 1)//this delete the last word on string
            }

        })
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
            {
                modalAddVisible ?
                <CustomModal
                    modalTitle="ADICIONAR SEQUÊNCIA"
                    modalVisible={modalAddVisible}
                    handleCloseModalButton={handleCloseAddModal} 
                    handleConfirmModalButton={handleCloseModalAndAdd}
                    modalCardHeight={320}
                >
                    <TextInput
                        style={styles.modalRoutineInput}
                        keyboardType={"number-pad"}
                        value={sequenceRoutine}
                        onChangeText={handleOnInputChange}
                        textAlign="center"
                        placeholder="1-3-7-15-21-30"
                    />
                    <View style={styles.routineModalInfoBox}>
                        <Text style={styles.routineModalInfoText}>
                        Insira a sequência que deseja criar, digite apenas os números, pois a formatação é feita automaticamente. <Text style={{fontWeight: 'bold'}}>Exemplo: (1-3-7-14-21-30)</Text>
                            {'\n'}
                            {'\n'}
                            Lembre-se, cada dígito indica após quantos dias, a partir da última revisão, a revisão associada será realizada, com excessão do primeiro dígito, já que
                            este indica a quantidade de de dias após a criação.
                            {'\n'}
                            {'\n'}
                            Caso deseje que uma revisão seja feita no mesmo dia de sua criação, insira <Text style={{fontWeight: 'bold'}}>0</Text> como primeiro dígito da sequência.
                        </Text>
                    </View>
                </CustomModal> : null
            }
            {
                modalEditVisible ?
                <CustomModal
                    modalTitle="EDITAR SEQUÊNCIA"
                    modalVisible={modalEditVisible}
                    handleCloseModalButton={handleCloseEditModal} 
                    handleConfirmModalButton={handleCloseModalAndEdit}
                    modalCardHeight={320}
                >
                    <TextInput
                        style={styles.modalRoutineInput}
                        keyboardType={"number-pad"}
                        value={sequenceRoutine}
                        onChangeText={handleOnInputChange}
                        textAlign="center"
                        placeholder="1-3-7-15-21-30"
                    />
                    <View style={styles.routineModalInfoBox}>
                    <Text style={styles.routineModalInfoText}>
                            Insira a sequência que deseja criar, digite apenas os números, pois a formatação é feita automaticamente. <Text style={{fontWeight: 'bold'}}>Exemplo: (1-3-7-14-21-30)</Text>
                            {'\n'}
                            {'\n'}
                            Lembre-se, cada dígito indica após quantos dias, a partir da última revisão, a revisão associada será realizada, com excessão do primeiro dígito, já que
                            este indica a quantidade de de dias após a criação.
                            {'\n'}
                            {'\n'}
                            Caso deseje que uma revisão seja feita no mesmo dia de sua criação, insira <Text style={{fontWeight: 'bold'}}>0</Text> como primeiro dígito da sequência.
                        </Text>
                    </View>
                </CustomModal> : null
            }
            <FloatAddButton onPress={handleOpenAddModal} />
            { handleOpenTutorialModal ? 
               <ScreenTutorial steps={[Step0, Step1, Step2]} /> 
                : null
            }
        </View>
    )
    
}

export default RoutineScreen;