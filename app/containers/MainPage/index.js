/**
 *
 * MainPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Switch, Route } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { color } from 'styles/constants';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import ReactSwipe from 'react-swipe';
import { makeSelectActiveStep, makeSelectStatusAplikasi } from './selectors';

import reducer from './reducer';
import saga from './saga';

import { ITEMS } from './constants';

import { GridWrapper, QuickMenuItem } from './components';

import { changeStepAction, cekPinjamanAction } from './actions';

import SectionPinjaman from '../SectionPinjaman/Loadable';
import SectionInformasi from '../SectionInformasi/Loadable';

const Wrapper = styled(props => <Grid {...props}>{props.children}</Grid>)`
  && {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: ${color.white};
  }
`;

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.renderMenus = this.renderMenus.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    // this.reactSwipeEl = reactSwipeEl;
    this.reactSwipeEl = React.createRef();
  }

  componentDidMount() {
    this.props.changeStep(0);
    this.props.cekPinjaman();
  }

  componentDidUpdate(prevProps) {
    const { history, activeStep } = this.props;

    if (prevProps.activeStep !== this.props.activeStep) {
      if (activeStep === 0) {
        return history.push('/dashboard');
      }

      if (activeStep === 1) {
        return history.push('/dashboard/pinjaman');
      }

      if (activeStep === 2) {
        return history.push('/dashboard/informasi');
      }
    }
    return false;
  }

  renderMenus() {
    return ITEMS.map(item => (
      <QuickMenuItem
        key={`quick-menu-${item.step}`}
        item={item}
        handleMenu={this.handleMenu}
      />
    ));
  }

  handleMenu(value) {
    this.props.changeStep(value);
  }

  render() {
    const { history } = this.props;
    return (
      <Wrapper container wrap="nowrap" direction="column">
        <Grid item>
          <GridWrapper container wrap="nowrap">
            <ReactSwipe
              className="carousel"
              swipeOptions={{ continuous: false }}
              childCount={ITEMS.length}
              ref={this.reactSwipeEl}
            >
              {this.renderMenus()}
            </ReactSwipe>
          </GridWrapper>
        </Grid>
        <Grid item style={{ marginTop: 10 }}>
          <Switch>
            <Route
              exact
              path="/dashboard/pinjaman"
              render={routeProps => (
                <SectionPinjaman history={history} {...routeProps} />
              )}
            />
            <Route
              exact
              path="/dashboard/informasi"
              render={routeProps => <SectionInformasi {...routeProps} />}
            />
          </Switch>
        </Grid>
      </Wrapper>
    );
  }
}

MainPage.propTypes = {
  history: PropTypes.object,
  changeStep: PropTypes.func,
  cekPinjaman: PropTypes.func,
  activeStep: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  activeStep: makeSelectActiveStep(),
  statusAplikasi: makeSelectStatusAplikasi(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeStep: step => dispatch(changeStepAction(step)),
    cekPinjaman: () => dispatch(cekPinjamanAction()),
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
