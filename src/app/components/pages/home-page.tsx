import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LoginButton } from '../account/login';
import { Footer } from '../common/footer';
import { NavLink } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export const HomePage = () => {
  const images = ['Amsterdam1.png', 'AnneFrankHouse.png', 'BalDuMoulin.png', 'ChateauAmboise3.png', 'Colosseum1.png', 'Louvre2.png', 'Madrid2.png', 'Paris1.png', 'RodinMuseum3.png', 'Rome2.png', 'SistineChapel.png', 'Vienna2.png', 'Berlin3.png']
  const number = Math.floor(Math.random() * images.length);
  const image = `assets/images/${images[number]}`;
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h5" variant="h6">
            "Museums with Kids" was born out of my personal experience when I took my children to Paris for the first time. They were just 6 and 5 years old, and I was concerned they might become bored with the numerous museums we planned to visit. While I wanted to ensure they enjoyed the trip, I also didn't want it to revolve entirely around them, as I had been dreaming of visiting Paris for the first time myself.
            <br/>
            My solution was to engage them with stories, mostly imaginative ones, about the paintings, sculptures, and other artworks we encountered. My aim was to help them connect with the art, and even find humor in it. They loved this approach and continually asked me to create more stories for each new piece of art they discovered.
            <br/>
            Now, I'm delighted to share this approach with you through my website. My hope is that your children will enjoy the content as much as my own kids enjoyed the stories I shared with them. It's my belief that art can be engaging, fun, and accessible for everyone, no matter their age. Happy exploring!
            </Typography>
            
            <Typography component="h6" variant="h6" style={{ margin: "20px" }}>To Login or Create an account, click the Login button.</Typography>
            <LoginButton />
            <Typography component="h6" variant="h6" style={{ margin: "20px" }}>Not ready to purchase yet, try our free preview.</Typography>
            <NavLink to={"/unauthorized/view-country"}>View Sample</NavLink>
            <Footer />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}