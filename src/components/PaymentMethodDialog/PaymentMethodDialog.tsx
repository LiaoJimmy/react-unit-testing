import { PaymentMethod, getPostPay, getPrePay } from '@/api/PaymentMethod';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface PaymentMethodModalProps {
  open: boolean;
  isPrePay: boolean;
  onClose: () => void;
  onPay: (id: number) => void;
}

const PaymentMethodModal = ({
  open,
  isPrePay,
  onClose,
  onPay,
}: PaymentMethodModalProps) => {
  const [t] = useTranslation();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  useEffect(() => {
    const init = async () => {
      if (isPrePay) {
        const data = await getPrePay();
        setPaymentMethods(data);
      } else {
        const data = await getPostPay();
        setPaymentMethods(data);
      }
    };

    init();
  }, [isPrePay]);

  const handleButtonClick = (id: number) => {
    onPay(id);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{t('pay-now')}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t('pay-description')}
        </DialogContentText>
        {paymentMethods.length === 0 ? (
          <Box textAlign="center" mt={2}>
            <CircularProgress />
          </Box>
        ) : null}
        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          gap={2}
          mt={2}
          textAlign={'center'}
        >
          {paymentMethods.map((method) => (
            <Button
              key={method.id}
              variant="contained"
              color="primary"
              onClick={() => handleButtonClick(method.id)}
            >
              {method.name}
            </Button>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodModal;
