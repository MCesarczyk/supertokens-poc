import { useEffect } from 'react';
import * as reactRouterDom from 'react-router-dom';
import { Route, Routes, Link } from 'react-router-dom';
import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react/ui';
import { EmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/emailpassword/prebuiltui';
import Session, { SessionAuth } from 'supertokens-auth-react/recipe/session';
import style from './app.module.css';
import { Dashboard } from 'apps/frontend/src/app/dashboard';

async function getToken(): Promise<void> {
  const accessToken = await Session.getAccessToken();
  console.log(accessToken);
}

export function App() {
  useEffect(() => {
    getToken();
  }, []);

  return (
    <div className={style.wrapper}>
      <h1>SuperTokens POC</h1>
      <Routes>
        {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
          EmailPasswordPreBuiltUI,
        ])}
        <Route path="/" element={<Link to="/auth">Login</Link>} />
        <Route
          path="/dashboard"
          element={
            <SessionAuth>
              <Dashboard />
            </SessionAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
