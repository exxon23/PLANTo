import * as React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import moment from 'moment'

import Colors from '../constants/Colors'

interface Props {
  top: number
  left: number
  data: {
    value: number
    time: string
  }
  side: 'left' | 'right'
  units: string
}

export const DOT_CONTENT_WIDTH = 120
const DOT_CONTENT_HEIGHT = 50

export function DotContent(props: Props) {
  const {
    top,
    side,
    left,
    units,
    data: { value, time },
  } = props

  return (
    <View
      style={{
        ...styles.container,
        paddingLeft: side === 'left' ? left - DOT_CONTENT_WIDTH : left,
        paddingTop: top - DOT_CONTENT_HEIGHT,
      }}>
      <Text style={styles.text}>
        {moment(time).format('DD.MM.YYYY HH:mm')} {'\n'} <Text style={styles.value}>{value}</Text> {units}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    color: Colors.secondaryText,
  },
  text: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    backgroundColor: Colors.background,
    color: Colors.secondaryText,
    padding: 5,
    fontFamily: 'roboto-light',
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 12,
    width: DOT_CONTENT_WIDTH,
  },
  value: {
    fontFamily: 'roboto-medium',
    color: Colors.primaryText,
  },
})
