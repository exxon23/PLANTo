import * as Facebook from 'expo-facebook'

import { FACEBOOK_APP_ID } from '../config'

export default async function signInWithFacebook() {
  let userData: { token: string | undefined; error: boolean } = { token: undefined, error: false }
  try {
    await Facebook.initializeAsync(FACEBOOK_APP_ID)
    const result = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    })

    if (result.type === 'success') {
      if (result.token) {
        userData.token = result.token
      }
    } else {
      userData.error = true
    }
  } catch (err) {
    console.log(`Error in Google sign in process - ${err.message}`)
    userData.error = true
  } finally {
    return userData
  }
}
