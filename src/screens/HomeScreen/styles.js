import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    graphBox: {
        height: '55%',
        backgroundColor:'#F7F7F7'
    },
    menuBox: {
        flex: 1,
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