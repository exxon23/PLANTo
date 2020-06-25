import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import moment from 'moment'

import Colors from '../constants/Colors'

interface Props {
  lastWatering: string
}

export default function WateringDetail(props: Props) {
  const daysFromLastWatering = Math.round(moment.duration(moment().diff(props.lastWatering)).asDays())

  return (
    <View style={styles.container}>
      {props.lastWatering ? (
        <Text style={styles.text}>
          Last watering of this flower was {daysFromLastWatering > 0 ? `before ${daysFromLastWatering} days` : ''} at{' '}
          <Text style={styles.value}>{moment(props.lastWatering).format('DD.MM.YYYY HH:MM')}</Text>
        </Text>
      ) : (
        <Text style={styles.text}>No detected watering for this flower yet</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: '2%',
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
