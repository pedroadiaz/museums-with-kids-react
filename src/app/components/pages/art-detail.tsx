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
import { Art } from 'src/app/interfaces/art';
import { MainFeaturedPost, MainFeaturedPostProps } from '../common/featured-story';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export const ViewArtDetail = () => {
    const { artId } = useParams();
    const [art, setArt] = useState<Art>();
    const [post, setFeaturedPost] = useState<MainFeaturedPostProps>();

    useEffect(() => {
      fetch(`${process.env.NX_API_URL}/art/${artId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
      })
      .then(response => response.json())
      .then((json) => {
        const a = json.data as Art;
        setArt(a);
        const fpost: MainFeaturedPostProps = {
          post: {
            image: a.imageLocation,
            imageText: "",
            title: a.name,
            description: a.story
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
      <Footer />
    </ThemeProvider>
  );
}