import axios from 'axios';

export interface PaymentMethod {
  id: number;
  name: string;
}

export const getPrePay = async () => {
  const response = await axios.get<PaymentMethod[]>(
    '/api/payment-methods/pre-pay'
  );
  return response.data;
};

export const getPostPay = async () => {
  const response = await axios.get<PaymentMethod[]>(
    '/api/payment-methods/post-pay'
  );
  return response.data;
};

export default undefined;
