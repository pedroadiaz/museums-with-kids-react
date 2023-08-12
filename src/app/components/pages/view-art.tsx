import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CulturalCenter } from 'src/app/interfaces/culturalCenter';
import { ButtonAppBar } from '../navbar/navbar';
import { Footer } from '../common/footer';
import { Art } from 'src/app/interfaces/art';
import { MainFeaturedPost, MainFeaturedPostProps } from '../common/featured-story';
import { NavigationBreadcrumb } from '../common/breadcrumbs';
import { SmallCard } from '../common/small-card';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { HomePage } from './home-page';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const ViewArtComponent = () => {
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
        setArt(c.art);
        
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
        <NavigationBreadcrumb culturalCenter={culturalCenter?.name} cityId={culturalCenter?.cityId} culturalCenterId={culturalCenter?.id}  isAuthorized={true}/>
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
              <SmallCard id={a.id} name={a?.name} story={a?.story} imageLocation={a?.imageLocation} url='/view-art-detail' />
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export const ViewArt = withAuthenticationRequired(ViewArtComponent, {
  onRedirecting: () => <HomePage />
})