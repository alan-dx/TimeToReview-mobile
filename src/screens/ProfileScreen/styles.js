import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
    },
    header: {
        flex: 2,

        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    welcomeText: {
        fontFamily: 'DancingScript-Bold',
        fontSize: 25,
        color: '#303030',

        marginBottom: 10
    },
    profilePhotoBox: {
        height: 150,
        width: 150,
        borderRadius: 100,
        backgroundColor: '#FFF',
        elevation: 2,
        
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileNameBox: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileEmailBox: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileName: {
        color: '#303030',
        fontFamily: 'DancingScript-Bold',
        fontSize: 25,
        marginBottom: 10
    },
    editButton: {
        width: 20,
        height: 20,

        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileEmail: {
        color: '#707070',
        fontFamily: 'Archivo-Normal',
        fontSize: 14
    },
    infoText: {
        fontFamily: 'Archivo-Bold',
        color: '#303030',
        fontSize: 17,

        marginTop: 8,
    },
    menuBox: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFF',

        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        elevation: 4,
        paddingTop: 10,
    },
    optionContainer: {
        height: 40,
        borderRadius: 20,

        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        marginBottom: 8,
    },
    optionText: {
        color: '#303030',
        fontFamily: 'Archivo-SemiBold',
        fontSize: 15
    },
})

export default styles;