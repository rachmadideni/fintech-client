import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Login from 'containers/Login/Loadable';
import Verifikasi from 'containers/Verifikasi/Loadable';
import VerifyConfirmPage from 'containers/VerifyConfirmPage';
import CreatePassword from 'containers/CreatePassword/Loadable';
import Dashboard from 'containers/Dashboard/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AuthGuard from 'containers/AuthGuard';
import GlobalStyle from '../../global-styles';
import { color } from '../../styles/constants';

const AppWrapper = styled.div`  
  width:100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  // background-color: ${color.green};
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Pembiayaan Amanah"
        defaultTitle="Pembiayaan Amanah"
      >
        <meta name="description" content="Pembiayaan Amanah" />
      </Helmet>
      <Container maxWidth="xs" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route path="/login" component={Login} />
          <Route exact path="/verifikasi" component={Verifikasi} />
          <Route
            exact
            path="/verifikasi/confirm"
            component={VerifyConfirmPage}
          />
          <Route exact path="/createPassword" component={CreatePassword} />

          {/* ada exact di path /dashboard */}
          <Route
            path="/dashboard"
            render={routeProps => (
              <AuthGuard>
                <Dashboard {...routeProps} />
              </AuthGuard>
            )}
          />

          <Route
            path="/dashboard/section:(pinjaman|informasi)"
            render={routeProps => (
              <AuthGuard>
                <Dashboard {...routeProps} />
              </AuthGuard>
            )}
          />

          <Route
            path="/application-form/step/customer"
            render={routeProps => (
              <AuthGuard>
                <Dashboard {...routeProps} />
              </AuthGuard>
            )}
          />

          <Route
            path="/application-form/step/customer/section:(installment|personal-details|work-related|documents|summary)"
            render={routeProps => (
              <AuthGuard>
                <Dashboard {...routeProps} />
              </AuthGuard>
            )}
          />

          <Route
            path="/summary"
            render={routeProps => (
              <AuthGuard>
                <Dashboard {...routeProps} />
              </AuthGuard>
            )}
          />

          <Route
            path="/akad"
            render={routeProps => (
              <AuthGuard>
                <Dashboard {...routeProps} />
              </AuthGuard>
            )}
          />

          <Route
            path="/profil"
            render={routeProps => (
              <AuthGuard>
                <Dashboard {...routeProps} />
              </AuthGuard>
            )}
          />

          <Route
            path="/inbox"
            render={routeProps => (
              <AuthGuard>
                <Dashboard {...routeProps} />
              </AuthGuard>
            )}
          />

          <Route
            path="/changePassword"
            render={routeProps => (
              <AuthGuard>
                <Dashboard {...routeProps} />
              </AuthGuard>
            )}
          />

          <Route path="" component={NotFoundPage} />
        </Switch>
      </Container>
      <GlobalStyle />
    </AppWrapper>
  );
}
