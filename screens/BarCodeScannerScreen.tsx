import * as React from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Text, View, StyleSheet, Button } from 'react-native'

import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

export default function BarCodeScreen(props) {
  const [hasPermission, setHasPermission] = React.useState(null)
  const [isWrongQrCode, setIsWrongQrCode] = React.useState(false)

  React.useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`)
    if (data.match(/^[0-9a-fA-F]{24}$/)) {
      props.navigation.navigate('NewPlantForm', { deviceId: data })
    } else {
      setIsWrongQrCode(true)
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.screen}>
      <View style={styles.scannerContainer} />
      <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} barCodeTypes={['qr']} style={styles.scanner} />

      {isWrongQrCode && (
        <Button
          color={Colors.primary}
          title={'Not valid QR code, tap to scan again'}
          onPress={() => setIsWrongQrCode(false)}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: Colors.background,
  },
  scannerContainer: {
    borderWidth: 1,
    borderColor: 'white',
    width: Layout.window.width / 1.5,
    height: Layout.window.width / 1.5,
    left: Layout.window.width / 6,
    top: Layout.window.height / 1.5,
    zIndex: 1000,
  },
  scanner: {
    width: '100%',
    height: '100%',
  },
})
