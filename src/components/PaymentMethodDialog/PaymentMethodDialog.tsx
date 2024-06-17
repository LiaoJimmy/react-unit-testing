import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface PaymentMethods {
  id: number;
  name: string;
}

interface PaymentMethodModalProps {
  open: boolean;
  isPrePaid: boolean;
  onClose: () => void;
  onPay: (id: number) => void;
}

const getPrePay = async () => {
  const response = await axios.get<PaymentMethods[]>(
    '/api/payment-methods/pre-pay'
  );
  return response.data;
};

const getPostPay = async () => {
  const response = await axios.get<PaymentMethods[]>(
    '/api/payment-methods/post-pay'
  );
  return response.data;
};

const PaymentMethodModal = ({
  open,
  isPrePaid,
  onClose,
  onPay,
}: PaymentMethodModalProps) => {
  const [t] = useTranslation();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethods[]>([]);

  useEffect(() => {
    const init = async () => {
      if (isPrePaid) {
        const data = await getPrePay();
        setPaymentMethods(data);
      } else {
        const data = await getPostPay();
        setPaymentMethods(data);
      }
    };

    init();
  }, [isPrePaid]);

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

// import {
//   Box,
//   Button,
//   Dialog,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from '@mui/material';
// import axios from 'axios';
// import { useTranslation } from 'react-i18next';

// interface PaymentMethods {
//   id: number;
//   name: string;
// }

// interface PaymentMethodModalProps {
//   open: boolean;
//   paymentMethods: PaymentMethods[];
//   onClose: () => void;
//   onPay: (id: number) => void;
// }

// const PaymentMethodModal = ({
//   open,
//   paymentMethods,
//   onClose,
//   onPay,
// }: PaymentMethodModalProps) => {
//   const [t] = useTranslation();

//   const handleButtonClick = (id: number) => {
//     onPay(id);
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth>
//       <DialogTitle>{t('pay-now')}</DialogTitle>
//       <DialogContent>
//         <DialogContentText id="alert-dialog-description">
//           {t('pay-description')}
//         </DialogContentText>
//         <Box
//           display="grid"
//           gridTemplateColumns="repeat(3, 1fr)"
//           gap={2}
//           mt={2}
//           textAlign={'center'}
//         >
//           {paymentMethods.map((method) => (
//             <Button
//               key={method.id}
//               variant="contained"
//               color="primary"
//               onClick={() => handleButtonClick(method.id)}
//             >
//               {method.name}
//             </Button>
//           ))}
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default PaymentMethodModal;
