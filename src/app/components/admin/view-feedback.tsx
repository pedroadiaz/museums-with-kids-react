import React, { useEffect, useState } from 'react';
import { Table, TableContainer, Paper, TableBody, TableHead, TableRow, TableCell, Tab, Button } from '@mui/material';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { City } from '../../interfaces/city';
import { Feedback } from 'src/app/interfaces/feedback';

export const ViewFeedback = (props: any) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState<Feedback[]>([]);

    useEffect(() => {
        fetch(`${process.env.NX_API_URL}/feedback`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => response.json())
        .then((json) => {
            const c = json.data as Feedback[];
            setFeedback(c);
        });        
    }, []);

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>Feedback</TableCell>
                            <TableCell>Date Added</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {feedback?.map((row) => (   
                            <TableRow key={row.id}>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.feedback}</TableCell>
                                <TableCell>{row.createdDate.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}