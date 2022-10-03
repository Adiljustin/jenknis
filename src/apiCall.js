import { apiRequest } from './authConfig'
import { msalInstance } from './index.js'

export async function bearerToken() {
  const account = msalInstance.getActiveAccount()
  if (!account) {
    throw Error(
      'No active account! Verify a user has been signed in and setActiveAccount has been called.'
    )
  }

  const response = await msalInstance.acquireTokenSilent({
    ...apiRequest,
    account: account,
  })

  return response.accessToken
}

export async function apiCall() {
  const token = await bearerToken()

  const headers = new Headers()
  const bearer = `Bearer ${token}`

  headers.append('Authorization', bearer)

  const options = {
    method: 'GET',
    headers: headers,
  }

  return fetch(apiRequest.url, options)
    .then(response => response.json())
    .catch(error => console.log(error))
}