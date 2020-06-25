import { fetchDevicesList, saveDevice } from '../../utils/api'
import { Alert } from 'react-native'

export const SET_DEVICES = 'SET_DEVICES'
export const ADD_DEVICE = 'ADD_DEVICE'

export function fetchDevices() {
  return async (dispatch) => {
    try {
      const devicesList = await fetchDevicesList()
      dispatch({ type: SET_DEVICES, devices: devicesList })
    } catch (err) {
      Alert.alert('Error by fetching devices', 'Try it again later', [{ text: 'OK' }])
    }
  }
}

export function addDevice(name: string, plantId: string, deviceId: string) {
  return async (dispatch) => {
    try {
      await saveDevice(deviceId, name, plantId)
      dispatch({ type: ADD_DEVICE })
    } catch (err) {
      Alert.alert('Error by saving device', 'Try it again later', [{ text: 'OK' }])
    }
  }
}
