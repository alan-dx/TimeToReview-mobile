import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    },
    flatlist: {
        flex: 1
    },
    filterBox: {
        width: '90%',
        flexDirection: 'row',

        marginBottom: 8,
        marginTop: 2,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    filterText: {
        fontFamily: 'Archivo-Bold',
        color: '#303030'
    },
    filterButton: {
        width: '30%',
        borderRadius: 7,
        flexDirection: 'row',
        backgroundColor: '#FFF',

        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 8,

        elevation: 2
    },
    filterOptionsButton: {
        width: 35,
        borderRadius: 7,
        flexDirection: 'row',
        backgroundColor: '#FFF',

        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 8,
        marginRight: 10,

        elevation: 2
    }
})

export default styles;