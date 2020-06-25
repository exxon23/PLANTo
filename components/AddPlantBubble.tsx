import * as React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import * as Icon from '@expo/vector-icons'

import Layout from '../constants/Layout'
import TouchAble from './common/Touchable'

interface Props {
  onPress: () => void
}

export default function AddPlantBubble(props: Props) {
  return (
    <TouchAble onPress={props.onPress}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Icon.Ionicons name={'ios-add'} size={30} color={'grey'} />
        </View>
        <Text style={styles.header}>Add New</Text>
      </View>
    </TouchAble>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 8,
    width: Layout.window.width / 4,
    height: Layout.window.width / 4 + 60,
  },
  imageContainer: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    width: Layout.window.width / 4,
    borderWidth: 0.1,
    borderColor: 'grey',
    height: Layout.window.width / 4,
    borderRadius: Layout.window.width / 4 / 2,
    elevation: 5,
    backgroundColor: '#fff',
    shadowRadius: Layout.window.width / 4 / 2, // <- Radius of the shadow

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  header: {
    fontFamily: 'roboto-regular',
    fontSize: 15,
  },
})
