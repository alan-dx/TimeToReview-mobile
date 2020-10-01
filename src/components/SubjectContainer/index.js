import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styles from './styles';

const SubjectContainer = (props) => {

    const [modalVisible, setModalVisible] = useState(false)

    // useEffect(() => {
    //     console.log(props)
    // }, [])
    
    return (
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text style={styles.titleSubject}>{props.data.label}</Text>
            </View>
            <Text style={styles.label}>{props.data.associatedReviews.length} REVISÕES ASSOCIADAS</Text>
            <View style={styles.infoBox}>
                <View style={[styles.infoButtonBox, {backgroundColor: '#303030'}]}>
                    <RectButton onPress={props.onPressEdit} style={styles.containerButton}>
                        <Text style={styles.textButton}>EDITAR</Text>
                    </RectButton>
                </View>
                <View style={[styles.infoButtonBox, {backgroundColor: '#025CE2'}]}>
                    <RectButton onPress={() => props.onPressDelete} style={styles.containerButton}>
                        <Text style={styles.textButton}>DELETAR</Text>
                    </RectButton>
                </View>
            </View>
            <View style={[styles.subjectColorMarker, {backgroundColor: props.data.marker}]} />
        </View>
    )
}

export default SubjectContainer;