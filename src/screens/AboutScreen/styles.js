import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    aboutBox: {
        width: '100%',
        flex: 1,
    },
    logoBox: {
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textMarker: {
        width: 6, 
        height: 6,
        backgroundColor: '#303030',
        borderRadius: 10,

        margin: 5,
        marginTop: 10
    },
    aboutTextBox: {
        flexDirection: 'row',
        marginVertical: 5,

    },
    aboutText: {
        fontFamily: 'Archivo',
        fontSize: 16,
        color: '#303030',
        width: '90%',
        
        textAlign: 'justify'
    },
    aboutItemBox: {
        width: '50%',
        marginVertical: 10,
        
        alignItems: 'center',
        
    },
    aboutItem: {
        marginBottom: 10,
        width: '100%',
        
        flexDirection: 'row',
        alignItems: 'center',
    },
    aboutItemText: {
        fontFamily: 'Archivo',
        color: '#505050',
        fontSize: 15
    },
    feedbackBox: {
        width: '70%',
        alignItems: 'center'
    },
    titleChart: {
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Archivo'
    }
})

export default styles;