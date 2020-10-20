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

const EditScreen = (props) => {

    const dataScreen = props.route.params.screenData

    const {routines, subjects, setSubjects, allReviews, setAllReviews } = useContext(AuthContext)

    const [min,seg] = dataScreen.timer.split(':')

    const [titleReview, setTitleReview] = useState(dataScreen.title)
    const [subjectReview, setSubjectReview] = useState(dataScreen.subject_id)
    const [routineReview, setRoutineReview] = useState(dataScreen.routine_id)
    const [dateNextSequenceReview, setDateNextSequenceReview] = useState(new Date(dataScreen.dateNextSequenceReview));
    const [currentSequenceReview, setCurrentSequenceReview] = useState(dataScreen.routine_id.sequence[dataScreen.currentSequenceReview])
    const [timerMin, setTimerMin] = useState(min)
    const [timerSeg, setTimerSeg] = useState(seg)

    const navigation = useNavigation();

    useEffect(() => {
        console.log(subjects)
    }, [])

    function handlePressGoBack() {
        navigation.goBack()
    }

    function showInfo() {

        const timer = `${timerMin}:${timerSeg}`

        let editData = {
            title: titleReview != dataScreen.title ? titleReview : null,
            subject_id: subjectReview._id != dataScreen.subject_id._id ? subjectReview._id : null,
            routine_id: routineReview._id != dataScreen.routine_id._id ? routineReview._id : null,
            timer: timer != dataScreen.timer ? timer : null
        }

        
        if (editData.title || editData.subject_id || editData.routine_id || editData.timer) {
            api.put('/editReview', editData,
            {
                params: {
                    id: dataScreen._id
                }
            }).then((response) => {
                if (response) {
                    const index = allReviews.findIndex(item => item._id == response.data.review._id)
                    const newAllReviews = allReviews
                    newAllReviews[index] = response.data.review

                    setAllReviews(newAllReviews)

                    props.route.params.onGoBack(response.data.review)
                    navigation.goBack()
                } else {
                    alert("Houve um erro durante a edição da revisão, tente novamente!")
                }
            }).catch((err) => {
                alert(err)
            })
        }

        if (subjectReview._id != dataScreen.subject_id._id) {//REPRESENTA A MODIFICAÇÃO DA MATÉRIA, MODIFICA APENAS O NÚMERO DE REVISÕES ASSOCIADAS NA TELA DE MATÉRIAS
            //TENTAR USAR O MAP AO INVES DO setSubjects
            const newSubjects = subjects

            const indexOldSubject = subjects.findIndex(item => item._id == dataScreen.subject_id._id)
            const indexNewSubject = subjects.findIndex(item => item._id == subjectReview._id)

            newSubjects[indexOldSubject].associatedReviews = newSubjects[indexOldSubject].associatedReviews.filter(item => item != dataScreen._id)
            newSubjects[indexNewSubject].associatedReviews.push(dataScreen._id)

            setSubjects(newSubjects)

        }

        if(routineReview._id != dataScreen.routine_id._id) {//REPRESENTA A MODIFICAÇÃO DA MATÉRIA, MODIFICA APENAS O NÚMERO DE REVISÕES ASSOCIADAS NA TELA DE MATÉRIAS
            const newRoutines = routines

            const indexOldRoutine = routines.findIndex(item => item._id == dataScreen.routine_id._id)
            const indexNewRoutine = routines.findIndex(item => item._id == routineReview._id)

            newRoutines[indexOldRoutine].associatedReviews = newRoutines[indexOldRoutine].associatedReviews.filter(item => item != dataScreen._id)
            newRoutines[indexNewRoutine].associatedReviews.push(dataScreen._id)
        }

    }

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
                <Text style={styles.headerText}>EDITAR REVISÃO</Text>
            </View>
            <View style={styles.main}>
                <View style={styles.dntReview}>
                    <View style={styles.labelIconBox}>
                        <Icon name="sync" size={20} color="#303030" style={{marginRight: 3}} />
                        <Text style={styles.label}>Índice de rotina atual:</Text>
                    </View>
                    <Text style={styles.subLabel}>{currentSequenceReview}</Text>
                </View>
                <View style={styles.dntReview}>
                    <View style={styles.labelIconBox}>
                        <Icon name="calendar" size={20} color="#303030" style={{marginRight: 3}} />
                        <Text style={styles.label}>Data da próxima Revisão</Text>
                    </View>
                    <Text style={styles.subLabel}>{`${dateNextSequenceReview.getDate()}/${dateNextSequenceReview.getMonth()+1}/${dateNextSequenceReview.getFullYear()}`}</Text>
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
                        defaultValue={subjectReview.value}
                        onChangeItem={item => {
                            setSubjectReview(item)
                            console.log(item)
                        }}
                    />
                </View>

                <View style={styles.inputBox}>
                    <View style={styles.labelBoxL}>
                        <View style={styles.labelFrame} />
                        <Text style={styles.label}>Rotina de Revisão</Text>
                    </View>
                    <PickerInfo 
                        placeholder="1-3-5-7-21-30" 
                        data={routines}
                        defaultValue={routineReview.value}
                        onChangeItem={(item) => {
                            setRoutineReview(item)
                            if (dataScreen.currentSequenceReview > (item.sequence.length - 1)) {
                                console.log('aq')
                                setCurrentSequenceReview(item.sequence[item.sequence.length - 1])
                            } else {
                                setCurrentSequenceReview(item.sequence[dataScreen.currentSequenceReview])
                            }
                        }}
                    />
                </View>
                <View style={styles.timerBox}>
                    <View style={styles.labelIconBox}>
                        <Text style={styles.label}>Cronômetro de conlusão</Text>
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

export default EditScreen;