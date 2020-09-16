import React from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styles from './styles';

const SubjectContainer = (props) => {
    
    return (
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text style={styles.titleSubject}>Título da Matéria</Text>
            </View>
            <View style={styles.infoBox}>
                <View style={styles.infoButtonBox}>
                    <RectButton onPress={props.onPress} style={styles.containerButton}>
                        <Text style={styles.textButton}>INFORMAÇÕES</Text>
                    </RectButton>
                </View>
            </View>
            <View style={[styles.subjectColorMarker, {backgroundColor: 'red'}]} />
        </View>
    )
}

export default SubjectContainer;