import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const ModalDelete = ({ open, onClose, onDelete, clientName }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={{ ...style}} className='flex-column justify-content-center text-center'>
                <h2 id="modal-title">Delete D:</h2>
                <p id="modal-description">
                    Are you sure you want to delete <b>{clientName}</b>?
                </p>
                <Button onClick={onClose} variant="contained" className='me-3'>Cancel</Button>
                <Button onClick={onDelete} variant="contained" color="error">Yes, I'm sure</Button>
            </Box>
        </Modal>
    );
};

export { ModalDelete };