import * as React from 'react'
import { View, FlatList, StyleSheet, ImageBackground, Alert, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import PlantBubble from '../components/PlantBubble'
import AddPlantBubble from '../components/AddPlantBubble'
import Loader from '../components/common/Loader'
import { Device } from '../models/Device'
import Colors from '../constants/Colors'
import * as devicesActions from '../store/actions/devices'

const addNewPlantBubble = { id: 'add', plusImage: true }

interface Props {
  navigation: {
    navigate: (
      screen: string,
      params: { id: string; name: string; plantName: string; imageUrl: string } | undefined,
    ) => void
  }
}
export default function PlantsPreviewScreen(props: Props) {
  const [loading, setLoading] = React.useState(false)
  const [refreshing, setRefreshing] = React.useState(false)
  const [error, setError] = React.useState(undefined)

  const devices: Device[] = useSelector((state) => state.devices)
  const dispatch = useDispatch()

  const loadDevices = React.useCallback(async () => {
    setError(undefined)
    setRefreshing(true)
    try {
      await dispatch(devicesActions.fetchDevices())
    } catch (err) {
      console.log(err.message)
    }
    setRefreshing(false)
  }, [setError, setRefreshing, dispatch])

  React.useEffect(() => {
    setLoading(true)
    loadDevices().then(() => setLoading(false))
  }, [dispatch, setLoading, loadDevices])

  if (error) {
    Alert.alert('Error by loading list of devices', 'Try it later', [{ text: 'OK' }])
    return <Text>Error by loading list of devices</Text>
  }

  if (loading) {
    return <Loader />
  }

  return (
    <View style={styles.screen}>
      <ImageBackground source={require('../assets/images/preview.jpg')} style={styles.image}>
        <FlatList
          onRefresh={loadDevices}
          refreshing={refreshing}
          contentContainerStyle={styles.list}
          numColumns={3}
          data={[...devices, addNewPlantBubble]}
          keyExtractor={(item: Device | typeof addNewPlantBubble) => item.id}
          renderItem={({ item }: { item: Device | typeof addNewPlantBubble }) => {
            if (item.plusImage) {
              return <AddPlantBubble onPress={() => props.navigation.navigate('AddNewPlant')} />
            } else {
              return (
                <PlantBubble
                  name={item.name}
                  plantName={item?.plant?.displayName || 'unknown'}
                  imageUrl={item?.plant?.image || 'unknown'}
                  onPress={() => {
                    if (item?.metadata && Object.keys(item.metadata).length) {
                      props.navigation.navigate('PlantDetail', {
                        id: item.id,
                        name: item.name,
                        plantName: item.plant.displayName,
                        imageUrl: item.plant.image,
                      })
                    }
                  }}
                />
              )
            }
          }}
        />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.background,
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    marginTop: 20,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
})
