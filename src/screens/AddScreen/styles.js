import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
    },
    header: {
        height: '25%',
        maxHeight: 250,
        width: '100%',
        backgroundColor: '#303030',
        alignItems: 'center',
        justifyContent: 'center'
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
        height: '60%',
        width: '100%',
        justifyContent: "space-evenly",
    },
    inputBox: {
        alignItems: 'center'
    },
    inputBoxText: {
        fontFamily: 'Archivo-Bold',
        fontSize: 15
    },
    dateTimeBox: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    iconLabelBox: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontFamily: 'Archivo-Bold',
        fontSize: 10,
        marginBottom: 4
    },
    labelBottom: {
        fontFamily: 'Archivo-Bold',
        fontSize: 11,
        marginTop: 4
    }
})

export default styles;