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


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export const ViewArt = () => {
    const { culturalCenterId } = useParams();
    const [culturalCenter, setCulturalCenter] = useState<CulturalCenter>();
    const [art, setArt] = useState<Art[]>([]);

    useEffect(() => {
      fetch(`${process.env.NX_API_URL}/art/culturalCenter/${culturalCenterId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
      })
      .then(response => response.json())
      .then((json) => {
        const c = json as { cultruralCenter: CulturalCenter, art: Art[]};
        setCulturalCenter(c.cultruralCenter);
        setArt(c.art);
      });
    }, []);
    
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <ButtonAppBar pageName='Cities'/>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {culturalCenter?.name}
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              {culturalCenter?.story}
            </Typography>
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