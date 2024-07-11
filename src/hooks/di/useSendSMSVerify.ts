import { verify } from '@/api/SMS';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast as ReactToastify } from 'react-toastify';

interface Toast {
  success: (message: string) => void;
  error: (message: string) => void;
}

const sendSMSVerify = (phoneNumber: string, toast: Toast) => {
  const [t] = useTranslation();
  const [disabled, setDisabled] = useState(false);

  const send = async () => {
    try {
      setDisabled(true);
      await verify(phoneNumber);
      toast.success(t('send-sms-verify-success'));
    } catch (error) {
      toast.error(t('send-sms-verify-failed'));
    }
  };

  return [send, disabled] as const;
};

const useSendSMSVerify = (phoneNumber: string) => {
  return sendSMSVerify(phoneNumber, ReactToastify);
};

export default useSendSMSVerify;