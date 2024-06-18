import { PaymentMethod } from '@/api/PaymentMethod';
import PaymentMethodDialog from '@/components/PaymentMethodDialog';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<PaymentMethodDialog />', () => {
  it('should render by paymentMethods', async () => {
    const onPay = jest.fn();
    const CREDIT_CARD_ID = 1;
    const getPaymentMethod = async () => {
      return await new Promise<PaymentMethod[]>((resolve) =>
        resolve([{ id: CREDIT_CARD_ID, name: 'Credit Card' }])
      );
    };
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
