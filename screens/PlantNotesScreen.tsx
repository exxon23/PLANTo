import * as React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import Colors from '../constants/Colors'
import BatteryDetail from '../components/BatteryDetail'
import WateringDetail from '../components/WateringDetail'
import { Device, Note } from '../models/Device'
interface Props {
  route: {
    params: {
      deviceId: string
    }
  }
}

export default function PlantNotesScreen(props: Props) {
  const device: Device = useSelector((state) =>
    state.devices.find((device) => device.id === props.route.params.deviceId),
  )

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.header}>{'BATTERY'}</Text>
          <BatteryDetail remainingDays={device.metadata.battery.remainingDays} />
        </View>
        {device.plant.notes.map((note: Note) => (
          <View key={note.item} style={styles.container}>
            <Text style={styles.header}>{note.item.toUpperCase()}</Text>
            <Text style={styles.description}>{note.description}</Text>
            {note.item === 'watering' ? (
              <WateringDetail lastWatering={device.metadata.soilMoisture.lastWatering} />
            ) : null}
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  container: {
    alignItems: 'center',
    marginVertical: '5%',
  },
  header: {
    fontSize: 16,
    fontFamily: 'roboto-medium',
    color: Colors.primaryText,
  },
  description: {
    marginTop: '2%',
    fontSize: 12,
    fontFamily: 'roboto-light',
    marginHorizontal: '5%',
    textAlign: 'center',
    color: Colors.secondaryText,
  },
})
