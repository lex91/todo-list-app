import React from 'react';
import firebaseui from 'firebaseui';
import { StyledFirebaseAuth } from 'react-firebaseui';
import app from 'firebase/app';

import { auth } from 'services/firebase/app';

const config: firebaseui.auth.Config = {
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
  signInOptions: [app.auth.EmailAuthProvider.PROVIDER_ID],
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
};

interface IProps {}

const LoginPage: React.FC<IProps> = () => (
  <StyledFirebaseAuth uiConfig={config} firebaseAuth={auth} />
);

export default LoginPage;
