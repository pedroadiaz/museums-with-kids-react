import React, { useEffect, useState } from 'react';
import { Table, TableContainer, Paper, TableBody, TableHead, TableRow, TableCell, Tab, Button } from '@mui/material';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { IUser } from 'src/app/interfaces/user';

export const ViewUsers = (props: any) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const navigate = useNavigate();
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        fetch(`${process.env.NX_API_URL}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then((json) => {
            const c = json.data as IUser[];
            setUsers(c);
        });        
    }, []);

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Next Pay Date</TableCell>
                            <TableCell>Date Added</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((row) => (   
                            <TableRow key={row.id}>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.firstName} {row.lastName}</TableCell>
                                <TableCell>{row.paid}</TableCell>
                                <TableCell>{row.nextPayDate?.toLocaleString()}</TableCell>
                                <TableCell>{row.createdDate.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}