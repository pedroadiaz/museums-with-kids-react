import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const CircularProgressThing = (props: {loading: boolean}) => {
  return (
    <>
        {props.loading && (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )}
    </>
  );
}
