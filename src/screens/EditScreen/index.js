import React, { useState, useEffect, useContext } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { BorderlessButton } from "react-native-gesture-handler"
import Input from '../../components/Input';
import { useNavigation } from '@react-navigation/native';
import PickerInfo from '../../components/Picker';
import { DTPicker} from '../../components/DateTimePicker';
import api from '../../services/api';

const EditScreen = (props) => {

    const dataScreen = props.route.params

    const [titleReview, setTitleReview] = useState(dataScreen.title)
    const [subjectReview, setSubjectReview] = useState(dataScreen.subject)
    const [dateTimeReview, setDateTimeReview] = useState(new Date(dataScreen.fullDateTime));//Mandar a data toda e não so formatada PRO BANCO DE DADOS
    const [routineReview, setRoutineReview] = useState(dataScreen.routine)

    const [date, setDate] = useState('');
    const [hour, setHour] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        console.log(dataScreen)
        let hour = dateTimeReview.getHours()
        let minutes = dateTimeReview.getMinutes()
        let date = dateTimeReview.getDate()
        let month = dateTimeReview.getMonth() + 1

        if (hour < 10) {
            hour = `0${hour}`
        }
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        if (date < 10) {
            date = `0${date}`
        }
        if (month < 10) {
            month = `0${month}`
        }

        setDate(`${date}/${month}`)
        setHour(`${hour}:${minutes}`)

    }, [dateTimeReview])


    function handlePressGoBack() {
        navigation.goBack()
    }

    function showInfo() {
        
        api.put('/editReview', {
            title: titleReview,
            date: date,
            hour: hour,
            fullDateTime: dateTimeReview,
            routine: routineReview,
            routine_id: "123456",
            subject: subjectReview,
            subject_id: "123456"
        }, {
            params: {
                id: dataScreen._id
            }
        }).then((response) => {
            if (response) {
                navigation.goBack()
            } else {
                alert("Houve um erro na edição, tente novamente!")
            }
        }).catch((err) => {
            console.log(err)
        })

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
                <View style={styles.inputBox}>
                    <Text style={styles.inputBoxText}>TÍTULO DA REVISÃO</Text>
                    <Input value={titleReview} secureTextEntry={false} onChangeText={setTitleReview} textAlign="center" placeholder="EDO DE BERNOULLI" />
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputBoxText}>DISCIPLINA DA REVISÃO</Text>
                    <PickerInfo 
                        placeholder="DISCIPLINA"
                        data={[
                            {label: 'CÁLCULO III', value: "CÁLCULO III", _id: "ahdasdhuqweyqwueyhd"},
                            {label: 'FÍSICA III', value: "FÍSICA III", _id: "ahdasdhiiqweyqwueyhd"},
                            {label: 'CIRCUITOS I', value: "CIRCUITOS I", _id: "ahdasdhuqweyqwueiud"},
                            {label: 'TEC. ENG', value: "TEC. ENG", _id: "ahdasdhuqw87yqwueyhd"},
                        ]}
                        defaultValue={dataScreen.subject.value}
                        onChangeItem={setSubjectReview}
                    />
                </View>
                <View style={styles.dateTimeBox}>
                    <View style={styles.labelBox}>
                        <Text style={styles.labelTop}>DATA DA PRIMEIRA REVISÃO</Text>
                        <Text style={styles.labelTop}>HORÁRIO DA PRIMEIRA REVISÃO</Text>
                    </View>
                    <DTPicker dateTimeReview={dateTimeReview} onChange={setDateTimeReview}/>
                    <View style={styles.labelBox}>
                        <Text style={styles.labelBottom}>{date}</Text>                       
                        <Text style={styles.labelBottom}>{hour}</Text>                       
                    </View>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputBoxText}>ROTINA DE REVISÃO</Text>
                    <PickerInfo 
                        placeholder="1-3-5-7-21-30" 
                        data={[
                            {label: '1-3-5-7-21-30', value: "1-3-5-7-21-30"},
                            {label: '2-6-3-7-25-40', value: "2-6-3-7-25-40"},
                            {label: '4-7-11-17-25-45', value: "4-7-11-17-25-45"},
                            {label: '5-7-14-17-25-45', value: "5-7-14-17-25-45"},
                            {label: '6-7-14-17-25-45', value: "6-7-14-17-25-45"},
                        ]}
                        defaultValue={dataScreen.routine.value}
                        onChangeItem={setRoutineReview}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default EditScreen;