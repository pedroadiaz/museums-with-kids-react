import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const domain = process.env.REACT_APP_DOMAIN ?? "dev-v2dp1knv.us.auth0.com";
console.log("domain: ", domain);
const clientId = process.env.REACT_APP_CLIENT_ID ?? "zuZchk7o8LYC7NJrsYoZVHrBC9N096Tj";
console.log("client id: ", clientId);


root.render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>    
    </Auth0Provider>
  </StrictMode>
);
