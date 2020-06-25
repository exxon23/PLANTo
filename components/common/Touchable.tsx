import * as React from 'react'
import { TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'

interface Props {
  children: React.ReactChild
  onPress: () => void
}

export default function TouchAble(props: Props) {
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    return <TouchableNativeFeedback {...props}>{props.children}</TouchableNativeFeedback>
  } else {
    return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>
  }
}
