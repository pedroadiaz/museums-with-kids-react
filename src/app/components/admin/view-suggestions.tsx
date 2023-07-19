import React, { useEffect, useState } from 'react';
import { Table, TableContainer, Paper, TableBody, TableHead, TableRow, TableCell, Tab, Button } from '@mui/material';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Suggestion } from 'src/app/interfaces/suggestion';

export const ViewSuggestions = (props: any) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const navigate = useNavigate();
    const [suggestion, setSuggestion] = useState<Suggestion[]>([]);

    useEffect(() => {
        fetch(`${process.env.NX_API_URL}/suggestion`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then((json) => {
            const c = json.data as Suggestion[];
            setSuggestion(c);
        });
    }, []);

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Cultural Center</TableCell>
                            <TableCell>Art</TableCell>
                            <TableCell>Date Added</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {suggestion?.map((row) => (   
                            <TableRow key={row.id}>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.city}</TableCell>
                                <TableCell>{row.culturalCenter}</TableCell>
                                <TableCell>{row.art}</TableCell>
                                <TableCell>{row.createdDate.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}