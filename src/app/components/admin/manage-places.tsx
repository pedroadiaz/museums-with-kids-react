import React, { useEffect, useState } from 'react';
import { Table, TableContainer, Paper, TableBody, TableHead, TableRow, TableCell, Tab, Button } from '@mui/material';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { City } from '../../interfaces/city';
import { AddCityModal } from '../modals/add-city.modal';
import { ButtonAppBar } from '../navbar/navbar';

export const ManagePlaces = (props: any) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const navigate = useNavigate();
    const [cities, setCities] = useState<City[]>([]);

    useEffect(() => {
        fetch(`${process.env.NX_API_URL}/cities`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then((json) => {
            const c = json.data as City[];
            setCities(c);
        });
    }, []);

    return (
        <>
            <ButtonAppBar pageName='Manage Places'/>
            <Button variant="contained" onClick={handleOpen} style={{ margin: "10px" }}>Add City</Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Country</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Image Location</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cities?.map((row) => (   
                            <TableRow key={row.id}>
                                <TableCell>{row.country}</TableCell>
                                <TableCell><NavLink to={`/admin/manage-cultural-centers/${row.id}`}>{row.city}</NavLink></TableCell>
                                <TableCell>{row.imageLocation}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddCityModal 
                handleClose={handleClose}
                handleOpen={handleOpen}
                open={open}
            />
        </>
    );
}