import React from 'react';
import { TextInput } from 'react-native';
import styles from './styles';

const Input = (props) => {
    return (
        <TextInput
            style={[styles.input, {textAlign: props.textAlign}]}
            placeholder={props.placeholder}
            placeholderTextColor="#ABABAB"
            onChangeText={() => {}}
            value={props.value}
            secureTextEntry={true}
        />
    )
}

export default Input;