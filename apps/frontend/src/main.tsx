import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';
import App from './app/app';

SuperTokens.init({
  appInfo: {
    appName: 'supertokens-poc',
    apiDomain: 'http://localhost:4030',
    websiteDomain: 'http://localhost:3030',
    apiBasePath: '/auth',
    websiteBasePath: '/auth',
  },
  recipeList: [
    EmailPassword.init({
      getRedirectionURL: async (context) => {
        if (context.action === 'SUCCESS') {
          if (context.redirectToPath !== undefined) {
            return context.redirectToPath;
          }
          return '/dashboard';
        }
        return undefined;
      },
    }),
    Session.init(),
  ],
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <SuperTokensWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SuperTokensWrapper>
  </StrictMode>
);
