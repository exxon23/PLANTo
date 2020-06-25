import * as React from 'react'
import { Text, View, StyleSheet, Image, Alert } from 'react-native'
import Layout from '../constants/Layout'
import TouchAble from '../components/common/Touchable'
import * as Icon from '@expo/vector-icons'
import signInWithGoogle from '../utils/googleLogin'
import signInWithFacebook from '../utils/facebookLogin'

import Colors from '../constants/Colors'

interface Props {
  navigation: {
    navigate: (screen: string) => void
    reset: (params: { index: number; routes: { name: string }[] }) => void
  }
}
export default function LoginScreen(props: Props) {
  async function handleLogin(loginType: 'google' | 'facebook' | 'guest') {
    let userData: { token: string | undefined; error: boolean } = { token: undefined, error: false }

    if (loginType === 'google') {
      userData = await signInWithGoogle()
    } else if (loginType === 'facebook') {
      userData = await signInWithFacebook()
    } else {
      userData.token = 'guest_token'
    }

    if (userData.error) {
      Alert.alert('Authorization error', 'Authorization method failed. Try again or use guest mode', [{ text: 'OK' }])
      return
    }

    if (userData.token) {
      // TODO: save token
      props.navigation.navigate('PlantsOverview')
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'PlantsOverview' }],
      })
    }
  }

  return (
    <View style={styles.screen}>
      <Image source={require('../assets/images/logo-mirror.png')} style={styles.logo} />
      <TouchAble onPress={() => handleLogin('google')}>
        <View style={{ ...styles.buttonContainer, borderColor: Colors.secondaryText, borderWidth: 0.5 }}>
          <Image source={require('../assets/images/google.png')} style={styles.image} />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </View>
      </TouchAble>
      <TouchAble onPress={() => handleLogin('facebook')}>
        <View style={{ ...styles.buttonContainer, backgroundColor: '#4267B2' }}>
          <Icon.Ionicons name={'logo-facebook'} size={32} color={'white'} style={styles.icon} />
          <Text style={{ ...styles.buttonText, color: 'white' }}>Continue with Facebook</Text>
        </View>
      </TouchAble>
      <TouchAble onPress={() => handleLogin('guest')}>
        <View style={{ ...styles.buttonContainer, backgroundColor: Colors.primary }}>
          <Icon.Ionicons name={'ios-log-in'} size={32} color={Colors.background} style={styles.icon} />
          <Text style={{ ...styles.buttonText, color: Colors.background }}>Continue as Guest</Text>
        </View>
      </TouchAble>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  logo: {
    marginTop: '20%',
    resizeMode: 'contain',
    width: '100%',
    height: Layout.window.height / 3,
  },
  image: {
    width: (Layout.window.height / 12) * 0.5,
    height: (Layout.window.height / 12) * 0.5,
    resizeMode: 'contain',
    marginHorizontal: '8%',
  },
  buttonContainer: {
    marginTop: 20,
    width: '90%',
    height: Layout.window.height / 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
  },
  icon: {
    marginHorizontal: '8%',
  },
  buttonText: {
    fontFamily: 'roboto-regular',
    textAlign: 'center',
    color: Colors.primaryText,
  },
})
