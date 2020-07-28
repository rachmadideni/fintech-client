/**
 *
 * Dashboard
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { Switch, Route } from 'react-router-dom';

// pages
import FormSubmissionStep from 'containers/FormSubmissionStep';
import FormSummary from 'containers/FormSummary/Loadable';
import UserProfile from 'containers/UserProfile/Loadable';
// import UserInbox from 'containers/UserInbox/Loadable';
import ChangePasswordPage from 'containers/ChangePasswordPage/Loadable';
import FormAkadStep from 'containers/FormAkadStep/Loadable';

import MainPage from 'containers/MainPage/Loadable';

// components
import BottomTabNavigation from 'components/BottomTabNavigation';
import PaperCustom from 'components/PaperCustom';

// import PageContainer from 'components/PageContainer';
// import PageHeader from 'components/PageHeader';
// import PageTitle from 'components/PageTitle';
// import PageContent from 'components/PageContent';
// import PageFooter from 'components/PageFooter';
// import ButtonAvatar from 'components/ButtonAvatar';
// import UserAvatarIcon from 'components/UserAvatarIcon';

import bgDashboard from 'images/wave-red-bg.png';
import { TABS } from './constants';

import makeSelectDashboard from './selectors';
import { color } from '../../styles/constants';

const Wrapper = styled(Grid)`
&& {
  flex:1;
  position: relative;
  background-image:url(${bgDashboard});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  justify-content:center;
  align-items:center;
  width:100%;
  height: 100vh;
  //padding-left:25px;
  //padding-right:25px;
  opacity: 1;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    // background-color:${color.lightGreen};
    // background-image: linear-gradient(to bottom, ${color.white} 50%, ${
  color.green
} 100%);
    opacity: 0.5;
  }  
}`;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bottomTabValue: 'dashboard',
    };
  }

  componentDidMount() {
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

  handleBottomTabChange = (e, value) => {
    this.setState({
      bottomTabValue: value,
    });

    const { history } = this.props;
    if (value === 'dashboard') {
      return history.replace('/dashboard');
    }

    if (value === 'profil') {
      return history.replace('/profil');
    }

    if (value === 'pesan') {
      return history.replace('/inbox');
    }

    if (value === 'pinjaman') {
      return null;
      // return history.replace('/pinjaman/angsuran');
    }

    return null;
  };

  getBottomTabs = () =>
    TABS.map(tab => ({
      label: tab.label,
      value: tab.value,
      icon: tab.icon,
    }));

  render() {
    const { history } = this.props;
    return (
      <Wrapper container wrap="nowrap" direction="column">
        <Box
          width="100%"
          height="100%"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <PaperCustom
            width={90}
            elevation={0}
            style={{
              // height: '85vh',
              height:"100%",
              boxShadow: '0px 1px 2px #EAEAEA',
              opacity: 1,
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              overflowY: 'auto',
            }}>

            <Switch>
              <Route
                path="/dashboard"
                render={routeProps => (
                  <MainPage history={history} {...routeProps} />
                )}
              />

              <Route
                path="/dashboard/section:(pinjaman|informasi)"
                render={routeProps => (
                  <MainPage history={history} {...routeProps} />
                )}
              />

              <Route
                path="/application-form/step/customer"
                render={routeProps => (
                  <FormSubmissionStep history={history} {...routeProps} />
                )}
              />

              <Route
                path="/application-form/step/customer/section:(installment|personal-details|work-history|documents|summary)"
                render={routeProps => (
                  <FormSubmissionStep history={history} {...routeProps} />
                )}
              />

              <Route
                path="/summary"
                render={routeProps => (
                  <FormSummary history={history} {...routeProps} />
                )}
              />

              <Route
                path="/akad"
                render={routeProps => (
                  <FormAkadStep history={history} {...routeProps} />
                )}
              />

              <Route
                path="/profil"
                render={routeProps => (
                  <UserProfile history={history} {...routeProps} />
                )}
              />

              {/* <Route
                path="/inbox"
                render={routeProps => (
                  <UserInbox history={history} {...routeProps} />
                )}
              /> */}

              <Route
                path="/changePassword"
                render={routeProps => (
                  <ChangePasswordPage history={history} {...routeProps} />
                )}
              />
            </Switch>

            <BottomTabNavigation
              tabs={this.getBottomTabs()}
              bottomTabValue={this.state.bottomTabValue}
              handleBottomTabChange={this.handleBottomTabChange}
            />
          </PaperCustom>
        </Box>
      </Wrapper>
    );
  }
}

Dashboard.propTypes = {
  history: PropTypes.object,
  intl: PropTypes.object,
};

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
