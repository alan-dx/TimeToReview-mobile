import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import CustomModal from '../../components/CustomModal';
import DoubtContainer from '../../components/DoubtContainer';
import styles from './styles';

const DoubtsScreen = (props) => {

    const [ handleDoubtModal, setHandleDoubtModal ] = useState(false)
    const [ selectInfoData, setSelectInfoData ] = useState(0)
    const [ infoData ] = useState([
        {
            title: 'Como é realizado o cálculo da próxima revisão?',
            info: 'A data que uma determinada revisão ocorre é determinada pelo ciclo de rotina '+
            'associada a ela, de modo que cada número do ciclo indica a quantidade de dias até a próxima revisão, '+
            'partindo da última data em que o assunto foi revisado. Por exemplo, uma revisão criada dia 20/10, associada ao ciclo 1-3-5, '+
            'seguirá a seguinte sequência de datas: 20/10 (criação) => 21/10 (1) => 24/10 (3) => 29/10 (5) => 04/11 (5). Observe que '+
            'quando o último número da sequênica do ciclo é alcançado todas as datas subsequentes são calculadas a partir dele.',
            key: 0,
        },
        {
            title: 'Por que essa versão do App é paga?',
            info: 'Nos cobramos por essa da aplicação para cobrir os custos associados a ela, tais como: hospedagem do banco de dados, '+
            'domínios WEB, custos da Google Play Store e demais custos operacionais. Além disso, é uma forma de manter e motivar nossa equipe ' +
            'a continuar trabalhando no aplicativo.',
            key: 1,
        },
        {
            title: 'Segurança da conta e privacidade',
            info: 'Segurança no mundo virtual é algo crucial nos tempos modernos, tendo em vista os dados que aqui trafegam. Pensando nisso, '+
            'nosso aplicativo não solicita dados sensíveis aos usuários, solicitamos apenas seu email para criarmos a conta durante '+
            'o cadastro e seu nome por mera formalidade, inclusive esse último não é um campo obrigatório. Além disso, as informações mais cruciais, tal '+
            'como sua senha, são criptografadas e armazenados no banco de dados, já a sua foto de perfil, caso opte por uma, não é armazenada em nossos  '+
            'servidores, mas sim apenas na memória de seu dispositivo. Ademais, todo o sistema de compras no App é gerenciado pela Google Play Store.',
            key: 2,
        },
        {
            title: 'Por que o App necessita de internet?',
            info: 'Para funcionar corretamente nosso aplicativo exige uma conexão com a internet, pois é assim que armazenamos e gerenciamos '+
            'suas revisões, rotinas, matérias e dados.',
            key: 3
        },
        {
            title: 'As revisões são salvas na nuvem?',
            info: 'Sim, suas revisões, matérias e rotinas são armazenados na nuvem. Dessa forma, você não precisa se preocupar com a possível perda '+
            'de seu material em situações como a troca de aparelho ou desinstalação do aplicativo. Para recuperar seus dados, basta acessar a sua conta da Google Play Store e '+
            'baixar essa versão do App novamente.',
            key: 4,
        },
        {
            title: 'Quando sairá as novas funções do App?',
            info: 'As novas funcionalidades do aplicativo já estão em desenvolvimento e em breve estarão disponíveis. Nossa equipe é pequena, mas esta trabalhando constantemente, '+
            'portanto pedimos sua compreensão que em breve seu aplicativo será atualizado. Você pode visualizar o que esta por vir no menu "Futuras atualizações".',
            key: 5
        }
    ])

    function handleCloseDoubtModal() {
        setHandleDoubtModal(false)
    }

    function handleOpenDoubt(key) {
        setHandleDoubtModal(true);
        setSelectInfoData(key)
    }

    return (
        <View style={styles.container}>
            {infoData != null &&
                <FlatList 
                    style={styles.flatlist} 
                    data={infoData}
                    keyExtractor={item => item.key}
                    renderItem={({item}) => <DoubtContainer data={item} handleOpenDoubt={handleOpenDoubt} />}
                />
            }
            {
              handleDoubtModal ?  <CustomModal
                    modalVisible={handleDoubtModal}
                    handleCloseModalButton={handleCloseDoubtModal}
                    modalTitle="INFORMAÇÕES"
                    modalCardHeight={280}
                    didNotShowCheckButton={true}
                >
                    <View style={styles.modalInfoBox}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.textMarker} />
                            <Text style={styles.modalInfoTitle}>{infoData[selectInfoData].title}</Text>
                        </View>
                        <View>
                            <Text style={styles.modalInfoText}>{infoData[selectInfoData].info}</Text>
                        </View>
                    </View>
                </CustomModal> : null
            }
        </View>
    )
}

export default DoubtsScreen;