import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { City } from 'src/app/interfaces/city';
import { ButtonAppBar } from '../navbar/navbar';
import { Footer } from '../common/footer';
import { NavLink } from 'react-router-dom';
import { MainFeaturedPost, MainFeaturedPostProps } from '../common/featured-story';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { NavigationBreadcrumb } from '../common/breadcrumbs';
import { SmallCard } from '../common/small-card';
import { HomePage } from './home-page';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const ViewCitiesComponent = () => {
    const { country } = useParams();
    const ctry = country?.replace('+', ' ');
    const [cities, setCities] = useState<City[]>([]);
    const [post, setFeaturedPost] = useState<MainFeaturedPostProps>();

    useEffect(() => {
      fetch(`${process.env.NX_API_URL}/cities/country?country=${ctry}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
      })
      .then(response => response.json())
      .then((json) => {
        const c = json.data as City[];
        setCities(c);
        
        if (c.length > 0) {
          const fpost: MainFeaturedPostProps = {
            post: {
              image: c[0].imageLocation?.replace("1", "4"),
              imageText: "",
              title: country
            }
          };
  
          setFeaturedPost(fpost);
        }
      });        
    }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <ButtonAppBar pageName='View Country'/>
      <main>
        {/* Hero unit */}
        <NavigationBreadcrumb country={country} isAuthorized={true}/>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="lg">
            {post?.post && (
              <MainFeaturedPost post={post?.post} />
            )}
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cities.map((city) => (
              <SmallCard 
                id={city.id} 
                name={city?.city} 
                story={city?.story} 
                imageLocation={city?.imageLocation} 
                url='/view-cultural-center' 
              />
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export const ViewCities = withAuthenticationRequired(ViewCitiesComponent, {
  onRedirecting: () => <HomePage />
})