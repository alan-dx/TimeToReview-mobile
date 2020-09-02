import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { BorderlessButton } from "react-native-gesture-handler"
import Input from '../../components/Input';

const AddScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconsBox}>
                    <BorderlessButton>
                        <Icon name="close" size={25} color="#F7F7F7" style={styles.iconBack} />
                    </BorderlessButton>
                    <BorderlessButton>
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
                    <Text style={styles.inputBoxText}>MATÉRIA DA REVISÃO</Text>
                    <Input textAlign="center" placeholder="CÁLCULO III" />
                </View>
                <View style={styles.dateTimeBox}>
                    <View style={styles.iconLabelBox}>
                        <Text style={styles.label}>DATA DA PRIMEIRA REVISÃO</Text>
                        <Icon name="calendar" size={50} color="#303030" />
                    </View>
                    <View style={styles.iconLabelBox}>
                        <Text style={styles.label}s>HORÁRIO DA PRIMEIRA REIVSÃO</Text>
                        <Icon textAlign="center" name="clockcircleo" size={50} color="#303030"  />
                    </View>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputBoxText}>ROTINA DE REVISÃO</Text>
                    <Input textAlign="center" placeholder="1-3-7-15-30" />
                </View>
            </View>
        </View>
    )
}

export default AddScreen;