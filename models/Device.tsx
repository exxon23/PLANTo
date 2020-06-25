interface Recomended {
  min: number
  max: number
}

export interface Note {
  item: string
  description: string
}

interface AverageMetadata {
  average: {
    lastWeek: string | null
    lastTwoWeeks: string | null
    last30Days: string | null
  }
  units: string
}

export interface Device {
  id: string
  name: string
  active: boolean
  plant: {
    id: string
    displayName: string
    image: string
    category: string
    temperature: Recomended
    humidity: Recomended
    lightIntensity: Recomended
    soilMoisture: Recomended
    notes: Note[]
  } | null
  metadata: {
    temperature: AverageMetadata
    humidity: AverageMetadata
    soilMoisture: {
      average: {
        lastWeek: string | null
        lastTwoWeeks: string | null
        last30Days: string | null
      }
      units: string
      lastWatering?: string
    }
    statusMonitor: {
      active: boolean
      startTime: string
    }
    battery: {
      remainingDays: string
    }
  } | null
}
