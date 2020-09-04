import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { BorderlessButton } from "react-native-gesture-handler"
import Input from '../../components/Input';
import { useNavigation } from '@react-navigation/native';
import PickerInfo from '../../components/Picker';

const AddScreen = () => {

    const navigation = useNavigation();

    function handlePressGoBack() {
        navigation.goBack()
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconsBox}>
                    <BorderlessButton onPress={handlePressGoBack}>
                        <Icon name="close" size={25} color="#F7F7F7" style={styles.iconBack} />
                    </BorderlessButton>
                    <BorderlessButton onPress={handlePressGoBack}>
                        <Icon name="check" size={25} color="#F7F7F7" style={styles.iconBack} />
                    </BorderlessButton>
                </View>
                <Text style={styles.headerText}>ADICIONAR REVISÃO</Text>
            </View>
            <View style={styles.main}>
                <View style={styles.inputBox}>
                    <Text style={styles.inputBoxText}>TÍTULO DA REVISÃO</Text>
                    <Input textAlign="center" placeholder="EDO DE BERNOULLI" />
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputBoxText}>DISCIPLINA DA REVISÃO</Text>
                    <PickerInfo 
                        placeholder="DISCIPLINA"
                        data={[
                            {label: 'CÁLCULO III', value: "CÁLCULO III"},
                            {label: 'FÍSICA III', value: "FÍSICA III"},
                            {label: 'CIRCUITOS I', value: "CIRCUITOS I"},
                            {label: 'TEC. ENG', value: "TEC. ENG"},
                        ]}
                    />
                </View>
                <View style={styles.dateTimeBox}>
                    <View style={styles.iconLabelBox}>
                        <Text style={styles.label}>DATA DA PRIMEIRA REVISÃO</Text>
                        <BorderlessButton>
                            <Icon name="calendar" size={50} color="#303030" />
                        </BorderlessButton>
                        <Text style={styles.labelBottom}>14/12</Text>
                    </View>
                    <View style={styles.iconLabelBox}>
                        <Text style={styles.label}>HORÁRIO DA PRIMEIRA REVISÃO</Text>
                        <BorderlessButton>
                            <Icon textAlign="center" name="clockcircleo" size={50} color="#303030"  />
                        </BorderlessButton>
                        <Text style={styles.labelBottom}>14:22</Text>
                    </View>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputBoxText}>ROTINA DE REVISÃO</Text>
                    <PickerInfo 
                        placeholder="1-3-5-7-21-30" 
                        data={[
                            {label: '1-3-5-7-21-30', value: "1-3-5-7-21-30"},
                            {label: '1-5-7-14-19-30', value: "1-5-7-14-19-30"},
                            {label: '2-6-3-7-25-40', value: "2-6-3-7-25-40"},
                            {label: '4-7-11-17-25-45', value: "4-7-11-17-25-45"},
                        ]}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default AddScreen;