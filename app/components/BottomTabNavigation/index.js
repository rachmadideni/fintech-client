/**
 *
 * BottomTabNavigation
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { color } from '../../styles/constants';

const BottomNavigationStyled = styled(BottomNavigation)`
&& {
  background-color:${color.green};
  position:fixed;
  width:100%;
  bottom:0;
}`;

const NavigationAction = styled(BottomNavigationAction).attrs({
  classes:{
    selected: 'selected',
    label: 'label'
  }
})`
&& {
  // color:${color.grey};
  color:#68c972;
  &.selected {      
    font-size:10px;
    color:${color.white};
  }
  .label {
    text-transform:capitalize;
    padding-top:2px;
    font-size:11px;
    font-weight:bold;
    color:${color.white};
  } 
}
`;

function BottomTabNavigation(props) {
  const { tabs, bottomTabValue, handleBottomTabChange } =  props;  
  return (
    <BottomNavigationStyled 
      color="primary"
      value={bottomTabValue}
      onChange={handleBottomTabChange}>
    {tabs.map(tab=> {
      return (
        <NavigationAction             
            key={`${tab.label}`} 
            label={tab.label} 
            value={tab.value} 
            icon={<tab.icon/>} />
      );
    })}
    </BottomNavigationStyled>
  );
}

BottomTabNavigation.propTypes = {};

export default BottomTabNavigation;
