import React, { useState, useEffect, useContext } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { BorderlessButton, TextInput } from "react-native-gesture-handler"
import Input from '../../components/Input';
import { useNavigation } from '@react-navigation/native';
import PickerInfo from '../../components/Picker';
import api from '../../services/api';
import AuthContext from '../../contexts/auth';
import AsyncStorage from '@react-native-community/async-storage';

const AddScreen = (props) => {

    const {routines, subjects, setSubjects, setRoutines, setAllReviews, allReviews, logoutContext} = useContext(AuthContext)

    const [titleReview, setTitleReview] = useState('')
    const [subjectReview, setSubjectReview] = useState('')
    const [routineReview, setRoutineReview] = useState('')
    const [dateNextSequenceReview, setDateNextSequenceReview] = useState('');
    const [timerMin, setTimerMin] = useState('')
    const [timerSeg, setTimerSeg] = useState('')

    const navigation = useNavigation();

    function handlePressGoBack() {
        navigation.goBack()
    }

    function showInfo() {
        
        const timer = `${timerMin}:${timerSeg}`
        const currentDate = new Date()
        
        if (!titleReview || !subjectReview || !routineReview || !timerSeg || !timerMin ) {
            alert("Preencha todos os campos!")
        } else {
            api.post('/createReview', {
                title: titleReview,
                timer: timer,
                routine_id: routineReview._id,
                subject_id: subjectReview._id,
                dateNextSequenceReview: dateNextSequenceReview
            }).then((response) => {

                navigation.goBack()
                setAllReviews([...allReviews, response.data])

                subjects.forEach(item => {
                    if (item._id == subjectReview._id) {
                        item.associatedReviews.push(response.data._id)
                    }
                })

                routines.forEach(item => {
                    if (item._id == routineReview._id) {
                        item.associatedReviews.push(response.data._id)
                    }
                })

                if (dateNextSequenceReview.getDate() == currentDate.getDate()) {
                    props.route.params.onGoBack(response.data)
                }

            }).catch((err) => {
                console.log(err)
                if (err == 'Error: Request failed with status code 500') {
                    alert("Erro interno do servidor, tente novamente mais tarde!.")
                } else if (err = 'Error: Network Error') {
                    alert("Sessão expirada!")
                    logoutContext()
                } else {
                    alert('Houve um erro ao tentar salvar sua revisão no banco de dados, tente novamente!')
                }
            })
        }

    }
    //ADICIONAR A DATA DE QUANDO FOI CRIADA
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconsBox}>
                    <BorderlessButton onPress={handlePressGoBack}>
                        <Icon name="close" size={25} color="#F7F7F7" style={styles.iconBack} />
                    </BorderlessButton>
                    <BorderlessButton onPress={showInfo}>
                        <Icon name="check" size={25} color="#F7F7F7" style={styles.iconBack} />
                    </BorderlessButton>
                </View>
                <Text style={styles.headerText}>ADICIONAR REVISÃO</Text>
            </View>
            <View style={styles.main}>
                <View style={styles.dntReview}>
                    <View style={styles.labelIconBox}>
                        <Icon name="calendar" size={20} color="#303030" style={{marginRight: 3}} />
                        <Text style={styles.label}>Data da primeira Revisão</Text>
                    </View>
                    <Text style={styles.subLabel}>{dateNextSequenceReview == "" ? "GERADA AUTOMATICAMENTE AO SELECIONAR UMA ROTINA" : `${dateNextSequenceReview.getDate()}/${dateNextSequenceReview.getMonth()}/${dateNextSequenceReview.getFullYear()}` }</Text>
                </View>
                <View style={styles.inputBox}>
                    <View style={styles.labelBoxL}>
                        <View style={styles.labelFrame} />
                        <Text style={styles.label}>Título da Revisão</Text>
                    </View>
                    <Input value={titleReview} secureTextEntry={false} onChangeText={setTitleReview} textAlign="center" placeholder="EDO DE BERNOULLI" />
                </View>
                <View style={styles.inputBox}>
                    <View style={styles.labelBoxR}>
                        <Text style={styles.label}>Disciplina da Revisão</Text>
                        <View style={styles.labelFrame} />
                    </View>
                    <PickerInfo 
                        placeholder="DISCIPLINA"
                        data={subjects}
                        onChangeItem={setSubjectReview}
                    />
                </View>

                <View style={styles.inputBox}>
                    <View style={styles.labelBoxL}>
                        <View style={styles.labelFrame} />
                        <Text style={styles.label}>Rotina da Revisão</Text>
                    </View>
                    <PickerInfo 
                        placeholder="1-3-5-7-21-30" 
                        data={routines}
                        onChangeItem={(item) => {
                            const currentDate = new Date()
                            setRoutineReview(item)
                            const nextDate = currentDate.getDate() + Number(item.sequence[0])
                            setDateNextSequenceReview(new Date(currentDate.getFullYear(), currentDate.getMonth(), nextDate, 3))
                        }}
                    />
                </View>
                <View style={styles.timerBox}>
                    <View style={styles.labelIconBox}>
                        <Text style={styles.label}>Cronômetro de conclusão</Text>
                        <Icon name="clockcircleo" size={20} color="#303030" style={{marginLeft: 3}} />
                    </View>
                    <View style={styles.timerInputBox}>
                        <TextInput 
                            value={timerMin} 
                            keyboardType="phone-pad" 
                            onChangeText={(text) => {
                                setTimerMin(text)
                                setTimerSeg('00')
                            }} 
                            placeholder="MIN" 
                            style={styles.input}/>
                        <Text style={styles.timerSeparator}>:</Text>
                        <TextInput 
                            value={timerSeg} 
                            keyboardType="phone-pad" 
                            onChangeText={(text) => {
                                setTimerSeg(text)
                            }} 
                            placeholder="SEG" 
                            style={styles.input}/>
                    </View>
                </View> 
            </View>
        </KeyboardAvoidingView>
    )
}

export default AddScreen;