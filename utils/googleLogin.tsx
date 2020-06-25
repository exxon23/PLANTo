import * as Google from 'expo-google-app-auth'

import { IOS_CLIENT_ID, ANDROID_CLIENT_ID } from '../config'

export default async function signInWithGoogle() {
  let userData: { token: string | undefined; error: boolean } = { token: undefined, error: false }
  try {
    const result = await Google.logInAsync({
      iosClientId: IOS_CLIENT_ID,
      androidClientId: ANDROID_CLIENT_ID,
      scopes: ['email'],
    })

    if (result.type === 'success') {
      if (result.accessToken) {
        userData.token = result.accessToken
      }
    } else {
      userData.error = true
    }
  } catch (err) {
    console.log(`Error in Google sign in process - ${err.message}}`)
    userData.error = true
  } finally {
    return userData
  }
}
