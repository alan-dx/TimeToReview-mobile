import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',

        alignItems: 'center'
    },
    doubtItemBox: {
        width: '95%',
        height: 40,
        backgroundColor: '#FFF',
        elevation: 2,
        borderRadius: 10,
        
        paddingLeft: 5,
        marginVertical: 5,
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative'
    },
    doubtItemText: {
        fontFamily: 'Archivo-SemiBold',
        fontSize: 15,
        color: '#303030'
    },
    doubtItemButtonBox: {
        width: '10%',
        
        position: 'absolute',
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalInfoBox: {
        padding: 8,
        flex: 1
    },
    modalInfoTitle: {
        fontWeight: 'bold',
        color: '#303030',
        fontSize: 14
    },
    modalInfoText: {
        fontFamily: 'Archivo-Medium',
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