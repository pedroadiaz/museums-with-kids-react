import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CulturalCenter } from 'src/app/interfaces/culturalCenter';
import { ButtonAppBar } from '../navbar/navbar';
import { Footer } from '../common/footer';
import { NavLink } from 'react-router-dom';
import { Art } from 'src/app/interfaces/art';
import { MainFeaturedPost, MainFeaturedPostProps } from '../common/featured-story';
import { useAuth0 } from '@auth0/auth0-react';
import { NavigationBreadcrumb } from '../common/breadcrumbs';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export const ViewArt = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    const { culturalCenterId } = useParams();
    const [culturalCenter, setCulturalCenter] = useState<CulturalCenter>();
    const [art, setArt] = useState<Art[]>([]);
    const [post, setFeaturedPost] = useState<MainFeaturedPostProps>();

    useEffect(() => {
      fetch(`${process.env.NX_API_URL}/art/culturalCenter/${culturalCenterId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
      })
      .then(response => response.json())
      .then((json) => {
        const c = json as { culturalCenter: CulturalCenter, art: Art[]};
        setCulturalCenter(c.culturalCenter);
        if (!isAuthenticated && !isLoading && c.art.length > 0) {
          setArt(c.art.slice(0, 1));
        } else {
          setArt(c.art);
        }
        
        const fpost: MainFeaturedPostProps = {
          post: {
            image: c.culturalCenter.imageLocation,
            imageText: "",
            title: c.culturalCenter.name,
            description: c.culturalCenter.story
          }
        };

        setFeaturedPost(fpost);
      });
    }, []);
    
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <ButtonAppBar pageName='View Cultural Center'/>
      <main>
        {/* Hero unit */}
        <NavigationBreadcrumb culturalCenter={culturalCenter?.name} cityId={culturalCenter?.cityId} culturalCenterId={culturalCenter?.id} />
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
            {art.map((a) => (
              <Grid item key={a.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={a.imageLocation}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {a.name}
                    </Typography>
                    <Typography>
                        {a.story?.substring(0, 50)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <NavLink to={`/view-art-detail/${a.id}`} >View</NavLink>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}