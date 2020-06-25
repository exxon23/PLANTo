import * as React from 'react'
import { LineChart } from 'react-native-chart-kit'
import { View, StyleSheet } from 'react-native'

import { getChartOptions, formatDate } from '../utils/graph'
import Colors from '../constants/Colors'
import { DotContent, DOT_CONTENT_WIDTH } from '../components/DotContent'
import Layout from '../constants/Layout'

interface Props {
  data: {
    value: number
    time: string
  }[]
  interval: 'DAY' | '3DAYS' | 'WEEK' | '2WEEKS'
  units: string
}

export default function LineGraph(props: Props) {
  const [clickedIndex, setClickedIndex] = React.useState<number | undefined>(undefined)
  const { labels, width, dotRadius } = getChartOptions(props.data, props.interval)

  return (
    <View>
      <LineChart
        // withDots={false}
        data={{
          labels,
          datasets: [
            {
              data: props.data.map((d) => d.value),
            },
          ],
        }}
        onDataPointClick={({ index }) => setClickedIndex(index)}
        renderDotContent={({ x, y, index }) => {
          if (index === clickedIndex) {
            const side = x - DOT_CONTENT_WIDTH < 0 ? 'right' : 'left'
            return <DotContent key={index} left={x} top={y} data={props.data[index]} side={side} units={props.units} />
          }
        }}
        width={width}
        height={Layout.window.height / 2}
        formatXLabel={(d) => formatDate(d)}
        withInnerLines={false}
        getDotColor={(_, index: number) => {
          if (index === clickedIndex) {
            return Colors.primary
          } else {
            return Colors.background
          }
        }}
        chartConfig={{
          backgroundColor: Colors.background,
          backgroundGradientFrom: Colors.background,
          backgroundGradientTo: Colors.background,
          decimalPlaces: 2,
          color: () => Colors.primary,
          labelColor: () => Colors.secondaryText,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: dotRadius,
            strokeWidth: '1',
            stroke: Colors.primary,
            strokeOpacity: 1,
          },
        }}
        bezier
        style={styles.graph}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  graph: {
    marginVertical: 8,
  },
})
