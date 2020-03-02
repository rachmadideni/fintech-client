/**
 *
 * UserInbox
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUserInbox from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { INBOX } from './constants';
import { color, typography } from 'styles/constants';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Skeleton from '@material-ui/lab/Skeleton';

const StyledHeader = styled(props=>{
  return (
    <Typography {...props} />
  )
})`
&& {
  font-family:${typography.fontFamily};
  font-weight:bold;
}`;

const StyledTileText = styled(props=>{
  return (
    <Typography {...props} />
  )
})`
&& {
  font-family:${typography.fontFamily};
  font-size:${props=>props.size}px;
  font-weight:${props=>props.bold ? 'bold' : 'normal'};
}`;

const CardTile = styled(props=>{
  return (
    <Card {...props} />
  )
})`
&& {
  padding:10px;
  border-width:${props=>props.fresh ? 2 : 1}px;
  border-color:${props=>props.fresh ? color.green : color.grey};
}`;

class UserInbox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading:true,
    }
  }

  renderSkeleton = () => {
    const skeleton_list = 
      <GridList cellHeight={60} style={{ marginTop:20 }}>
      {INBOX.map((item)=>(      
          <GridListTile cols={2} rows={0}>
            <Skeleton 
              variant="rect" 
              animation="wave" 
              width={500} 
              height={60} />
          </GridListTile>
      ))}
      </GridList>;    
    return skeleton_list;
  }
  render(){
    return (
      <Grid 
        container 
        wrap="nowrap" 
        direction="column"
        style={{
          marginTop:20
        }}>
          <Grid item>
            <StyledHeader 
              variant="h6">
              inbox
            </StyledHeader>
            {this.state.isLoading ? this.renderSkeleton() : 
            <GridList cellHeight={60} style={{ marginTop:20 }}>
              {INBOX.map((item,i)=>(
                <GridListTile cols={2} rows={0}>
                  <CardTile 
                    variant="outlined" 
                    fresh={item.fresh}>
                    <StyledTileText bold size={12}>
                      {item.title}
                    </StyledTileText>
                    <StyledTileText size={10}>
                      {item.title}
                    </StyledTileText>
                  </CardTile>
                </GridListTile>
              ))}
            </GridList>            
            }
          </Grid>
      </Grid>
      
    );
  }
}

// UserInbox.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  userInbox: makeSelectUserInbox(),
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
  memo,
)(UserInbox);
