import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { color, typography } from '../../../styles/constants';

// HEADER
const Header = styled(props => (
  <Grid item {...props}>
    <HeaderText align="left">Menu</HeaderText>
  </Grid>
))`
  && {
    padding-top: 10px;
    padding-left: 15px;
    padding-bottom: 5px;
  }
`;

const HeaderText = styled(Typography)`
  && {
    font-family: ${typography.fontFamily};
    font-size: 13px;
    font-weight: bold;
    color: ${color.subtleBlack};
    text-transform: capitalize;
  }
`;

// GRID WRAPPER
const GridWrapper = styled(props => <Grid {...props} />)`
  && {
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    max-width: 330px;
    width: 280px;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 5px;
    background-color: ${color.lightGrey};
    border-radius: 6px;
  }
`;

// Grid Item
const GridItem = styled(({ active, ...otherProps }) => (
  <Grid {...otherProps} />
))`
  && {
    background-color: ${active => (active ? color.biru[400] : color.lightGrey)};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 90px;
    height: 75px;
    margin: 5px;
    padding: 15px 10px;
    border-radius: 6px;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
`;

// Quick Menu ITem
const MenuType = styled(Typography)`
  && {
    padding-top: 2px;
    font-family: ${typography.fontFamily};
    font-size: 11px;
    font-weight: bold;
    color: ${props => (props.active ? color.white : color.grey)};
    text-transform: capitalize;
  }
`;

const QuickMenuItem = ({ item, i, handleMenu }) => (
  <ButtonBase
    key={`item-${i}`}
    centerRipple
    disabled={!item.active}
    style={{ borderRadius: 6 }}
    onClick={() => handleMenu(item.step)}
  >
    <GridItem item active={item.active}>
      <item.icon
        style={{
          color: item.active ? `${color.white}` : `${color.grey}`,
          fontSize: 20,
        }}
      />
      <MenuType align="center" gutterBottom active={item.active}>
        {item.name}
      </MenuType>
    </GridItem>
  </ButtonBase>
);

QuickMenuItem.propTypes = {
  item: PropTypes.object,
  i: PropTypes.number,
  handleMenu: PropTypes.func,
};

export { Header, GridWrapper, GridItem, QuickMenuItem };
