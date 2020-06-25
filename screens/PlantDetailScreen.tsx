import * as React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'

import { Device } from '../models/Device'
import StatusRange from '../components/StatusRange'
import PlantPreview from '../components/PlantPreview'
import Colors from '../constants/Colors'

interface Props {
  route: {
    params: {
      id: string
      name: string
      imageUrl: string
      plantName: string
    }
  }
  navigation: {
    navigate: (
      screen: string,
      params: {
        name: string
        deviceId: string
        imageUrl: string
        measure: {
          measureTitle: string
          measure: string
          measureUnits: string
        }
      },
    ) => void
  }
}
export default function PlantDetailScreen(props: Props) {
  const {
    route: {
      params: { id, name, imageUrl, plantName },
    },
  } = props
  const device = useSelector((state) => state.devices.find((d: Device) => d.id === props.route.params.id))

  const handlePress = (measureTitle: string, measure: string, measureUnits: string) =>
    props.navigation.navigate('PlantGraph', {
      name: name,
      deviceId: id,
      imageUrl: imageUrl,
      measure: {
        measureTitle,
        measure,
        measureUnits,
      },
    })

  const measuredQuantities = [
    {
      icon: 'air',
      iconSet: 'Entypo',
      iconColor: '#63B3F8',
      recomendedMin: device.plant.humidity.min,
      recomendedMax: device.plant.humidity.max,
      value: Number(device.metadata.humidity.average.lastWeek),
      units: '%',
      onPress: () => handlePress('Air Humidity', 'humidity', '%'),
    },
    {
      icon: 'ios-sunny',
      iconSet: 'Ionicons',
      iconColor: '#F1CD34',
      recomendedMin: device.plant.lightIntensity.min,
      recomendedMax: device.plant.lightIntensity.min,
      value: Number(device.metadata.lightIntensity.average.lastWeek),
      units: 'lux',
      onPress: () => handlePress('Light Intensity', 'lightIntensity', 'lux'),
    },
    {
      icon: 'ios-water',
      iconSet: 'Ionicons',
      iconColor: '#625044',
      recomendedMin: device.plant.soilMoisture.min,
      recomendedMax: device.plant.soilMoisture.max,
      value: Number(device.metadata.soilMoisture.average.lastWeek),
      units: '%',
      onPress: () => handlePress('Soil Moisture', 'soilMoisture', '%'),
    },
    {
      icon: 'temperature-low',
      iconSet: 'FontAwesome5',
      iconColor: '#5A6469',
      recomendedMin: device.plant.temperature.min,
      recomendedMax: device.plant.temperature.max,
      value: Number(device.metadata.temperature.average.lastWeek),
      units: '°C',
      onPress: () => handlePress('Temperature', 'temperature', '°C'),
    },
  ]

  return (
    <SafeAreaView style={styles.screen}>
      <PlantPreview title={name} subtitle={plantName} imageUrl={imageUrl} deviceId={id} navigation={props.navigation} />
      <View style={styles.dataPreview}>
        {measuredQuantities.map((quantity) => (
          <StatusRange
            key={quantity.icon}
            icon={quantity.icon}
            iconSet={quantity.iconSet}
            iconColor={quantity.iconColor}
            recomendedMin={quantity.recomendedMin}
            recomendedMax={quantity.recomendedMax}
            value={quantity.value}
            units={quantity.units}
            onPress={quantity.onPress}
          />
        ))}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: '20%',
    backgroundColor: Colors.background,
  },
  dataPreview: {
    marginTop: 10,
    minHeight: '50%',
  },
})
