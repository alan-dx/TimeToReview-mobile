import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';

const MenuButton = (props) => {
    return (
        <RectButton style={styles.container}>
            <Text style={styles.buttonTitle}>Revisões</Text>
        </RectButton>
    )
}

export default MenuButton;