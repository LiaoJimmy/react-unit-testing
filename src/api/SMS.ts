import axios from 'axios';

export const verify = async (phoneNumber: string) => {
  const response = await axios.post('/api/sms/verify', { phoneNumber });
  return response.data;
};

export default undefined;
