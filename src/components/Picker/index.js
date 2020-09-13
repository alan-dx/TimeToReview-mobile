import React, {useState, useEffect} from 'react';
import styles from './styles';
import { View, Text, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const PickerInfo = (props) => {

    return (
        <View
            style={{
                // The solution: Apply zIndex to any device except Android
                ...(Platform.OS !== 'android' && {
                    zIndex: 10
                }),          
            }}
        >
            <DropDownPicker
            //ESSE VALUE LABEL DO PICKER PODE CAUSAR PROBLEMAS
                items={props.data}
                defaultValue={props.defaultValue}
                labelStyle={styles.label}
                placeholder={props.placeholder}
                containerStyle={styles.container}
                style={styles.picker}
                dropDownStyle={styles.dropdown}
                activeLabelStyle={{color: '#303030'}}
                selectedLabelStyle={{color: '#303030'}}
                onChangeItem={(item) => {props.onChangeItem(item)}}
            />
      </View>
    )
}

export default PickerInfo;