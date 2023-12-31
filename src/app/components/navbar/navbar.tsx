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
import { Button, Menu, MenuItem } from '@mui/material';
import { IUser } from 'src/app/interfaces/user';
import { City } from 'src/app/interfaces/city';
import { NavLink } from 'react-router-dom';
import { loginFlow } from 'src/app/utils/login-flow';
import { SnackbarComponent } from '../common/snackbar';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { AddFeedbackModal } from '../modals/feedback.modal';
import { AddSuggestionModal } from '../modals/suggestion.modal';

export const ButtonAppBar = (props: { pageName: string}) => {
    const [countries, setCountries] = useState<string[]>([]);
    const [menuItems, setmenuItems] = useState(null);
    const [adminMenuItems, setAdminMenuItems] = useState(null);
    const [open, setOpen] = useState(false);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const handleFeedbackOpen = () => setFeedbackOpen(true);
    const handleFeedbackClose = () => setFeedbackOpen(false);
    const [suggestionOpen, setSuggestionOpen] = useState(false);
    const handleSuggestionOpen = () => setSuggestionOpen(true);
    const handleSuggestionClose = () => setSuggestionOpen(false);
    const internalUser = JSON.parse(localStorage.getItem("user")!) as IUser;

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };

    const openMenuToolTip = (event: any) => {
      setmenuItems(event.currentTarget);
    };
    
   const closeMenuToolTip = (): any => {
        setmenuItems(null);
    };

    const openAdminMenuToolTip = (event: any) => {
      setAdminMenuItems(event.currentTarget);
    };
    
   const closeAdminMenuToolTip = (): any => {
      setAdminMenuItems(null);
    };

    useEffect(() => {
      fetch(`${process.env.NX_API_URL}/cities`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
      })
      .then(response => response.json())
      .then((json) => {
        const cities = json.data as City[];
        const countries = [...new Set(cities.map(item => item.country))];
        setCountries(countries);
      });
    }, []);

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
            {countries.map((country, index) => 
                (<MenuItem key={index} value={country}>
                    <NavLink to={`/view-city/${country.replace(' ', '+')}`}>{country}</NavLink> 
                  </MenuItem>)
            )}
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.pageName}
          </Typography>

          <Button variant="contained" onClick={handleFeedbackOpen} style={{ margin: "10px" }}>Feedback</Button>
          <Button variant="contained" onClick={handleSuggestionOpen} style={{ margin: "10px" }}>Suggestion</Button>
          <LogoutButton />

          {internalUser?.isAdmin && (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={openAdminMenuToolTip}
                >
                  <MenuIcon open={false} />
                </IconButton>
                <Menu
                  anchorEl={adminMenuItems}
                  open={Boolean(adminMenuItems)}
                  onClose={closeAdminMenuToolTip}
                >
                  <MenuItem key={1} value={"Manage Places"}><NavLink to={'/admin/manage-places'}>Manage Places</NavLink></MenuItem>
                  <MenuItem key={2} value={"View Feedback"}><NavLink to={'/admin/view-feedback'}>View Feedback</NavLink></MenuItem>
                  <MenuItem key={3} value={"View Suggestions"}><NavLink to={'/admin/view-suggestions'}>View Suggestions</NavLink></MenuItem>
                  <MenuItem key={4} value={"View Users"}><NavLink to={'/admin/view-users'}>View Users</NavLink></MenuItem>
                </Menu>
              </>
          )}
        </Toolbar>
      </AppBar>
      <SnackbarComponent handleClose={handleClose} open={open} message='An error occurred logging you in!' severtiy='error'/>
      <AddFeedbackModal 
        handleClose={handleFeedbackClose} 
        handleOpen={handleFeedbackOpen}
        open={feedbackOpen}
      />
      <AddSuggestionModal 
        handleClose={handleSuggestionClose} 
        handleOpen={handleSuggestionOpen}
        open={suggestionOpen}
      />
    </Box>
  );
}