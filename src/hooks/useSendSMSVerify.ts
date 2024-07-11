import { verify } from '@/api/SMS';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const useSendSMSVerify = (phoneNumber: string) => {
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

export default useSendSMSVerify;
