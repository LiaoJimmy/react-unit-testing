import { verify } from '@/api/SMS';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const DISABLED_TIME = 60 * 1000;

const useSendSMSVerify = (phoneNumber: string) => {
  const [t] = useTranslation();
  const [disabled, setDisabled] = useState(false);

  const send = async () => {
    try {
      setDisabled(true);
      await verify(phoneNumber);
      toast.success(t('send-sms-verify-success'));
      setTimeout(() => {
        setDisabled(false);
      }, DISABLED_TIME);
    } catch (error) {
      setDisabled(false);
      toast.error(t('send-sms-verify-failed'));
    }
  };

  return { send, disabled };
};

export default useSendSMSVerify;
