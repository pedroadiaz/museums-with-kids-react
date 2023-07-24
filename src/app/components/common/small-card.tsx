import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const SmallCard = (props: {
    id: string;
    url: string;
    name: string | undefined;
    story: string | undefined;
    imageLocation: string | undefined;
}) => {
    const navigate = useNavigate();

    const clickCard = () => {
      navigate(`${props.url}/${props.id}`)
    }

    return (
        <Grid item key={props.id} xs={12} sm={6} md={4}>
            <Card onClick={clickCard}
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardMedia
                    component="div"
                    sx={{
                        // 16:9
                        pt: '56.25%',
                    }}
                    image={props.imageLocation}
                    />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.name}
                    </Typography>
                    <Typography>
                        {props.story?.substring(0, 50)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <NavLink to={`${props.url}/${props.id}`} >View</NavLink>
                </CardActions>
            </Card>
        </Grid>
    );
}