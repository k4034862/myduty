import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React from 'react';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert sx={props.sx} elevation={6} ref={ref} variant="filled" {...props} />;
});
const position = { vertical: 'top', horizontal: 'center' };
const sx = {};
function BasicSnackbar(props) {
    return (
        <Snackbar open={props.open} onClose={props.onClose} autoHideDuration={2000} anchorOrigin={position}>
            <Alert sx={sx} severity={props.type}>
                {props.message}
            </Alert>
        </Snackbar>
    );
}
export default BasicSnackbar;
