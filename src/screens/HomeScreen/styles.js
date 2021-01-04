import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    graphBox: {
        height: '55%',
        backgroundColor:'#F5F5F5',

        alignItems: 'center',
        justifyContent: 'space-between',
    },
    graphBoxTitle: {
        color: '#303030',
        fontFamily: 'DancingScript-Bold',
        fontSize: 22,
    },
    performanceBox: {
        position: 'relative',
        alignItems: 'center',
        marginBottom: 2,
    },
    performanceButtonBox: {
        borderRadius: 8,
        backgroundColor: '#FFF',

        position: 'absolute',
        bottom: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',

        elevation: 4
    },
    performanceButton: {
        backgroundColor: '#60c3eb',
        borderRadius: 8,
        width: 35,
        height: 35,

        alignItems: 'center',
        justifyContent: 'center'
    },
    performanceButtonText: {
        color: '#303030',
        fontFamily: 'Archivo-SemiBold',
        fontSize: 17,

        marginTop: 20
    },
    menuBox: {
        backgroundColor:'#FFFF',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,

        flex: 1,
        paddingHorizontal: 5,
        paddingBottom: 3,

        elevation: 4
    },
    menuRow: {
        flex: 1,
        flexDirection: 'row',
    },
    menuItemBox: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent:'center'
    }
})

export default styles;