import moment from 'moment'

import { PLANTO_SERVER_URL } from '../config'

interface Interval {
  title: 'DAY' | '3DAYS' | 'WEEK' | '2WEEKS'
  units: 'days' | 'weeks' | 'month'
  subtractUnits: moment.DurationInputArg1
}

interface Plant {
  id: string
  displayName: string
  category: string
}

const formatPlantsList = (plants: Plant[]) =>
  plants.map((plant) => ({ id: plant.id, name: `${plant.displayName} (${plant.category})` }))

export async function fetchMeasureData(deviceId: string, measure: string, selectedInterval: Interval) {
  console.log(
    `${new Date().toISOString()} Start fetching data for startTime ${moment()
      .subtract(selectedInterval.subtractUnits, selectedInterval.units)
      .toISOString()}`,
  )
  const response = await fetch(
    `${PLANTO_SERVER_URL}/devices/${deviceId}/data?measuredQuantity=${measure}&startTime=${moment()
      .subtract(selectedInterval.subtractUnits, selectedInterval.units)
      .toISOString()}`,
  )
  if (!response.ok) {
    throw new Error('Error by fetching measure data')
  }

  const resData = await response.json()
  console.log(
    `${new Date().toISOString()} Loaded data for chart for last ${selectedInterval.title} with length ${
      resData.length
    }`,
  )
  return resData.filter((_: any, idx: number) => idx % 3 === 0)
}

export async function fetchPlantsList(plantName: string) {
  console.log(`${new Date().toISOString()} Start fetching list of plants which includes string ${plantName}`)
  const response = await fetch(`${PLANTO_SERVER_URL}/plants?name=${plantName}`)
  if (!response.ok) {
    throw new Error('Error by fetching plants list')
  }
  const resData = await response.json()
  console.log(`${new Date().toISOString()} Loaded list of plants with length ${resData.length}`)
  return formatPlantsList(resData)
}

export async function fetchDevicesList() {
  console.log(`${new Date().toISOString()} Start fetching list of devices`)
  const response = await fetch(`${PLANTO_SERVER_URL}/devices`)
  if (!response.ok) {
    throw new Error('Error by fetching devices list')
  }
  const resData = await response.json()
  console.log(`${new Date().toISOString()} Loaded list of devices with length ${resData.length}`)
  return resData
}

export async function saveDevice(deviceId: string, name: string, plantId: string) {
  console.log(`${new Date().toISOString()} Start saving device`)
  const response = await fetch(`${PLANTO_SERVER_URL}/devices/${deviceId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      active: true,
      name,
      plant: plantId,
    }),
  })
  if (!response.ok) {
    throw new Error('Error by saving device')
  }
  const resData = await response.json()
  console.log(`${new Date().toISOString()} Device saved`)
  return resData
}
