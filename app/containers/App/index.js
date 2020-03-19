/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from 'containers/Login/Loadable';
import Verifikasi from 'containers/Verifikasi/Loadable';
import VerifyConfirmPage from 'containers/VerifyConfirmPage';
import CreatePassword from 'containers/CreatePassword/Loadable';
import Dashboard from 'containers/Dashboard/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
// import ProductSelection from 'containers/ProductSelection/Loadable';
// import UserDashboard from 'containers/UserDashboard/Loadable';

import AuthGuard from 'containers/AuthGuard';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color:#FFFFFF;
  // min-height: 100%;
  // height:100vh;
  // padding: 0 16px;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Mitra Pembiayaan Syariah"
        defaultTitle="Mitra Pembiayaan Syariah"
      >
        <meta name="description" content="Aplikasi Mitra Pembiayaan Syariah" />
      </Helmet>
      <Switch>
        
        <Route 
          exact 
          path="/" 
          render={()=> <Redirect to="/login" />} />
        
        <Route 
          path="/login" 
          component={Login} />
        
        <Route 
          exact 
          path="/verifikasi" 
          component={Verifikasi} />
        
        <Route 
          exact 
          path="/verifikasi/confirm" 
          component={VerifyConfirmPage} />
        
        <Route 
          exact 
          path="/createPassword" 
          component={CreatePassword} />
        
        <Route 
          exact          
          path="/dashboard" 
          render={routeProps=>(
            <AuthGuard>
              <Dashboard {...routeProps} />
            </AuthGuard>
          )} />
        
        <Route 
          path="/application-form/step/customer"
          render={routeProps=>(
            <AuthGuard>
              <Dashboard {...routeProps} />
            </AuthGuard>
          )} />

        <Route
          path="/application-form/step/customer/section:(installment|personal-details|work-related|documents|summary)"
          render={routeProps=>(
            <AuthGuard>
              <Dashboard {...routeProps} />
            </AuthGuard>
          )} />
        
        <Route 
          path="/summary"
          render={routeProps=>(
            <AuthGuard>
              <Dashboard {...routeProps} />
            </AuthGuard>
          )} />
        
        <Route 
          path="/akad"
          render={routeProps=>(
            <AuthGuard>
              <Dashboard {...routeProps} />
            </AuthGuard>
          )} />

        <Route 
          path="/profil"
          render={routeProps=>(
            <AuthGuard>
              <Dashboard {...routeProps} />
            </AuthGuard>
          )} />
        
        <Route 
          path="/inbox"
          render={routeProps=>(
            <AuthGuard>
              <Dashboard {...routeProps} />
            </AuthGuard>
          )} />
        
        <Route 
          path="/changePassword"
          render={routeProps=>(
            <AuthGuard>
              <Dashboard {...routeProps} />
            </AuthGuard>
          )} />

        
        
        {/* Disable sementara */}
        {/* <Route           
          path="/pinjaman/:section(step|angsuran|pengajuan)" 
          render={routeProps=>(
            <Dashboard {...routeProps} />
          )} /> */}
                

        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}
