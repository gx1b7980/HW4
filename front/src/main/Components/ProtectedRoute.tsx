import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust the import path as necessary
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authToken } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      setOpen(true);
      setTimeout(() => navigate('/login'), 3000); 
    }
  }, [authToken, navigate]);

  const handleClose = () => {
    setOpen(false);
    navigate('/login');
  };

  if (!authToken) {
    return (
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Unauthorized Access"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please Sign In To Continue.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Okay
            </Button>
          </DialogActions>
        </Dialog>
        </>
    );
  }

  return children;
};

export default ProtectedRoute;
