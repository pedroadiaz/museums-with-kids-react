import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/material/Menu';
import { LoginButton } from "src/app/components/account/login";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "src/app/components/account/logout";
import { Menu, MenuItem } from '@mui/material';
import { IUser } from 'src/app/interfaces/user';
import { City } from 'src/app/interfaces/city';

export const ButtonAppBar = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [internalUser, setUser] = useState<IUser | null>(null)
    const [cities, setCities] = useState<City[] | null>(null)
    const [menuItems, setmenuItems] = useState(null);
    const openMenuToolTip = (event: any) => {
        setmenuItems(event.currentTarget);
     };
    
   const closeMenuToolTip = () => {
        setmenuItems(null);
    };

    if (isAuthenticated) {
      fetch(`${process.env.REACT_APP_API_URL}/users/email?email=${user?.email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
      }).then(response => response.json())
      .then((json) => {
        setUser(json as IUser);
      });

      fetch(`${process.env.REACT_APP_API_URL}/cities`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
      }).then(response => response.json())
      .then((json) => {
        setCities(json as City[]);
      });
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={openMenuToolTip} 
          >
            <MenuIcon open={false} />
          </IconButton>
          <Menu
            anchorEl = {menuItems}
            open = {Boolean(menuItems)}
            onClose = {closeMenuToolTip}
          >
            <MenuItem>Paris</MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Countries
          </Typography>
          {!isAuthenticated && (
            <LoginButton />
          )}
          {isAuthenticated && (
            <LogoutButton />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}