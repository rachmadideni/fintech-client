/**
 *
 * UserDashboard
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
import makeSelectUserDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { ArrowForwardSharp } from '@material-ui/icons';

// Component
import DashboardContainer from 'components/DashboardContainer';
import DashboardWelcomeUser from 'components/DashboardWelcomeUser';
import DashboardProduct from 'components/DashboardProduct';
import DashboardButton from 'components/DashboardButton';

import PagesIcon from '@material-ui/icons/Pages';
import BookIcon from '@material-ui/icons/Book';

import { typography, color } from '../../styles/constants';
import demimoore from '../../images/demimoore.jpg';

class UserDashboard extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    // console.log(this.props);
  }

  onClickProduct = () => {
    const { history } = this.props;
    // return history.replace('/pinjaman/angsuran');
    return history.replace('/application-form/step/customer/installment');
  }

  render(){
    const { intl } = this.props
    return (
      <DashboardContainer 
        container 
        wrap="nowrap" 
        direction="column">      
      
          <DashboardWelcomeUser 
            imgProps={demimoore} 
            welcomeText={`Selamat datang \nMochammad Ibrahim Aprianto`} />

          <Grid item style={{ paddingLeft:20, paddingRight:20 }}>
            <Typography 
              variant="body2"
              align="center"              
              style={{
                fontFamily:typography.fontFamily,
                fontSize:13,
              }}>
              {intl.formatMessage(messages.noApplicationYet)}
            </Typography>
            <Typography 
              variant="body2"
              align="center"
              gutterBottom
              style={{
                fontFamily:typography.fontFamily,
                fontSize:14,
                fontWeight:'normal',
                color:color.black
              }}>
              {intl.formatMessage(messages.pembiayaanMultiGuna)}
            </Typography>
          </Grid>
          <DashboardProduct 
            chooseProductText=""
            productButtonProps={
              <>              
              <DashboardButton 
                fullWidth 
                variant="contained" 
                color="primary"
                disableElevation
                endIcon={<ArrowForwardSharp size="small" />}
                text={intl.formatMessage(messages.btnPengajuan)}
                onClick={this.onClickProduct} />
              
              {/* <DashboardButton 
                fullWidth 
                disabled 
                variant="contained" 
                color="primary"
                disableElevation
                startIcon={<PagesIcon size="small" />}
                text="Al Murabahah"  />
                <div style={{ flexGrow:1,height:20 }} />
                <DashboardButton 
                  fullWidth 
                  disabled 
                  variant="outlined" 
                  color="primary"
                  disableElevation
                  startIcon={<BookIcon size="small" />}
                  text="user guide"  /> */}
              </>
            } />
          
          <Grid item style={{ paddingLeft:55, paddingRight:55 }}>
            <Grid 
              container 
              justify="center">
              
              {/* <Button 
                fullWidth 
                variant="contained" 
                color="primary"
                startIcon={<PagesIcon size="small" />} 
                style={{ 
                  marginTop:10, 
                  marginRight:10, 
                  marginBottom:10, 
                  boxShadow:'none',
                  textTransform:'capitalize',
                  fontFamily:typography.fontFamily,
                  fontWeight:'bold' }}>
                Al Ijarah
              </Button>
              <Button 
                fullWidth 
                disabled 
                variant="contained" 
                color="primary" 
                style={{ marginRight:10, marginBottom:10,boxShadow:'none'  }}>
                Al Murabahah
              </Button>
              <div style={{ flexGrow:1,height:20 }} />
              <Button 
                fullWidth 
                variant="outlined" 
                color="primary" 
                startIcon={<BookIcon size="small" />}
                style={{ 
                  marginRight:10, 
                  marginBottom:10, 
                  boxShadow:'none',
                  textTransform:'capitalize',
                  fontFamily:typography.fontFamily,
                  fontSize:typography.size.medium,
                  fontWeight:'bold'  }}>
                user guide
              </Button>
              <Button 
                fullWidth 
                disabled 
                variant="outlined" 
                color="primary" 
                style={{ marginRight:10, marginBottom:10, boxShadow:'none'  }}>
                Helpdesk
              </Button> */}
            </Grid>
          </Grid>
          </DashboardContainer>
    );
  }
}

UserDashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userDashboard: makeSelectUserDashboard(),
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
)(UserDashboard);
