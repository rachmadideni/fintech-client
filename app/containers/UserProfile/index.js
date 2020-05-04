/**
 *
 * UserProfile
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import makeSelectUserProfile from './selectors';
import {
  makeSelectEmail,
  makeSelectNik,
  makeSelectNotelp
} from '../App/selectors';
import messages from './messages';

import {
  removeAuthTokenAction
} from '../App/actions';

import saga from '../Login/saga';
import { color, typography} from 'styles/constants';
import waveBackground from '../../images/wave.svg';
// import demimoore from '../../images/demimoore.jpg';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import styled from 'styled-components';
const StyledPaper = styled(Paper)`
&& {
  background-image:url(${waveBackground});
  background-size:cover;
  margin-top:40px;  
  padding:20px;
  width:100vw;
  // height:100vh;
}`;

const StyledAvatar = styled(Avatar)`
&& {
  margin-top:20px;
  margin-bottom:10px;
  width:80px;
  height:80px;
}`;

const StyledText = styled(props=>{
  return (
    <Typography {...props} />
  )
})`
&& {
  font-family:${typography.fontFamily};
  font-size:${props=>props.size}px;
  font-weight:bold;
}`;

const StyledButton = styled(Button)`
&& {
  // width:150px;
  margin-top:10px;
  padding-left:20px;
  padding-right:20px;
  border-radius:18px;
}
`;

class UserProfile extends React.Component {
  
  goToChangePasswordPage = () => {
    return this.props.history.replace('/changePassword');
  }

  render(){
    const { 
      intl,
      history,
      removeAuthToken
    } = this.props;
    return (
      <Grid 
        container 
        wrap="nowrap" 
        direction="column"
        style={{
          alignItems:'center',          
        }}>
          <StyledPaper
            elevation={0}>          
            <Grid 
              item>
                <Grid 
                  container 
                  wrap="nowrap"
                  direction="column"                  
                  style={{
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'transparent'
                  }}>
                    <Grid item>
                      <StyledAvatar />
                    </Grid>
                    <Grid item style={{ marginBottom:20,textAlign:'center' }}>
                      <StyledText>MIA</StyledText>
                      <StyledText size={12}>{this.props.email}</StyledText>
                      <StyledText size={12}>{this.props.notelp}</StyledText>
                    </Grid>
                    <StyledButton 
                      variant="outlined"
                      color="secondary"
                      onClick={this.props.removeAuthToken}>
                      {intl.formatMessage(messages.logout)}
                    </StyledButton>
                    <StyledButton 
                      variant="outlined"
                      color="secondary"
                      onClick={this.goToChangePasswordPage}>
                      {intl.formatMessage(messages.ubahPassword)}
                    </StyledButton>
                </Grid>
            </Grid>            
          </StyledPaper>        
      </Grid>
    );
  }
}

// UserProfile.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  userProfile: makeSelectUserProfile(),
  email: makeSelectEmail(),
  notelp: makeSelectNotelp()  
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    removeAuthToken: () => dispatch(removeAuthTokenAction())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key:"loginSaga", saga });
export default compose(
  withConnect,
  withSaga,
  injectIntl,
  memo,
)(UserProfile);
