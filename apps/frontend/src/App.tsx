import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import * as reactRouterDom from 'react-router-dom';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react/ui';
import { EmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/emailpassword/prebuiltui';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';

SuperTokens.init({
  appInfo: {
    appName: 'supertokens-poc',
    apiDomain: 'http://localhost:8030',
    websiteDomain: 'http://localhost:3030',
    apiBasePath: '/auth',
    websiteBasePath: '/auth',
  },
  recipeList: [EmailPassword.init(), Session.init()],
});

function App() {
  return (
    <SuperTokensWrapper>
      <div className="wrapper">
        <h1>SuperTokens POC</h1>
        <BrowserRouter>
          <Routes>
            {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
              EmailPasswordPreBuiltUI,
            ])}
            <Route path="/" element={<Link to="/auth">Login</Link>} />
          </Routes>
        </BrowserRouter>
      </div>
    </SuperTokensWrapper>
  );
}

export default App;
