import * as React from 'react'
import { View, Text, StyleSheet, Image, Platform } from 'react-native'

import TouchAble from './common/Touchable'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors'
import Loader from './common/Loader'

interface Props {
  name: string
  plantName: string
  imageUrl: string
  onPress: () => void
}

export default function PlantBubble(props: Props) {
  const [imageLoaded, setImageLoaded] = React.useState<boolean>(false)

  return (
    <TouchAble onPress={props.onPress}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            onLoadStart={() => (imageLoaded ? setImageLoaded(false) : null)}
            onLoadEnd={() => setImageLoaded(true)}
            source={{
              uri: props.imageUrl,
            }}
          />
          {imageLoaded ? null : <Loader />}
        </View>
        <Text style={styles.header}>{props.name}</Text>
        <Text numberOfLines={2} style={styles.detail}>
          {props.plantName}
        </Text>
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
    width: Layout.window.width / 4,
    height: Layout.window.width / 4,
    overflow: 'hidden',
    borderRadius: Layout.window.width / 4 / 2,
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
  image: {
    flex: 1,
  },
  header: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'roboto-regular',
    color: Colors.primaryText,
  },
  detail: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'roboto-light',
    color: Colors.secondaryText,
  },
})
