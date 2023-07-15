import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Select, MenuItem, TextField, FormControlLabel, Checkbox } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Art } from 'src/app/interfaces/art';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { randomUUID } from 'crypto';

type Inputs = {
    name: string;
    cityid: string;
    type: "Museum" | "Place of Worship" | "Palace" | "House" | "Other";
    imageLocation: string;
    story: string;
    sensitive: boolean;
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

export const AddArtModal = (props: {
    handleOpen: () => void,
    handleClose: () => void,
    open: boolean,
    culturalCenterId: string,
}) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
    const [art, setArt] = useState<Art>({
        id: randomUUID(),
        name: "",
        culturalCenterId: props.culturalCenterId,
        active: true,
        imageLocation: "",
        story: "",
        sensitive: false,
        createdDate: new Date()
    })

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/art`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const json = (await response.json()) as Art;

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
                            Add Art
                        </Typography>
                        <TextField 
                            id="art-name-field"
                            {...register("name")}
                            value={art.name}
                            label={art.name ?? "Enter a Name"}
                            required
                            margin="dense" />
                        <TextField 
                            id="art-image-location"
                            {...register("imageLocation")}
                            value={art.imageLocation}
                            label={art.imageLocation ?? "Enter an Image Location"}
                            required
                            margin="dense" />
                        <FormControlLabel
                            control={
                                <Checkbox 
                                id="art-sensitive-checkbox" 
                                {...register("sensitive")}
                                title="Is Sensitive"
                                name="sensitive-checkbox"
                                />
                            }
                            label="Is Sensitive"
                        />
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