import { Device } from '../models/Device'

const devices: Device[] = [
  {
    id: '5d545c4a9c5dwdw1723b449f1c6cB',
    name: 'Rastlina 1',
    active: true,
    plant: {
      id: '5e94659eb8bfdb497c5ab3ce2',
      displayName: 'Aloe Vera',
      image: 'https://cdn.hydroflora.sk/images/0/cf2a537675ad639d/2/aloe-vera-r12-v35m.jpg',
      category: 'Caprifoliaceae, Abelia',
      temperature: { min: 8, max: 35 },
      humidity: { min: 30, max: 85 },
      lightIntensity: { min: 3500, max: 30000 },
      soilMoisture: { min: 15, max: 60 },
      notes: [],
    },
    metadata: null,
  },
  {
    id: '5d545c4fvfva9c51723b449f1c6cB',
    name: 'Rastlina 2',
    active: true,
    plant: {
      id: '5e94659eb8bfdb497c5ab3ce2',
      displayName: 'Bambus',
      image: 'https://muzikus.sk/255399-large_default/bambus-v-kvetinaci-120cm.jpg',
      category: 'Caprifoliaceae, Abelia',
      temperature: { min: 8, max: 35 },
      humidity: { min: 30, max: 85 },
      lightIntensity: { min: 3500, max: 30000 },
      soilMoisture: { min: 15, max: 60 },
      notes: [],
    },
    metadata: null,
  },
  {
    id: '5d545c4a9wdwc51723b449f1c6cB',
    name: 'Rastlina 3',
    active: true,
    plant: {
      id: '5e94659eb8bfdb497c5ab3ce2',
      displayName: 'Ruze',
      image: 'https://www.flora-online.sk/upload/media/367/427.jpg',
      category: 'Caprifoliaceae, Abelia',
      temperature: { min: 8, max: 35 },
      humidity: { min: 30, max: 85 },
      lightIntensity: { min: 3500, max: 30000 },
      soilMoisture: { min: 15, max: 60 },
      notes: [],
    },
    metadata: null,
  },
]

export default devices
