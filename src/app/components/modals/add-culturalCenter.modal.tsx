import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Select, MenuItem, TextField, FormControlLabel, Checkbox } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CulturalCenter } from 'src/app/interfaces/culturalCenter';
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

export const AddCulturalCenterModal = (props: {
    handleOpen: () => void,
    handleClose: () => void,
    open: boolean,
    cityId: string,
}) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
    const [culturalCenter, setCulturalCenter] = useState<CulturalCenter>({
        id: randomUUID(),
        name: "",
        type: "Museum",
        cityId: props.cityId,
        active: true,
        imageLocation: "",
        story: "",
        sensitive: false,
        createdDate: new Date()
    })

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/culturalCenters`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const json = (await response.json()) as CulturalCenter;

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
                            Add a Cultural Center
                        </Typography>
                        <TextField 
                            id="cultural-center-name-field"
                            {...register("name")}
                            value={culturalCenter.name}
                            label={culturalCenter.name ?? "Enter a Name"}
                            required
                            margin="dense" />
                        <Select
                            labelId="cultural-center-type"
                            value={culturalCenter.type}
                            label="type"
                            id="type-select"
                            required
                            margin='dense'
                            {...register("type")}
                        >
                            {ccTypes.map((type, index) => 
                                (<MenuItem key={index} value={type}>{type}</MenuItem>)
                            )}
                        </Select>
                        <TextField 
                            id="cultural-center-image-location"
                            {...register("imageLocation")}
                            value={culturalCenter.imageLocation}
                            label={culturalCenter.imageLocation ?? "Enter an Image Location"}
                            required
                            margin="dense" />
                        <FormControlLabel
                            control={
                                <Checkbox 
                                id="cultural-center-sensitive-checkbox" 
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