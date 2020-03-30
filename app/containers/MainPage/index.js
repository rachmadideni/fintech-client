/**
 *
 * MainPage
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Switch, Route } from 'react-router-dom';
import {
  makeSelectActiveStep,
  makeSelectStatusAplikasi
} from './selectors';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';

import { color } from 'styles/constants';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { 
  ITEMS
} from './constants';

import { 
  Header,
  GridWrapper,
  QuickMenuItem
} from './components';

import {
  changeStepAction,
  cekPinjamanAction
} from './actions';

import SectionPinjaman from '../SectionPinjaman/Loadable';
import SectionInformasi from '../SectionInformasi/Loadable';

const Wrapper = styled(props =>{
  return (
    <Grid       
      {...props}>
      {props.children}
    </Grid>
  )
})`
&& {
  display:flex;
  justify-content:center;
  align-items:flex-start;
  background-color:${color.white};
}
`;

class MainPage extends React.Component {  
  constructor(props){
    super(props);
    this.renderMenus = this.renderMenus.bind(this);    
    this.handleMenu = this.handleMenu.bind(this);    
  }

  componentDidMount(){
    this.props.changeStep(0);
    this.props.cekPinjaman();
  }

  componentDidUpdate(prevProps, prevState) {
    
    const { 
      history,
      activeStep
    } = this.props;

    if(prevProps.activeStep !== this.props.activeStep){
      if(activeStep === 0){
        return history.push('/dashboard');
      }

      if(activeStep === 1){
        return history.push('/dashboard/pinjaman');
      }

      if(activeStep === 2){
        return history.push('/dashboard/informasi');
      }
    }
  }

  renderMenus(){
    return ITEMS.map((item,i) => <QuickMenuItem key={`index-${i}`} item={item} handleMenu={this.handleMenu}/>);
  }
  
  handleMenu(value){
    this.props.changeStep(value);
  }

  render(){
    const { history } = this.props;
    return (
      <Wrapper
        container 
        wrap="nowrap" 
        direction="column">
          <Header />
          <Grid item>
            <GridWrapper 
              container>
                {this.renderMenus()}
            </GridWrapper>
          </Grid>
          <Grid item style={{ marginTop:10}}>
            <Switch>            
              <Route 
                exact
                path="/dashboard/pinjaman"
                render={routeProps=>(
                  <SectionPinjaman history={history} {...routeProps} />
                )} />
              <Route 
                exact
                path="/dashboard/informasi"
                render={routeProps=>(
                  <SectionInformasi {...routeProps} />
                )} />
            </Switch>
          </Grid>
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({  
  activeStep: makeSelectActiveStep(),
  statusAplikasi: makeSelectStatusAplikasi()
});

function mapDispatchToProps(dispatch) {
  return {
    changeStep: step => dispatch(changeStepAction(step)),
    cekPinjaman: () => dispatch(cekPinjamanAction())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'mainPage', reducer });
const withSaga = injectSaga({ key: 'mainPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  memo,
)(MainPage);
