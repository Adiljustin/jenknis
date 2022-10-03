
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {Switch} from 'react-router';
import Home from './pages/Home';
import CreateMechanicTSG from './pages/CreateMechanicTSG';
import CreateMechatronicTSG from './pages/CreateMechatronicTSG';
import CreateSoftwareTSG from './pages/CreateSoftwareTSG';
import CreateMechanicTS from './pages/CreateMechanicTS';
import CreateMechatronicTS from './pages/CreateMechatronicTS';
import CreateSoftwareTS from './pages/CreateSoftwareTS';
import ViewTSG from './pages/ViewTSG'; 
import ViewAllTSG from './pages/ViewAllTSG'; 
import { MsalAuthenticationTemplate } from '@azure/msal-react'
import { InteractionType } from '@azure/msal-browser'
import { loginRequest } from './authConfig'
import React, { useState } from 'react'
import { apiCall, bearerToken } from './apiCall'

function App() {

  const [accessToken, setAccessToken] = useState(null)

  const getAccessToken = async () => {
    const token = await bearerToken()
    setAccessToken(token)
  }

  const callApi = async () => {
    apiCall()
  }

  return (
    <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
      <div className="alert alert-primary" role="alert">
        Hello, I am authenticated.
      </div>

      <hr />

      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={getAccessToken}
        >
          Get Access Token
        </button>
        {accessToken && <div>Access token is: {accessToken}</div>}
      </div>

      <hr />

      <div>
        <button type="button" className="btn btn-primary" onClick={callApi}>
          Call API
        </button>
      </div>
    </MsalAuthenticationTemplate>
  )

}
export default App;