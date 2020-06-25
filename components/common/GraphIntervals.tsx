import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import TouchAble from './Touchable'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'

interface Props {
  active: string
  intervals: string[]
  onPress: (interval: string) => void
}

export default function GraphIntervals(props: Props) {
  return (
    <View style={styles.container}>
      {props.intervals.map((interval) => {
        const actualStyle = interval === props.active ? styles.active : {}
        return (
          <TouchAble key={interval} onPress={() => props.onPress(interval)}>
            <Text style={{ ...styles.text, ...actualStyle }}>{interval}</Text>
          </TouchAble>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    color: Colors.secondaryText,
    fontFamily: 'roboto-light',
    width: '25%',
    textAlign: 'center',
  },
  active: {
    color: Colors.primaryText,
    textDecorationLine: 'underline',
    fontFamily: 'roboto-medium',
  },
})
