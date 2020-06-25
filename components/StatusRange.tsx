import * as React from 'react'
import * as Icon from '@expo/vector-icons'
import { View, StyleSheet, Text } from 'react-native'

import TouchAble from './common/Touchable'
import Colors from '../constants/Colors'

interface Props {
  icon: string
  iconSet: string
  iconColor: string
  recomendedMin: number
  recomendedMax: number
  value: number
  units: string
  onPress: () => void
}

function calculateRangeBoundaries(min: number, max: number, value: number, initialWidth?: number) {
  const result = {
    recomendedRangeWidth: initialWidth || 100,
    markerContainerLeft: 0,
  }
  const x = ((max - min) * ((100 - result.recomendedRangeWidth) / 2)) / result.recomendedRangeWidth
  if (value >= min && value <= max) {
    // console.log('result.markerContainerLeft', (value - min) / (max - min))
    result.markerContainerLeft = Math.round(((value - min) / (max - min)) * 100)
  } else if (value >= min - x && value <= max + x) {
    result.markerContainerLeft = Math.round(((value - min) / (max - min)) * 100)
  } else if (!(value >= min - x && value <= max + x) && result.recomendedRangeWidth - 10 >= 10) {
    const { recomendedRangeWidth, markerContainerLeft } = calculateRangeBoundaries(
      min,
      max,
      value,
      result.recomendedRangeWidth - 10,
    )
    result.recomendedRangeWidth = recomendedRangeWidth
    result.markerContainerLeft = markerContainerLeft
  }
  // console.log('result', result)

  return result
}
export default function StatusRange(props: Props) {
  const markerPosition = calculateRangeBoundaries(props.recomendedMin, props.recomendedMax, props.value)
  let IconComp = Icon[props.iconSet]

  return (
    <TouchAble onPress={props.onPress}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <IconComp name={props.icon} size={45} color={props.iconColor} />
        </View>
        <View style={styles.rangeContainer}>
          <View style={styles.overallRange}>
            <View
              style={{
                ...styles.recomendedRange,
                width: `${markerPosition.recomendedRangeWidth}%`,
                left: `${(100 - markerPosition.recomendedRangeWidth) / 2}%`,
              }}>
              <View style={{ ...styles.markerContainer, left: `${markerPosition.markerContainerLeft - 50}%` }}>
                <Text numberOfLines={2} style={styles.markerText}>
                  {Math.round(props.value)} {props.units}
                </Text>
                <View style={styles.marker} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchAble>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    maxHeight: '25%',
    alignItems: 'center',
    backgroundColor: Colors.background,
    marginTop: 8,
    paddingVertical: 15,
  },
  iconContainer: {
    flex: 1,
    paddingLeft: 40,
    alignItems: 'center',
  },
  rangeContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  overallRange: {
    backgroundColor: Colors.background,
    width: '100%',
    height: '20%',
    borderRadius: 15,
    elevation: 5,
  },
  recomendedRange: {
    backgroundColor: Colors.primary,
    height: '100%',
    borderRadius: 15,
  },
  markerContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  marker: {
    backgroundColor: Colors.primaryText,
    width: 2,
    height: '200%',
    borderRadius: 2,
  },
  markerText: {
    fontFamily: 'roboto-regular',
    color: Colors.primaryText,
    fontSize: 12,
    width: 50,
    textAlign: 'center',
  },
})
