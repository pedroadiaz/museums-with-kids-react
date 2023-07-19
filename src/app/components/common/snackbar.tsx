import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';

export const SnackbarComponent = (props: {
    handleClose: () => void,
    open: boolean,
    message: string,
    severtiy: "success" | "warning" | "info" | "error"
}) => {
    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose}>
        <Alert onClose={props.handleClose} severity={props.severtiy} sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      </Snackbar>
    );
}