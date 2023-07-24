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
import {v4 as uuidv4} from 'uuid';

type Inputs = {
    city: string;
    country: string;
    story: string;
    imageLocation?: string;
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
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [story, setStory] = useState("");

    const onChangeCity = (e: any) => {
        setCity(e.target.value);
    }

    const onChangeCountry = (e: any) => {
        setCountry(e.target.value);
    }

    const createStory = async() => {
        const prompt = `Can you summarize a paragraph or two about ${city}, ${country}  in a way a child might understand?`;
        const response = await fetch(`${process.env.NX_API_URL}/openAI`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: prompt })
        });

        const json = (await response.json()); 
        setStory(json.message);
    }

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const cityObject: City = {
            id: uuidv4(),
            createdDate: new Date(),
            story: data.story,
            city: data.city,
            country: data.country,
            active: true,
            imageLocation: data.imageLocation,
        }
        const response = await fetch(`${process.env.NX_API_URL}/cities`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cityObject)
        });

        const json = (await response.json());

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
                            Add a new location
                        </Typography>
                        <TextField 
                            id="city-text-field"
                            {...register("city")}
                            label={"Enter a City"}
                            required
                            type="string"
                            onChange={onChangeCity}
                            style={{ margin: "10px"}}
                            margin="dense" />
                        <TextField 
                            id="country-text-field"
                            {...register("country")}
                            label={"Enter a Country"}
                            required
                            type="string"
                            onChange={onChangeCountry}
                            style={{ margin: "10px"}}
                            margin="dense" />
                        <TextField 
                            id="image-location-text-field"
                            {...register("imageLocation")}
                            label={"Enter an Image Location"}
                            required
                            type="string"
                            style={{ margin: "10px"}}
                            margin="dense" />
                        <TextField 
                            id="story-text-field"
                            {...register("story")}
                            label={"Story"}
                            required
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
            </Box>
        </Modal>
    );
}