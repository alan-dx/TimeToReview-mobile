import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: 80,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 10
    },
    titleBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    titleReview: {
        fontFamily: 'Archivo-Bold',
        fontSize: 20
    },
    subjectColorMarker: {
        width: 18,
        height: 20,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        alignSelf: 'flex-start',
        position: 'absolute',
        top: -20,
        left: 15
    },
    optionsBox: {
        flex: 1,
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    DateButtonsBox: {
        width: 114,
    },
    labelDateButtons: {
        fontFamily: 'Archivo-SemiBold',
        color: '#303030',
        fontSize: 12,
        alignSelf: 'center'
    },
    editButtonBox: {
        backgroundColor: '#303030',
        flex: 1,
        borderTopRightRadius: 7,
        borderTopLeftRadius: 7,
    },
    containerButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButton: {
        marginTop: 2,
        color: '#FCFCFC',
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 11
    },
    checkButtonBox: {
        backgroundColor: '#025CE2',
        flex: 1,
        borderTopRightRadius: 7,
        borderTopLeftRadius: 7,
    }
    
})

export default styles;