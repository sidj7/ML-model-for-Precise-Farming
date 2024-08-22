import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
// yeh respomsible hai app ko render krne k liye 
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <Auth0Provider
  domain="dev-ugwihv4grbufgim3.us.auth0.com"
  clientId="gO15S5NIa9LTkFdgDW31pHq67whn9N6v"
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
>
  <App />
</Auth0Provider>
  
)
