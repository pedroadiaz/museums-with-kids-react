import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Select, MenuItem, TextField, FormControlLabel, Checkbox } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Suggestion } from 'src/app/interfaces/suggestion';
import { SubmitHandler } from 'react-hook-form/dist/types';
import {v4 as uuidv4} from 'uuid';

type Inputs = {
    email: string;
    city?: string;
    culturalCenter?: string;
    art?: string;
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

export const AddSuggestionModal = (props: {
    handleOpen: () => void,
    handleClose: () => void,
    open: boolean,
}) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
    const [suggestion, setSuggestion] = useState<Suggestion>({
        id: uuidv4(),
        email: "",
        active: true,
        city: "",
        culturalCenter: "",
        art: "",
        createdDate: new Date()
    })

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const response = await fetch(`${process.env.NX_API_URL}/suggestion`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const json =(await response.json()) as Suggestion;

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
                            Add a suggestion
                        </Typography>
                        <TextField 
                            id="suggestion-email-field"
                            {...register("email")}
                            value={suggestion.email}
                            label={suggestion.email ?? "Enter an Email"}
                            required
                            type="email"
                            margin="dense" />
                        <TextField 
                            id="suggestion-city"
                            {...register("city")}
                            value={suggestion.city}
                            label={suggestion.city ?? "Enter City"}
                            required
                            margin="dense" />
                        <TextField 
                            id="suggestion-cultural-center"
                            {...register("culturalCenter")}
                            value={suggestion.culturalCenter}
                            label={suggestion.culturalCenter ?? "Enter Cultural Center"}
                            required
                            margin="dense" />
                        <TextField 
                            id="suggestion-art"
                            {...register("art")}
                            value={suggestion.art}
                            label={suggestion.art ?? "Enter Art"}
                            required
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