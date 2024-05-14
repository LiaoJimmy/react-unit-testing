import { Box, Button, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const getPaymentStatus = async () => {
  const response = await axios.get('/api/payment-status');
  return response.data;
};

const PaymentStatusResult = {
  Error: 0,
  Success: 1,
};

interface PaymentStatusProps {
  onPay: () => void;
  onRetry: () => void;
}

const PaymentStatus = ({ onPay, onRetry }: PaymentStatusProps) => {
  const [t] = useTranslation();
  const [paymentStatus, setPaymentStatus] = useState<number>();

  const init = async () => {
    const data = await getPaymentStatus();
    setPaymentStatus(data.status);
  };

  useEffect(() => {
    init();
  }, []);

  if (paymentStatus === undefined) return <CircularProgress />;
  if (paymentStatus === PaymentStatusResult.Success)
    return (
      <>
        <Typography>{t('payment-completed')}</Typography>
        <Box marginTop="6px">
          <Button variant="contained" onClick={onPay}>
            {t('confirm')}
          </Button>
        </Box>
      </>
    );
  if (paymentStatus === PaymentStatusResult.Error)
    return (
      <>
        <Typography>{t('payment-failed')}</Typography>
        <Box marginTop="6px">
          <Button variant="contained" onClick={onRetry}>
            {t('retry')}
          </Button>
        </Box>
      </>
    );
};

export default PaymentStatus;
