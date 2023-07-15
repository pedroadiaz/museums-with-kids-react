import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Select, MenuItem, TextField, FormControlLabel, Checkbox } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Feedback } from 'src/app/interfaces/feedback';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { randomUUID } from 'crypto';

type Inputs = {
    email: string;
    feedback: string;
}

const ccTypes = ["Museum", "Place of Worship", "Palace", "House", "Other"];

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

export const AddFeedbackModal = (props: {
    handleOpen: () => void,
    handleClose: () => void,
    open: boolean,
}) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
    const [feedback, setFeedback] = useState<Feedback>({
        id: randomUUID(),
        email: "",
        active: true,
        feedback: "",
        createdDate: new Date()
    })

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/feedback`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const json = (await response.json()) as Feedback;

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
                            Submit Feedback
                        </Typography>
                        <TextField 
                            id="art-name-field"
                            {...register("email")}
                            value={feedback.email}
                            label={feedback.email ?? "Enter an Email"}
                            required
                            type="email"
                            margin="dense" />
                        <TextField 
                            id="art-image-location"
                            {...register("feedback")}
                            value={feedback.feedback}
                            label={feedback.feedback ?? "Enter Feedback"}
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