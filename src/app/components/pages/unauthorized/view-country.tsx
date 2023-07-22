import React, { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { CountryFeaturedPostProps, CountryFeaturedPost } from '../../common/country-featured-story';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom';

export const UnauthorizedViewCountry = () => {
    const country = "Spain";
    const post: CountryFeaturedPostProps = {
        post: {
          image: "assets/images/Madrid2.png",
          imageText: "",
          country: country,
          isAuthorized: false
        }
      };

    return (
        <>
            <NavLink to={"/"} style={{ margin: "auto" }}>
                <HomeIcon></HomeIcon>
            </NavLink>
            <Box 
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
                key={country}
                >
                <Container maxWidth="lg">
                    <CountryFeaturedPost post={post?.post} />
                </Container>
            </Box>
        </>

    )
}