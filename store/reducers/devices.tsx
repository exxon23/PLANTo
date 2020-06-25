import { SET_DEVICES } from '../actions/devices'
import mockDevices from '../../mock/devices'

const initialState = {
  devices: [],
}

interface Action {
  type: typeof SET_DEVICES
  devices: {}[]
}
export default (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_DEVICES: {
      return {
        devices: [...action.devices, ...mockDevices],
      }
    }
    default: {
      return state
    }
  }
}
