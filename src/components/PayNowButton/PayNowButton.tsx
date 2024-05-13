import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface PayNowButtonProps {
  onPay: () => void;
}

const PayNowButton = ({ onPay }: PayNowButtonProps) => {
  const [t] = useTranslation();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handlePayNowClick = () => {
    setOpen(true);
  };

  const handleConfirmClick = () => {
    handleClose();
    onPay();
  };

  return (
    <>
      <Button variant="contained" onClick={handlePayNowClick}>
        {t('pay-now')}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('pay-now')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('pay-description')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('cancel')}</Button>
          <Button onClick={handleConfirmClick}>{t('confirm')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PayNowButton;
