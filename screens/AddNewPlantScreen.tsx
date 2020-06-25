import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Button from '../components/common/Button'
import Colors from '../constants/Colors'

interface Props {
  navigation: {
    navigate: (page: string) => void
  }
}

export default function AddNewPlantScreen(props: Props) {
  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Scan QR Code</Text>
      <Text style={styles.text}>
        Place QR code from your PLANTo sensor inside the frame to scan, please avoid shake to get results quckly.
      </Text>
      <Button title="START" onPress={() => props.navigation.navigate('BarCodeScanner')} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: '40%',
    backgroundColor: Colors.background,
  },
  header: {
    fontFamily: 'roboto-medium',
    fontSize: 30,
    textAlign: 'center',
    color: Colors.primaryText,
  },
  text: {
    fontFamily: 'roboto-light',
    textAlign: 'center',
    marginHorizontal: '5%',
    marginTop: '10%',
    color: Colors.secondaryText,
  },
})
