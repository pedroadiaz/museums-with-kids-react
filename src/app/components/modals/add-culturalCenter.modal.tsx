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
import {v4 as uuidv4} from 'uuid';
import { SnackbarComponent } from '../common/snackbar';

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
    cityName?: string,
}) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();

    const [name, setName] = useState("");
    const [sensitive, setSensitive] = useState(false);
    const [story, setStory] = useState("");
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };


    const onChangeName = (e: any) => {
        setName(e.target.value);
    }

    const onChangeSensitive = (e: any) => {
        setSensitive(e.target.value);
    }

    const createStory = async() => {
        const prompt = sensitive ?
         `Can you tell me a story about the ${name} in ${props.cityName} that a child would understand, while being respectful of the meaning` : 
         `Can you tell me a story about the ${name} in ${props.cityName} in a way a child might understand?`;
        
        console.log("prompt: ", prompt);
        try {
            const response = await fetch(`${process.env.NX_API_URL}/openAI`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ prompt: prompt })
            });
    
            const json = (await response.json()); 
            setStory(json.message);
        } catch (error) {
            setMessage("There was a problem generating the story.");
            setOpen(true);
        }

    }

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const cultruralCenter: CulturalCenter = {
            id: uuidv4(),
            name: data.name,
            sensitive: data.sensitive,
            story: data.story,
            createdDate: new Date(),
            active: true,
            imageLocation: data.imageLocation,
            cityId: props.cityId,
            type: data.type,
        }
        const response = await fetch(`${process.env.NX_API_URL}/culturalCenters`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cultruralCenter)
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
                            Add a Cultural Center
                        </Typography>
                        <TextField 
                            id="cultural-center-name-field"
                            {...register("name")}
                            label={"Enter a Name"}
                            required
                            onChange={onChangeName}
                            margin="dense" />
                        <Select
                            labelId="cultural-center-type"
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
                            label={"Enter an Image Location"}
                            required
                            margin="dense" />
                        <FormControlLabel
                            control={
                                <Checkbox 
                                id="cultural-center-sensitive-checkbox" 
                                {...register("sensitive")}
                                title="Is Sensitive"
                                name="sensitive-checkbox"
                                onChange={onChangeSensitive}
                                />
                            }
                            label="Is Sensitive"
                        />
                        <TextField 
                            id="story-text-field"
                            {...register("story")}
                            label={"Story"}
                            type="string"
                            style={{ margin: "10px"}}
                            margin="dense" />
                        <Button
                            onClick={createStory}
                            variant="contained"
                            style={{ margin: "10px"}}
                        >Create Story</Button>
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
                <SnackbarComponent message={message} open={open} handleClose={handleClose} severtiy='error' />
            </Box>
        </Modal>
    );
}