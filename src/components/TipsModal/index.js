import React from 'react'
import {View, Text, Image} from 'react-native'
import StepModal from "react-native-step-modal"
import styles from './styles'
import postIt from '../../assets/images/tips/post-it.png'
import cloud from '../../assets/images/tips/cloud.png'
import acronimo from '../../assets/images/tips/acronimo.png'

const TipsModal = (props) => {

    let Tips0 = <View style={styles.container}>
        <Text style={styles.desciptionText}>
            Bem vindo{"(a)"} as dicas de estudo!
            {"\n"}
            {"\n"}
            Aqui você irá encontrar dicas variadas para aprimorar a sua qualidade e desempenho nos estudos de modo geral.
            {"\n"}
            {"\n"}
            As dicas são sorteadas aleatoriamente {"(basta selecionar a opção 'Dicas de Estudo' no menu)"}, portanto há chances de você econtrar dicas repetidas.
            Porém, nossa equipe estará buscando e atualizando o Aplicativo com dicas novas constantemente para você.
            {"\n"}
            {"\n"}
            Aproveite!
        </Text>
    </View>

    let Tips1 = <View style={styles.container}>
        <Text style={styles.tipTitle}>Blocos Adesivos!</Text>
        <Image 
            source={postIt}
            style={{width: 350, height: 220}}
        />
        <Text style={styles.descriptionText}>
            O uso de blocos adesivos (ou Post-it) pode ser muito útil
            quando deseja-se fazer pequenas anotações.
        </Text>
    </View>

    let Tips1_1 = <View style={styles.container}>
            <Image 
                source={cloud}
                style={{width: 200, height: 150}}
            />
        <Text style={styles.descriptionText}>
            Eles podem ser utilizados por você para lembrar de uma fórmula mátemática,
            um termo jurídico ou científico, uma regra gramatical, etc.
            {`\n`}
            {`\n`}
            Além disso, você pode espalhar vários pela casa com objetivo de serem utilizados
            como lembretes rápidos, que te ajudarão a recordar mesmo fora do horário de estudos.
        </Text>
    </View>

    let Tips2 = <View style={styles.container}>
        <Text style={styles.tipTitle}>Acrósticos!</Text>
        <Text style={styles.tipSubTitle}>Q = m.L (Quem Matou Lampião?)</Text>
        <Text style={styles.descriptionText}>
            Acrósticos são frases formadas por palavras cuja as letras são dicas para o que precisa ser lembrado.
        </Text>
    </View>

    let Tips2_1 = <View style={styles.container}>
        <Text style={styles.descriptionText}>
            Alguns estudos mostram que o cérebro humano tem grande facilidade em memorizar algo por assimilação.
            {'\n'}
            {'\n'}
            Dessa forma, os acrósticos podem ser muito úteis, principalmente quando usados para lembrar fórmulas matemáticas.
        </Text>
    </View>

    let Tips2_2 = <View style={styles.container}>
        <Text style={styles.descriptionText}>
            É bem provável que durante o colegial você tenha aprendidos algumas frases "macetes"
            ensinadas por professores.
            {'\n'}
            {'\n'}
            Agora é hora de você criar seus próprios acrósticos!
        </Text>
    </View>

    let Tips3 = <View style={styles.container}>
        <Text style={styles.tipTitle}>Acrônimos!</Text>
        <Image
            source={acronimo}
            style={{width: 200, height: 200}}
        />
        <Text style={styles.descriptionText}>
            Acrônimos são palavras formadas com as letras ou sílabas iniciais de uma sequência de palavras, pronunciada sem soletração das letras que a compõem.
        </Text>
    </View>

    let Tips3_1 = <View style={styles.container}>
        <Text style={styles.descriptionText}>
            Palavras pequenas são de mais fácil memorização do que grandes sentenças!
            {'\n'}
            {'\n'}
            Portanto, acrônimos podem te auxiliar bastante na hora recordar termos mais complexos, eles são
            comumente utilizados na ciência para abreviar nomes de doenças, substâncias, processos, etc.
        </Text>
    </View>

    let Tips4 = <View style={styles.container}>
        <Text style={styles.desciptionText}>
            Dica 4
        </Text>
    </View>

    let tipsArray = [[Tips0], [Tips1, Tips1_1], [Tips2, Tips2_1, Tips2_2], [Tips3, Tips3_1], [Tips4]]

    function handleChoiceTips() {
        return 1 + Math.floor(((tipsArray.length) - 1) * Math.random())
    }


    return (
        <StepModal 
            stepComponents={props.handelShowTips0 ? tipsArray[0] : tipsArray[handleChoiceTips()]} 
            handleCloseModal={props.handleCloseModal}
        />
    )
}

export default TipsModal;