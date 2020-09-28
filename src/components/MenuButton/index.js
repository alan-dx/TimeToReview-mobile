import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';

const MenuButton = (props) => {
    return (
        <RectButton style={styles.container} onPress={props.onPress}>
            {props.children}
            <Text style={styles.buttonTitle}>{props.title}</Text>
        </RectButton>
    )
}

export default MenuButton;