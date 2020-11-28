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
        fontFamily: 'Archivo',
        fontSize: 15,
        color: '#303030'
    },
    doubtItemButtonBox: {
        width: '10%',
        
        position: 'absolute',
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default styles;