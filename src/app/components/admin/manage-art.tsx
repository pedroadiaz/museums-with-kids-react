import React, { useEffect, useState } from 'react';
import { Table, TableContainer, Paper, TableBody, TableHead, TableRow, TableCell, Tab, Button } from '@mui/material';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Art } from '../../interfaces/art';
import { CulturalCenter } from 'src/app/interfaces/culturalCenter';
import { AddArtModal } from '../modals/add-art.modal';

export const ManageArt = (props: any) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const navigate = useNavigate();
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
        <>
            <Button onClick={handleOpen}>Add Art</Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Cultural Center</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Is Sensitive</TableCell>
                            <TableCell>Image Location</TableCell>
                            <TableCell>Date Added</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {art?.map((row) => (   
                            <TableRow key={row.id}>
                                <TableCell>{culturalCenter?.name}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.sensitive}</TableCell>
                                <TableCell>{row.imageLocation}</TableCell>
                                <TableCell>{row.createdDate.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {culturalCenterId &&
            <AddArtModal 
                handleClose={handleClose}
                handleOpen={handleOpen}
                open={open}
                culturalCenterId={culturalCenterId}
            />
            }
        </>
    );
}