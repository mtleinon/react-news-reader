import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.15),
    },
  },

}));

export default function DropDown({ handleSelect, values, preSelected, displayValues }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectAndClose = (newCountry) => {
    setAnchorEl(null);
    handleSelect(newCountry);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div id='pop'>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        classes={{ root: classes.button }}
      >
        {preSelected}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        selected={preSelected}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ padding: '8px' }}
      >
        {values.length > 0 ?
          values.map((value, i) =>
            <MenuItem key={value} onClick={() => handleSelectAndClose(value)}>
              {displayValues ? displayValues[i] : value}
            </MenuItem>
          ) : 0
        }
      </Menu>
    </div>
  );
}