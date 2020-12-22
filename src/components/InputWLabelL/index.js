import React from 'react'
import { View, Text, TextInput } from 'react-native'
import styles from './styles'

const InputWLabelL = (props) => {

    return (
        <View style={styles.inputBox}>
            <View style={styles.labelBoxL}>
                <View style={styles.labelFrame} />
                <Text style={styles.label}>{props.labelTitle}</Text>
            </View>
            {/* <Input value={props.value} secureTextEntry={props.secureTextEntry} onChangeText={props.onChangeText} textAlign="center" placeholder={props.placeholder} /> */}
            <TextInput
                style={[styles.input, {textAlign: props.textAlign}]}
                placeholder={props.placeholder}
                keyboardType={props.keyboardType || "default"}
                placeholderTextColor="#ABABAB"
                onChangeText={props.onChangeText}
                value={props.value}
                secureTextEntry={props.secureTextEntry}
            />
        </View>
    )

}

export default InputWLabelL