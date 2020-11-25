import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    updateBox: {
        width: '100%',
        
        flexDirection: 'row',
        justifyContent: 'center',
    },
    updateTextMarker: {
        width: 12, 
        height: 12, 
        backgroundColor: '#60c3eb',
        borderRadius: 10,

        alignSelf: 'flex-start',
        margin: 5
    },
    updateText: {
        fontFamily: 'Archivo',
        fontSize: 18,
        color: '#303030',
        width: '90%',
        
        textAlign: 'justify'
    },
    updateItemBox: {
        width: '50%',
        marginVertical: 10,
        
        alignItems: 'center',
        
    },
    updateItem: {
        marginBottom: 10,
        width: '100%',
        
        flexDirection: 'row',
        alignItems: 'center',
    },
    updateItemText: {
        fontFamily: 'Archivo',
        color: '#505050',
        fontSize: 15
    },
    feedbackBox: {
        width: '70%',
        alignItems: 'center'
    }
})

export default styles;