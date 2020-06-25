import * as React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

import Colors from '../../constants/Colors'

interface Props {
  size?: 'large' | 'small'
  color?: string
}
export default function Loader(props: Props) {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size={props.size || 'large'} color={props.color || Colors.primary} />
    </View>
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
