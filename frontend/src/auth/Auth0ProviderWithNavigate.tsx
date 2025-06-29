import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri =
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_AUTH0_CALLBACK_URL_DEV
      : import.meta.env.VITE_AUTH0_CALLBACK_URL_PRO;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error("unable to initialise auth");
  }

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || "/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience,
        scope: "openid profile email offline_access", // 🔥 Required for refresh tokens
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage" // 👈 Important!
      useRefreshTokens={true} // 👈 Recommended for longer sessions
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
