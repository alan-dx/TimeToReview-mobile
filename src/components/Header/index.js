import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import { BorderlessButton } from  'react-native-gesture-handler';

const Header = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            {
              props.children && <BorderlessButton onPress={props.onPress} style={{position: 'absolute', left: '2%', alignItems: 'center', justifyContent: 'center'}}>
                    {props.children}
                </BorderlessButton>
            }
        </View>
    );
}

export default Header;