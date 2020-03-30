/**
 *
 * Dashboard
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { TABS } from './constants';

import styled from 'styled-components';
import { color } from '../../styles/constants';

import Grid from '@material-ui/core/Grid';

import {   
  Apps,
  Book,
  Face,
  MailOutline 
} from '@material-ui/icons'

import { Switch, Route } from 'react-router-dom';

// Pages
import Pinjaman from '../Pinjaman/Loadable';
import FormPengajuan from '../FormPengajuan/Loadable';

import UserDashboard from 'containers/UserDashboard/Loadable';
import FormSubmissionStep from 'containers/FormSubmissionStep';
import FormSummary from 'containers/FormSummary/Loadable';
import UserProfile from 'containers/UserProfile/Loadable';
import UserInbox from 'containers/UserInbox/Loadable';
import ChangePasswordPage from 'containers/ChangePasswordPage/Loadable';
import FormAkadStep from 'containers/FormAkadStep/Loadable';
// import ProductSelection from 'containers/ProductSelection/Loadable';
// import PerhitunganAngsuran from '../PerhitunganAngsuran';

import MainPage from 'containers/MainPage/Loadable';

// components
import PageContainer from 'components/PageContainer';
import PageHeader from 'components/PageHeader';
import PageTitle from 'components/PageTitle';
import PageContent from 'components/PageContent';
import PageFooter from 'components/PageFooter';
import BottomTabNavigation from 'components/BottomTabNavigation';
import ButtonAvatar from 'components/ButtonAvatar';
import UserAvatarIcon from 'components/UserAvatarIcon';
import Paper from '@material-ui/core/Paper';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bottomTabValue:"dashboard"
    }
  }

  componentDidMount(){
    // console.log(this.props);
    // console.log(window.navigator.appVersion);
  //   if(/Android [4-6]/.test(window.navigator.appVersion)) {
  //     window.addEventListener("resize", function() {
  //       console.log('eventListener Added');
  //       console.log(document.activeElement.tagName);
  //       if(document.activeElement.tagName=="INPUT" || document.activeElement.tagName=="TEXTAREA") {            
  //         window.setTimeout(function() {
  //              document.activeElement.scrollIntoViewIfNeeded();
  //           },0);
  //        }
  //     })
  //  }
  }

  componentDidUpdate(prevProps){
    // console.log(prevProps);
    // console.log(this.props);
  }

  handleBottomTabChange = (e, value) => {    
    this.setState({
      bottomTabValue:value
    });

    const { history } = this.props;
    if(value === "dashboard"){
      return history.replace('/dashboard');
    }
    if(value === "profil"){
      return history.replace('/profil');
    }
    if(value === "pesan"){
      return history.replace('/inbox');
    }
    if(value === "pinjaman"){
      return null;
      // return history.replace('/pinjaman/angsuran');
    }
    return null;
  }
  
  getBottomTabs = () => {    
    return TABS.map(tab => ({
      label:tab.label,
      value:tab.value,
      icon:tab.icon
    }));
  }

  render(){
    const { intl, history } = this.props;
    return (
      
      <PageContainer 
        container 
        wrap="nowrap" 
        direction="column">
          
          <PageHeader 
            titleProps={
              <PageTitle 
                gutterBottom
                title={intl.formatMessage(messages.pageTitle)} 
                color="primary" />} 
            avatarProps={
              <ButtonAvatar                   
                iconProps={<UserAvatarIcon title="" />} />}
                onClick={ () => console.log(1) } />
        
            <Grid 
              item xs>

              <PageContent 
                container 
                wrap="nowrap">
                  <Paper
                    ref={ paper => this.paperElement = paper}
                    elevation={0} 
                    style={{
                      height:'80vh',
                      backgroundColor:color.white,
                      borderRadius:12,
                      paddingBottom:20,
                       }}>
                    
                    <Switch>
                        
                        <Route                                                    
                          path="/dashboard"
                          render={routeProps => (                       
                            <MainPage 
                              history={history} 
                              {...routeProps} />
                          )} />

                        <Route                          
                          path="/dashboard/section:(pinjaman|informasi)"
                          render={routeProps => (                       
                            <MainPage 
                              history={history} 
                              {...routeProps} />
                          )} />

                        <Route                       
                          path="/application-form/step/customer"
                          render={ routeProps => (
                            <FormSubmissionStep 
                              history={history} 
                              {...routeProps} />
                          )} />
                      
                        <Route                       
                          path="/application-form/step/customer/section:(installment|personal-details|work-history|documents|summary)"
                          render={ routeProps => (
                            <FormSubmissionStep 
                              history={history} 
                              {...routeProps} />
                          )} />
                        
                        <Route 
                          path="/summary"
                          render={ routeProps => (
                            <FormSummary 
                              history={history} 
                              {...routeProps} />
                          )} />
                        
                        <Route 
                          path="/akad"
                          render={ routeProps => (
                            <FormAkadStep 
                              history={history} 
                              {...routeProps} />
                          )} />
                        
                        <Route 
                          path="/profil"
                          render={ routeProps => (
                            <UserProfile 
                              history={history} 
                              {...routeProps} />
                          )} />
                        
                        <Route 
                          path="/inbox"
                          render={ routeProps => (
                            <UserInbox 
                              history={history} 
                              {...routeProps} />
                          )} />
                        
                        <Route 
                          path="/changePassword"
                          render={ routeProps => (
                            <ChangePasswordPage 
                              history={history} 
                              {...routeProps} />
                          )} />
                      </Switch>
                    </Paper>
              </PageContent>                                                      
              <PageFooter                              
                item              
                navigationProp = {
                <BottomTabNavigation               
                  tabs={this.getBottomTabs()}
                  bottomTabValue={this.state.bottomTabValue}
                  handleBottomTabChange={this.handleBottomTabChange} />
              } />            
            </Grid>      
      </PageContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
  memo,
)(Dashboard);
