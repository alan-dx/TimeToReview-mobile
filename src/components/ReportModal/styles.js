import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
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
        backgroundColor: '#FFF',

    },
    modalHeader: {
        width: '100%',
        height: 50,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,

        marginBottom: 10,
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
        width: '90%',

        marginVertical: 5,
        flexDirection: 'row'
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

        margin: 5
    },
    customButton: {
        height: 50,
        borderRadius: 10,
        width: '90%',
        backgroundColor: '#60c3eb',

        marginTop: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'


    }
})

export default styles;