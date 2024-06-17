import PaymentMethodDialog from '@/components/PaymentMethodDialog';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<PaymentMethodDialog />', () => {
  it('should render by paymentMethods', async () => {
    const onPay = jest.fn();
    const CREDIT_CARD_ID = 1;
    render(
      <PaymentMethodDialog
        open
        paymentMethods={[
          {
            id: CREDIT_CARD_ID,
            name: 'Credit Card',
          },
          {
            id: 2,
            name: 'Line Pay',
          },
          {
            id: 3,
            name: 'Apple Pay',
          },
        ]}
        onClose={() => {}}
        onPay={onPay}
      />
    );
    const creditCard = screen.getByText('Credit Card');
    expect(onPay).not.toHaveBeenCalled();

    await userEvent.click(creditCard);

    expect(onPay).toHaveBeenCalledWith(1);
    expect(onPay).toHaveBeenCalledWith(CREDIT_CARD_ID);
  });
});
