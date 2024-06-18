import axios from 'axios';

export const getPaymentStatus = async () => {
  const response = await axios.get<{ status: number }>('/api/payment-status');
  return response.data;
};

export default undefined;
