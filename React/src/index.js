import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';


import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

// Configuration object constructed.
const config = {
    auth: {
        clientId: 'ea1ed7ee-4941-426f-b0dd-54e161dbd581' // microsoft login auth app id
    }
};

// create PublicClientApplication instance
const publicClientApplication = new PublicClientApplication(config);

// Wrap your app component tree in the MsalProvider component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <MsalProvider instance={publicClientApplication}>
            <App />
        </ MsalProvider>
  </React.StrictMode>
);


