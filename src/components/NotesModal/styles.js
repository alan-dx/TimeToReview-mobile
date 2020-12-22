import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    modalBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    modalCard: {
        height: 250,
        width: 350,
        borderRadius: 10,
        backgroundColor: '#FFF',

        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'relative'
    },
    closeButton: {
        backgroundColor: '#FFF',
        borderRadius: 50,

        position: 'absolute',
        marginTop: 10,
        right: 5,
    }
})

export default styles;