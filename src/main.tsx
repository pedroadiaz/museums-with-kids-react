import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const domain = process.env.NX_DOMAIN!;
const clientId = process.env.NX_CLIENT_ID!;


root.render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: `${process.env.NX_SERVER_URL}/post-login`
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>    
    </Auth0Provider>
  </StrictMode>
);
