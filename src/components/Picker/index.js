import React, {useState, useEffect} from 'react';
import styles from './styles';
import { View, Text, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const PickerInfo = (props) => {

    // useEffect(() => {
    //     console.log(props.onChangeItem)
    // },[])

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
                items={props.data}
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