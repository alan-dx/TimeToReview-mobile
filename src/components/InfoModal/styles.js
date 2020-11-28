import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    modalBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    modalCard: {
        width: 350,
        borderRadius: 10,
        backgroundColor: '#FFF',

        alignItems: "center",
        justifyContent: 'center'

    },
    modalHeader: {
        width: '100%',
        height: 50,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center"
    },
    modalHeaderText: {
        marginTop: 6,
        fontFamily: "Poppins-Bold",
        color: '#FFFFFF',
        fontSize: 20
    },
    infoBox: {
        padding: 8
    },
    infoTitle: {
        fontWeight: 'bold',
    },
    infoText: {
        fontFamily: 'Archivo',
        fontSize: 14,
        textAlign: 'justify',
        color: '#303030',
    },
    textMarker: {
        width: 8, 
        height: 8, 
        backgroundColor: '#303030',
        borderRadius: 10,

        marginVertical: 5,
        marginHorizontal: 10
    }
})

export default styles;