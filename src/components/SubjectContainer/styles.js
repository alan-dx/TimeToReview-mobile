import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 60,
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        marginBottom: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleBox: {
        flex: 1,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    titleSubject: {
        fontFamily: 'Archivo-Bold',
        fontSize: 18,
        color: '#303030'
    },
    subjectColorMarker: {
        width: 5,
        height: 60,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        alignSelf: 'flex-start',
        position: 'absolute',
        top: 0,
        left: 0
    },
    infoBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    infoButtonBox: {
        width: '30%',
        backgroundColor: '#025CE2',
        borderTopRightRadius: 7,
        borderTopLeftRadius: 7,
    },
    containerButton: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButton: {
        marginTop: 2,
        color: '#FCFCFC',
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 11
    },
})

export default styles;