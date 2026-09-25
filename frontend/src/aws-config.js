const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID || "",
      userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID || "",
      loginWith: {
        email: true,
      },
    },
  },
};

export default awsConfig;
