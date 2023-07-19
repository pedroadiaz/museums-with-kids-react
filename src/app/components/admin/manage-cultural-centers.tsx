import React, { useEffect, useState } from 'react';
import { Table, TableContainer, Paper, TableBody, TableHead, TableRow, TableCell, Tab, Button, Typography } from '@mui/material';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { City } from '../../interfaces/city';
import { CulturalCenter } from 'src/app/interfaces/culturalCenter';
import { AddCulturalCenterModal } from '../modals/add-culturalCenter.modal';

export const ManageCulturalCenters = (props: any) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const navigate = useNavigate();
    const { cityId } = useParams();
    const [culturalCenters, setCulturalCenters] = useState<CulturalCenter[]>([]);
    const [city, setCity] = useState<City>();

    useEffect(() => {
        fetch(`${process.env.NX_API_URL}/culturalCenters/city/${cityId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => response.json())
        .then((json) => {
            const c = json as { cultruralCenters: CulturalCenter[], city: City};
            setCulturalCenters(c.cultruralCenters);
            setCity(c.city);
        });
    }, []);
    
    return (
        <>
            <Typography id="city-name" variant="h3" component="h1" style={{ margin: "auto", textAlign: "center" }}>
                {city?.city}
            </Typography>
            <Button onClick={handleOpen}>Add Cultural Center</Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>City</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Is Sensitive</TableCell>
                            <TableCell>Image Location</TableCell>
                            <TableCell>Date Added</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {culturalCenters?.map((row) => (   
                            <TableRow key={row.id}>
                                <TableCell>{city?.city}</TableCell>
                                <TableCell><NavLink to={`/admin/manage-art/${row.id}`}>{row.name}</NavLink></TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell>{row.sensitive}</TableCell>
                                <TableCell>{row.imageLocation}</TableCell>
                                <TableCell>{row.createdDate.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {cityId &&
            <AddCulturalCenterModal 
                handleClose={handleClose}
                handleOpen={handleOpen}
                open={open}
                cityId={cityId}
                cityName={city?.city}
            />
            }
        </>
    );
}