import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SignIn from '../../pages/signIn';


export default function BasicModal({ isOpen, setIsOpen, children }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  }
  
  React.useEffect(() => {
    if(isOpen){
      handleOpen();
    }
  }, [isOpen])
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {children}
      </Modal>
    </div>
  );
}
