import React, {useState} from 'react';
import styles from './styles';
import { View, Text, Platform } from 'react-native';
import ModalSelector from 'react-native-modal-selector';//2 op
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

const PickerInfo = (props) => {

    const [ pickerData, setPickerData ] = useState({
        country: 'uk',
    })

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
            />
      </View>
    )
}

export default PickerInfo;