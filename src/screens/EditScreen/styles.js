import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        height: '25%',
        maxHeight: 250,
        width: '100%',
        backgroundColor: '#303030',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconsBox: {
        width: '96%',
        position: 'absolute',
        justifyContent: 'space-between',
        top: 15,
        flexDirection: 'row'
    },
    iconBack: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontFamily: 'Poppins-Bold',
        color: '#F7F7F7',
        fontSize: 32,
        alignSelf: 'center'
    },
    main: {
       flex: 1,
        width: '100%',
        justifyContent: "space-evenly",
    },
    dntReview: {
        width: '100%',
        alignItems: 'center'
    },
    labelIconBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        alignItems: 'center',
    },
    labelBoxL: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'flex-start',
    },
    labelBoxR: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'flex-end',
    },
    labelFrame: {
        height: 1,
        flex: 1,
        backgroundColor: '#3e8cff',
    },
    label: {
        fontFamily: 'Archivo-Bold',
        fontSize: 15,
        marginHorizontal: 3
    },
    subLabel: {
        marginTop: 6,
        color: '#ABABAB',
        fontSize: 14,
        fontFamily: 'Archivo-SemiBold'
    },
    labelTop: {
        fontFamily: 'Archivo-Bold',
        fontSize: 15,
        marginBottom: 4
    },
    labelBottom: {
        fontFamily: 'Archivo-Bold',
        fontSize: 10,
        color: '#ABABAB'
    },
    timerBox: {
        alignItems: 'center'
    },
    timerInputBox: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: 60,
        borderRadius: 13,
        backgroundColor: '#E8E8E8',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'Archivo-SemiBold',
        fontSize: 13,
        color: '#303030'
    },
    timerSeparator: {
        fontFamily: 'Archivo-Bold',
        color: '#303030',
        fontSize: 15,
        margin: 7
    }
})

export default styles;