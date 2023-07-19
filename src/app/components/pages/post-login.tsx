import React, { useEffect, useState } from 'react';
import { City } from 'src/app/interfaces/city';
import { CountryFeaturedPostProps, CountryFeaturedPost } from '../common/country-featured-story';
import { ButtonAppBar } from '../navbar/navbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export const HomePage = () => {
    const [countries, setCountries] = useState<string[]>([]);
    const [posts, setFeaturedPosts] = useState<CountryFeaturedPostProps[]>();

    useEffect(() => {
      fetch(`${process.env.NX_API_URL}/cities`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
      })
      .then(response => response.json())
      .then((json) => {
        const cities = json.data as City[];
        const countries = [...new Set(cities.map(item => item.country))];
        setCountries(countries);
        if (cities.length > 0) {
          const featuredPosts = countries.map(country => {
            const city = cities.find(city => city.country === country);

            const fpost: CountryFeaturedPostProps = {
                post: {
                  image: city?.imageLocation,
                  imageText: "",
                  country: country
                }
              };

            return fpost;
          })
  
          setFeaturedPosts(featuredPosts);
        }
      });
    }, []);


    return (
        <>
            <ButtonAppBar pageName='Home Page'/>
            {posts?.map((post) => (
                <Box
                    sx={{
                      bgcolor: 'background.paper',
                      pt: 8,
                      pb: 6,
                    }}
                  >
                    <Container maxWidth="lg">
                        <CountryFeaturedPost post={post?.post} />
                    </Container>
                  </Box>)
            )}
        </>
    )
}