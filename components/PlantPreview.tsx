import * as React from 'react'
import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import Layout from '../constants/Layout'
import TouchAble from './common/Touchable'
import Colors from '../constants/Colors'

interface Props {
  title: string
  subtitle: string
  imageUrl: string
  deviceId: string
  navigation: {
    navigate: (screen: string, {}) => void
  }
}

export default function PlantPreview(props: Props) {
  return (
    <View style={styles.preview}>
      <View style={styles.description}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>
      <View style={styles.imageContainer}>
        <TouchAble onPress={() => props.navigation.navigate('PlantNotes', { deviceId: props.deviceId })}>
          <Image style={styles.image} source={{ uri: props.imageUrl }} />
        </TouchAble>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  preview: {
    flexDirection: 'row',
    width: '100%',
    height: Layout.window.width / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    width: '60%',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'roboto-regular',
    color: Colors.primaryText,
    fontSize: 30,
  },
  subtitle: {
    fontSize: 20,
    color: Colors.primaryText,
    fontFamily: 'roboto-light',
  },
  imageContainer: {
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
    width: Layout.window.width / 2,
    height: Layout.window.width / 2,
    borderRadius: Layout.window.width / 2 / 2,
  },
  image: {
    width: '100%',
    borderRadius: Layout.window.width / 2 / 2,
    height: '100%',
  },
})
