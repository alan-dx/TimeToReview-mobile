import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { BorderlessButton, TextInput } from "react-native-gesture-handler"
import Input from '../../components/Input';
import { useNavigation } from '@react-navigation/native';
import ColorPicker from '../../components/ColorPicker';
import api from '../../services/api';

const EditSubjectScreen = (props) => {

    const screenData = props.route.params.screenData

    const navigation = useNavigation()

    const [titleSubject, setTitleSubject] = useState(screenData.label)
    const [markerSubject, setMarkerSubject] = useState(screenData.marker)

    function handlePressGoBack() {
        navigation.goBack()
    }

    function handleConfirmAdd() {

        if (!titleSubject || !markerSubject) {
            alert("Preencha todos os campos abaixo")
        } else {
            if ((titleSubject != screenData.label) || (markerSubject != screenData.marker)) {
                api.put("/editSubject", {
                    title: titleSubject,
                    marker: markerSubject
                },{
                    params: {
                        id: screenData._id
                    }
                }).then((response) => {
                    if (response) {
                        navigation.goBack()
                        props.route.params.onGoBack(response.data.subject)
                    }
                }).catch((err) => {
                    alert(err)
                })
            } else {
                navigation.goBack()
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconsBox}>
                    <BorderlessButton onPress={handlePressGoBack}>
                        <Icon name="close" size={25} color="#F7F7F7" style={styles.iconBack} />
                    </BorderlessButton>
                    <BorderlessButton onPress={handleConfirmAdd} >
                        <Icon name="check" size={25} color="#F7F7F7" style={styles.iconBack} />
                    </BorderlessButton>
                </View>
                <Text style={styles.headerText}>EDITAR DISCIPLINA</Text>
            </View>
            <View style={styles.main}>
                    <View style={styles.inputBox}>
                        <View style={styles.labelBoxL}>
                            <View style={styles.labelFrame} />
                            <Text style={styles.label}>NOME DA DISCIPLINA</Text>
                        </View>
                    <Input value={titleSubject} secureTextEntry={false} onChangeText={setTitleSubject} textAlign="center" placeholder="EDO DE BERNOULLI" />
                    </View>
                    <View style={styles.inputBox}>
                        <View style={styles.labelBoxR}>
                            <Text style={styles.label}>COR DO MARCADOR</Text>
                            <View style={styles.labelFrame} />
                        </View>
                        <ColorPicker markerSubject={markerSubject} setMarkerSubject={setMarkerSubject} />
                    </View>
            </View>
        </View>
    )
}

export default EditSubjectScreen;