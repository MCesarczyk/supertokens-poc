// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as reactRouterDom from 'react-router-dom';
import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react/ui';
import { EmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/emailpassword/prebuiltui';
import style from './app.module.css';

import { Route, Routes, Link } from 'react-router-dom';

export function App() {
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
