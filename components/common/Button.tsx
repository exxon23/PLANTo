import * as React from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'
import TouchAble from './Touchable'
import Loader from './Loader'

interface Props {
  title: string
  loading?: boolean
  onPress: () => void
}

export default function Button(props: Props) {
  return (
    <View style={styles.container}>
      <TouchAble onPress={props.onPress}>
        <View style={styles.button}>
          {props.loading ? (
            <Loader size="small" color={Colors.background} />
          ) : (
            <Text style={styles.text}>{props.title}</Text>
          )}
        </View>
      </TouchAble>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Layout.window.width / 7,
    overflow: 'hidden',
    margin: '10%',
    height: Layout.window.width / 7,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  button: {
    height: Layout.window.width / 7,
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: Layout.window.width / 7,
  },
  text: {
    textAlign: 'center',
    color: Colors.background,
    fontFamily: 'roboto-medium',
    fontSize: Layout.window.width / 7 - Layout.window.width / 14,
  },
})
