import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';

const MenuButton = (props) => {
    return (
        <RectButton style={styles.container} onPress={props.onPress}>
            <View style={styles.titleBox}>
                <Text style={styles.buttonTitle}>{props.title}</Text>
                {props.children}
            </View>
        </RectButton>
    )
}

export default MenuButton;