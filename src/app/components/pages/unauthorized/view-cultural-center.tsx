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
import { CulturalCenter } from 'src/app/interfaces/culturalCenter';
import { NavLink } from 'react-router-dom';
import { City } from 'src/app/interfaces/city';
import { MainFeaturedPost, MainFeaturedPostProps } from '../../common/featured-story';
import HomeIcon from '@mui/icons-material/Home';
import { NavigationBreadcrumb } from '../../common/breadcrumbs';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export const UnauthorizedViewCulturalCenters = () => {
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
        setCulturalCenters(c.culturalCenters.slice(0, 1));
        
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
      <main>
        {/* Hero unit */}
        <NavLink to={"/"} style={{ margin: "auto" }}>
            <HomeIcon></HomeIcon>
        </NavLink>
        <NavigationBreadcrumb city={city?.city} cityId={city?.id} isAuthorized={false} />
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
              <Grid item key={culturalCenter.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={culturalCenter.imageLocation}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {culturalCenter.name}
                    </Typography>
                    <Typography>
                        {culturalCenter.story?.substring(0, 50)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <NavLink to={`/unauthorized/cultural-center-detail/${culturalCenter.id}`} >View</NavLink>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}