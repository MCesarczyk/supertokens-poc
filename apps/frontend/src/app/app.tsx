import { useEffect } from 'react';
import * as reactRouterDom from 'react-router-dom';
import { Route, Routes, Link } from 'react-router-dom';
import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react/ui';
import { EmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/emailpassword/prebuiltui';
import Session from 'supertokens-auth-react/recipe/session';
import style from './app.module.css';

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
      </Routes>
    </div>
  );
}

export default App;
