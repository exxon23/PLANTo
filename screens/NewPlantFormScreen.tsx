import * as React from 'react'
import { View, TextInput, Text, StyleSheet, Alert } from 'react-native'
import Button from '../components/common/Button'
import SearchableDropdown from 'react-native-searchable-dropdown'
import useDebounce from '../hooks/useDebounce'
import { useDispatch } from 'react-redux'

import * as deviceActions from '../store/actions/devices'
import Colors from '../constants/Colors'
import { fetchPlantsList } from '../utils/api'

interface Plant {
  id: string
  name: string
}

interface Props {
  route: {
    params: {
      deviceId: string
    }
  }
  navigation: {
    navigate: (screen: string) => void
  }
}

export default function NewPlantFormScreen(props: Props) {
  const [name, setName] = React.useState<string>('')
  const [plantName, setPlantName] = React.useState<string>('')
  const [nameError, setNameError] = React.useState<boolean>(false)
  const [plantNameError, setPlantNameError] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [searchPlantName, setSearchPlantName] = React.useState<string>('')
  const [plantList, setPlantsList] = React.useState<Plant[]>([])

  const debouncedSearchTerm = useDebounce(searchPlantName, 1000)
  const dispatch = useDispatch()

  React.useEffect(() => {
    async function loadPlants() {
      try {
        setLoading(true)
        const plantsList = await fetchPlantsList(debouncedSearchTerm)
        setPlantsList(plantsList)
      } catch (err) {
        Alert.alert('Error by fetching list of plants', 'Try it again later', [{ text: 'OK' }])
      } finally {
        setLoading(false)
      }
    }

    loadPlants()
  }, [setLoading, debouncedSearchTerm])

  const handleSubmit = async () => {
    if (!name) {
      setNameError(true)
    }
    if (!plantName) {
      setPlantNameError(true)
    }
    if (!name || !plantName) {
      Alert.alert('Missing values', 'For saving new plant enter all required values', [{ text: 'OK' }])
      return
    }
    try {
      setLoading(true)
      await dispatch(deviceActions.addDevice(name, plantName, props.route.params.deviceId))
      await dispatch(deviceActions.fetchDevices())
      props.navigation.navigate('PlantsOverview')
    } catch (err) {
      console.log(err)
    }
  }

  console.log('rerender', plantList.length)

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <Text style={{ ...styles.text, color: plantNameError ? Colors.danger : Colors.primaryText }}>Plant Name</Text>
        <SearchableDropdown
          onTextChange={(text: string) => setSearchPlantName(text)}
          resetValue={false}
          onItemSelect={({ id: plantId }: { id: string }) => setPlantName(plantId)}
          textInputStyle={styles.input}
          itemStyle={styles.searchSelectItem}
          itemTextStyle={styles.searchSelectItemText}
          itemsContainerStyle={styles.searchSelectItemsContainer}
          items={plantList}
          placeholder="Start typing your plant name"
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={{ ...styles.text, color: nameError ? Colors.danger : Colors.primaryText }}>Plant Alias</Text>
        <TextInput
          style={{ ...styles.input, borderColor: nameError ? Colors.danger : Colors.secondaryText }}
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>

      <Button title="SAVE" onPress={handleSubmit} loading={loading} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchSelectItem: {
    padding: 12,
    marginTop: 2,
    borderColor: '#dbd9d9',
    borderBottomWidth: 1,
  },
  searchSelectItemText: {
    fontFamily: 'roboto-light',
    textAlign: 'center',
  },
  searchSelectItemsContainer: {
    maxHeight: '80%',
  },
  text: {
    fontFamily: 'roboto-regular',
    fontSize: 20,
  },
  inputContainer: {
    marginTop: '8%',
    marginHorizontal: '10%',
  },
  input: {
    height: 50,
    borderBottomWidth: 1.5,
    fontFamily: 'roboto-light',
    fontSize: 18,
    borderColor: Colors.secondaryText,
  },
})
