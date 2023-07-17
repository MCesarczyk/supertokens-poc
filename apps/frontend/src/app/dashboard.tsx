import { useEffect } from 'react';
import { signOut } from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';

async function getToken(): Promise<void> {
  const accessToken = await Session.getAccessToken();
  console.log(accessToken);
}

async function getUserInfo() {
  if (await Session.doesSessionExist()) {
    let userId = await Session.getUserId();
    let accessTokenPayload = await Session.getAccessTokenPayloadSecurely();
    console.log(userId, accessTokenPayload);
  }
}

export const Dashboard = () => {
  useEffect(() => {
    getToken();
    getUserInfo();
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
