import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CulturalCenter } from 'src/app/interfaces/culturalCenter';
import { ButtonAppBar } from '../navbar/navbar';
import { Footer } from '../common/footer';
import { City } from 'src/app/interfaces/city';
import { MainFeaturedPost, MainFeaturedPostProps } from '../common/featured-story';
import { useAuth0 } from '@auth0/auth0-react';
import { NavigationBreadcrumb } from '../common/breadcrumbs';
import { SmallCard } from '../common/small-card';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { HomePage } from './home-page';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const ViewCulturalCentersComponent = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    const { cityId } = useParams();
    const [culturalCenters, setCulturalCenters] = useState<CulturalCenter[]>([]);
    const [city, setCity] = useState<City>();
    const [post, setFeaturedPost] = useState<MainFeaturedPostProps>();

    useEffect(() => {
      fetch(`${process.env.NX_API_URL}/culturalCenters/city/${cityId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
      }).then(response => response.json())
      .then((json) => {
        const c = json as { culturalCenters: CulturalCenter[], city: City};
        if (!isAuthenticated && !isLoading && c.culturalCenters.length > 0) {
          setCulturalCenters(c.culturalCenters.slice(0, 1));
        } else {
          setCulturalCenters(c.culturalCenters);
        }
        
        setCity(c.city);
        const fpost: MainFeaturedPostProps = {
          post: {
            image: c.city.imageLocation,
            imageText: "",
            title: c.city.city,
            description: c.city.story
          }
        };

        setFeaturedPost(fpost);
      });
    }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <ButtonAppBar pageName='View City'/>
      <main>
        {/* Hero unit */}
        <NavigationBreadcrumb city={city?.city} cityId={city?.id} isAuthorized={true} />
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
            {culturalCenters.map((culturalCenter) => (
              <SmallCard 
                id={culturalCenter.id} 
                name={culturalCenter?.name} 
                story={culturalCenter?.story} 
                imageLocation={culturalCenter?.imageLocation} 
                url='/view-art' 
              />
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export const ViewCulturalCenters = withAuthenticationRequired(ViewCulturalCentersComponent, {
  onRedirecting: () => <HomePage />
})