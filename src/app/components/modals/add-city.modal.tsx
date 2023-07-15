import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Select, MenuItem, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { City } from 'src/app/interfaces/city';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { randomUUID } from 'crypto';

type Inputs = {
    city: string;
    country: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const AddCityModal = (props: {
    handleOpen: () => void,
    handleClose: () => void,
    open: boolean
}) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
    const [city, setCity] = useState<City>({
        id: randomUUID(),
        city: "",
        country: "",
        active: true,
        createdDate: new Date()
    })

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/cities`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const json = (await response.json()) as City;

        if (json.id) {
            console.log("Saved successfully!");
            reset();
        }

        props.handleClose();
    }
    
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add a new location
                        </Typography>
                        <TextField 
                            id="city-text-field"
                            {...register("city")}
                            value={city.city}
                            label={city.city ?? "Enter a City"}
                            required
                            type="number"
                            margin="dense" />
                        <TextField 
                            id="country-text-field"
                            {...register("country")}
                            value={city.country}
                            label={city.country ?? "Enter a Country"}
                            required
                            type="number"
                            margin="dense" />
                        <Button
                            variant="contained"
                            type="submit"
                        >Save</Button>
                    </FormControl>
                </form>
            </Box>
        </Modal>
    );
}