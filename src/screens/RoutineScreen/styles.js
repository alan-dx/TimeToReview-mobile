import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    },
    flatlist: {
        flex: 1
    },
    modalBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    modalCard: {
        height: 250,
        width: 350,
        borderRadius: 10,
        backgroundColor: '#FFF'
    },
    modalHeader: {
        width: '100%',
        height: 50,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#303030',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-around"
    },
    modalHeaderText: {
        marginTop: 6,
        fontFamily: "Poppins-Bold",
        color: '#FFFFFF',
        fontSize: 20
    },
    modalBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    infoBox: {
        width: '90%',
    },
    infoText: {
        fontFamily: 'Archivo',
        fontSize: 14,
        textAlign: 'center',
        color: '#303030'
    },
    buttonBox: {
        flexDirection: 'row'
    }
})

export default styles;