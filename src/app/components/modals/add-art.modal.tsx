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
import {v4 as uuidv4} from 'uuid';

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
    const [art, setArt] = useState<Art>()

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const artObject: Art = {
            id: uuidv4(),
            name: data.name,
            culturalCenterId: props.culturalCenterId,
            active: true,
            imageLocation: data.imageLocation,
            story: data.story,
            sensitive: data.sensitive,
            createdDate: new Date()
        };
        const response = await fetch(`${process.env.NX_API_URL}/art`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(artObject)
        });

        const json =await response.json();

        reset();

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
                            label={"Enter a Name"}
                            required
                            style={{ margin: "10px"}}
                            margin="dense" />
                        <TextField 
                            id="art-image-location"
                            {...register("imageLocation")}
                            label={"Enter an Image Location"}
                            required
                            style={{ margin: "10px"}}
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
                            style={{ margin: "10px"}}
                        />
                        <TextField 
                            id="story-text-field"
                            {...register("story")}
                            label={"Story"}
                            type="string"
                            style={{ margin: "10px"}}
                            margin="dense" />
                        <Button
                            onClick={props.handleClose}
                            variant="contained"
                            style={{ margin: "10px"}}
                        >Close</Button>
                        <Button
                            variant="contained"
                            type="submit"
                            style={{ margin: "10px"}}
                        >Save</Button>
                    </FormControl>
                </form>
            </Box>
        </Modal>
    );
}