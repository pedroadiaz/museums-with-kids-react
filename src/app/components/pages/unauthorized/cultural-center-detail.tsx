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
import { NavLink } from 'react-router-dom';
import { Art } from 'src/app/interfaces/art';
import { MainFeaturedPost, MainFeaturedPostProps } from '../../common/featured-story';
import HomeIcon from '@mui/icons-material/Home';
import { NavigationBreadcrumb } from '../../common/breadcrumbs';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export const CulturalCenterDetail = () => {
    const { culturalCenterId } = useParams();
    const [culturalCenter, setCulturalCenter] = useState<CulturalCenter>();
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
      <main>
        {/* Hero unit */}
        <NavLink to={"/"} style={{ margin: "auto" }}>
            <HomeIcon></HomeIcon>
        </NavLink>
        <NavigationBreadcrumb culturalCenter={culturalCenter?.name} cityId={culturalCenter?.cityId} culturalCenterId={culturalCenter?.id}  isAuthorized={false}/>
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
      </main>
    </ThemeProvider>
  );
}