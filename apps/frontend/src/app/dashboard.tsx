import { useEffect } from 'react';
import { signOut } from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';

async function getToken(): Promise<void> {
  const accessToken = await Session.getAccessToken();
  console.log(accessToken);
}

export const Dashboard = () => {
  useEffect(() => {
    getToken();
  }, []);
  async function onLogout() {
    await signOut();
    window.location.href = '/';
  }

  return (
    <>
      <h2>Dashboard</h2>
      <a onClick={onLogout}>Logout</a>
    </>
  );
};
