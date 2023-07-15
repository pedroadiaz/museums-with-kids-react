import React, { useEffect, useState } from 'react';
import { Table, TableContainer, Paper, TableBody, TableHead, TableRow, TableCell, Tab, Button } from '@mui/material';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { City } from '../../interfaces/city';

export const HandList = (props: any) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const navigate = useNavigate();
    const [hands, setHands] = useState<City[]>([]);
    useEffect(() => {
        fetch(`https://nh4tl0ai74.execute-api.us-west-1.amazonaws.com/develop/hand-tracker/session/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then((data: City[]) => {
            console.log(data);
            setHands(data);
        });
    }, []);

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Country</TableCell>
                            <TableCell>City</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {hands?.map((row) => (   
                            <TableRow key={row.id}>
                                <TableCell><NavLink to={`/hand-detail/${row.id}`}>{row.country?.toString()}</NavLink></TableCell>
                                <TableCell>{row.city}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="outlined" onClick={() => navigate("/hand-recorder")}>Record New Hand</Button>
        </>
    );
}