import * as React from 'react'
import { View, StyleSheet, ScrollView, Alert } from 'react-native'
import moment from 'moment'

import LineGraph from '../components/LineGraph'
import GraphIntervals from '../components/common/GraphIntervals'
import PlantPreview from '../components/PlantPreview'
import Colors from '../constants/Colors'
import Loader from '../components/common/Loader'
import Layout from '../constants/Layout'
import { fetchMeasureData } from '../utils/api'

interface Props {
  navigation: {
    navigate: () => void
  }
  route: {
    params: {
      deviceId: string
      measure: {
        measure: string
        measureTitle: string
        measureUnits: string
      }
      name: string
      imageUrl: string
    }
  }
}

interface Interval {
  title: 'DAY' | '3DAYS' | 'WEEK' | '2WEEKS'
  units: 'days' | 'weeks' | 'month'
  subtractUnits: moment.DurationInputArg1
}

const INTERVALS: Interval[] = [
  {
    title: 'DAY',
    units: 'days',
    subtractUnits: 1,
  },
  {
    title: '3DAYS',
    units: 'days',
    subtractUnits: 3,
  },
  {
    title: 'WEEK',
    units: 'weeks',
    subtractUnits: 1,
  },
  {
    title: '2WEEKS',
    units: 'weeks',
    subtractUnits: 2,
  },
]

export default function PlantGraphScreen(props: Props) {
  const [data, setData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [selectedInterval, setSelectedInterval] = React.useState<Interval>({
    title: 'DAY',
    units: 'days',
    subtractUnits: 1,
  })

  const {
    route: {
      params: { deviceId, measure, name, imageUrl },
    },
  } = props

  React.useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        const measuredData = await fetchMeasureData(deviceId, measure.measure, selectedInterval)
        setData(measuredData)
      } catch (err) {
        Alert.alert('Error by fetching measured data', 'Try it again later', [{ text: 'OK' }])
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [setIsLoading, measure, deviceId, selectedInterval])

  return (
    <View style={styles.screen}>
      <PlantPreview
        title={name}
        subtitle={measure.measureTitle}
        imageUrl={imageUrl}
        deviceId={deviceId}
        navigation={props.navigation}
      />
      <View style={styles.dataPreview}>
        <GraphIntervals
          intervals={INTERVALS.map((interval) => interval.title)}
          active={selectedInterval.title}
          onPress={(newInterval: string) =>
            setSelectedInterval(INTERVALS.find(({ title }) => title === newInterval) || INTERVALS[0])
          }
        />
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <Loader />
          </View>
        ) : (
          <ScrollView horizontal>
            {<LineGraph data={data} interval={selectedInterval.title} units={measure.measureUnits} />}
          </ScrollView>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
    marginTop: '20%',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
  },
  dataPreview: {
    minHeight: '50%',
  },
  loaderContainer: {
    height: Layout.window.height / 2,
    marginVertical: 8,
  },
})
