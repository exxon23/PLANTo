import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as Icon from '@expo/vector-icons'

import Colors from '../constants/Colors'

interface Props {
  remainingDays: string
}

function getBatteryCapacity(value: number) {
  const percentage = (value * 100) / 270
  if (percentage >= 75) {
    return 4
  } else if (percentage < 75 && percentage >= 50) {
    return 3
  } else if (percentage < 50 && percentage >= 25) {
    return 2
  } else if (percentage < 25) {
    return 1
  }
}

export default function BatteryDetail(props: Props) {
  return (
    <View style={styles.container}>
      <Icon.FontAwesome
        name={`battery-${getBatteryCapacity(Number(props.remainingDays))}`}
        size={20}
        color={Colors.primary}
        style={styles.icon}
      />
      <Text style={styles.text}>
        Battery remaining <Text style={styles.value}>{props.remainingDays}</Text> days
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: '2%',
  },
  icon: {
    marginHorizontal: 10,
  },
  text: {
    fontSize: 12,
    fontFamily: 'roboto-light',
    marginHorizontal: '5%',
    textAlign: 'center',
    color: Colors.secondaryText,
  },
  value: {
    fontFamily: 'roboto-medium',
    color: Colors.primaryText,
  },
})
