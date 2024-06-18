import { PaymentMethod } from '@/api/PaymentMethod';
import PaymentMethodDialog from '@/components/PaymentMethodDialog';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const getPaymentMethod = async () => {
  return await new Promise<PaymentMethod[]>((resolve) =>
    resolve([
      { id: 1, name: 'Credit Card' },
      { id: 2, name: 'Line Pay' },
    ])
  );
};

describe('<PaymentMethodDialog />', () => {
  it('should display payment methods', async () => {
    render(
      <PaymentMethodDialog
        open
        getPaymentMethod={getPaymentMethod}
        onClose={() => {}}
        onPay={() => {}}
      />
    );

    const creditCard = await screen.findByText('Credit Card');
    const linePay = await screen.findByText('Line Pay');

    expect(creditCard).toBeInTheDocument();
    expect(linePay).toBeInTheDocument();
  });

  it('should call onPay after clicking a payment method', async () => {
    const onPay = jest.fn();
    const CREDIT_CARD_ID = 1;
    render(
      <PaymentMethodDialog
        open
        getPaymentMethod={getPaymentMethod}
        onClose={() => {}}
        onPay={onPay}
      />
    );
    const creditCard = await screen.findByText('Credit Card');
    expect(onPay).not.toHaveBeenCalled();

    await userEvent.click(creditCard);

    expect(onPay).toHaveBeenCalledWith(1);
    expect(onPay).toHaveBeenCalledWith(CREDIT_CARD_ID);
  });
});
