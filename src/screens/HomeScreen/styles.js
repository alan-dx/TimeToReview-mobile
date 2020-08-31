import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    graphBox: {
        height: '55%',
        backgroundColor:'#F7F7F7',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
    },
    graph: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    graphBoxTitle: {
        color: '#303030',
        fontFamily: 'DancingScript-Bold',
        fontSize: 17,
    },
    performanceButtonBox: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    performanceButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -7
    },
    performanceButtonText: {
        color: '#303030',
        fontFamily: 'Archivo-Bold',
        fontSize: 20,
    },
    menuBox: {
        flex: 1,
        borderTopColor: '#303030',
        borderTopWidth: 1
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