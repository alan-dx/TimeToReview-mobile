import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
} from 'react-native';

import {PieChart} from 'react-native-charts-wrapper';

class ChartPiee extends React.Component {

  constructor() {
    super();

    this.state = {
      legend: {
        enabled: true,
        textSize: 10,
        form: 'CIRCLE',

        horizontalAlignment: "RIGHT",
        verticalAlignment: "CENTER",
        orientation: "VERTICAL",
        wordWrapEnabled: true
      },
      data: {
        dataSets: [{
          values: [{value: 19, label: 'CÁLCULO G'},
            {value: 44, label: 'FÍSICA III'},
            {value: 13, label: 'MEC.SÓLIDOS'},
            {value: 41, label: 'CIRCUITOS 1'},
            {value: 35, label: 'TEC. MATERIAIS'},
            {value: 29, label: 'CDA'},
            {value: 17, label: 'SISPOT 1'},
            {value: 20, label: 'LEGISLAÇÂO'},
          ],
          label: '',
          config: {
            colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C'), processColor('#e1a213'), processColor('#FF8C9D'), processColor('#881fa2'), processColor('#22f123'), processColor('#77faff')],
            valueTextSize: 13,
            valueTextColor: processColor('#303030'),
            sliceSpace: 5,
            selectionShift: 13,
            // xValuePosition: "OUTSIDE_SLICE",
            // yValuePosition: "OUTSIDE_SLICE",
            valueFormatter: "#.#'%'",
            valueLineColor: processColor('green'),
            valueLinePart1Length: 0.5
          }
        }],
      },
      highlights: [{x:2}],
      description: {
        text: '',
        textSize: 15,
        textColor: processColor('darkgray'),
      }
    };
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null || entry.label == undefined) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: `${entry.label}: ${entry.value} Revisões`})
    }

    console.log(event.nativeEvent)
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.chartContainer}>
            <PieChart
                style={styles.chart}
                logEnabled={true}
                chartBackgroundColor={processColor('#FFF')}
                chartDescription={this.state.description}
                data={this.state.data}
                legend={this.state.legend}
                highlights={this.state.highlights}

                extraOffsets={{left: 5, top: 5, right: 5, bottom: 5}}

                entryLabelColor={processColor('green')}
                entryLabelTextSize={12}
                entryLabelFontFamily={'HelveticaNeue-Medium'}
                drawEntryLabels={false}

                rotationEnabled={true}
                rotationAngle={45}
                usePercentValues={true}
                styledCenterText={{text:'Porcentagem por matéria', color: processColor('#303030'), fontFamily: 'HelveticaNeue-Medium', size: 12}}
                centerTextRadiusPercent={100}
                holeRadius={40}
                holeColor={processColor('#FFF')}
                transparentCircleRadius={45}
                transparentCircleColor={processColor('#F7F7F7')}
                maxAngle={350}
                onSelect={this.handleSelect.bind(this)}
                onChange={(event) => console.log(event.nativeEvent)}
            />
          </View>
          <View>
              <Text  style={styles.selectText}>{this.state.selectedEntry}</Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 20,
  },
  chartContainer: {
    flex: 1,
    marginTop: 25
  },
  chart: {
    flex: 1,
  },
  selectText: {
      fontFamily: "Archivo-Bold",
      alignSelf: 'center',
      color: '#606060'

  }
});

export default ChartPiee;