import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import useCachedResources from './hooks/useCachedResources'
import Navigator from './navigation'
import ReduxThunk from 'redux-thunk'
import devicesReducer from './store/reducers/devices'
import Colors from './constants/Colors'

const store = createStore(devicesReducer, applyMiddleware(ReduxThunk))

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Navigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
})
