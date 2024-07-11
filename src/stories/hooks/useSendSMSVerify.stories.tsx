import useSendSMSVerify from '@/hooks/useSendSMSVerify';
import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import createMirageServer from '../../../__mocks__/MirageServer';

const meta = {
  title: 'hooks/useSendSMSVerify',
};

export default meta;

export const Primary = () => {
  const [t] = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [send, disabled] = useSendSMSVerify(phoneNumber);

  useEffect(() => {
    createMirageServer({}, 'development');
  });

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="300px"
      alignItems="flex-start"
    >
      <TextField
        fullWidth
        label="Phone number"
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
      />
      <Button onClick={send} disabled={disabled}>
        {t('send-sms-verify')}
      </Button>
      <ToastContainer theme="dark" position="bottom-center" />
    </Box>
  );
};