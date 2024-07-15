import { screen } from '@testing-library/react';
import PayNowButton from '@/components/PayNowButton';
import { setup } from '../../UserEvent';

describe('<PayNowButton />', () => {
  it('should render pay now button', () => {
    setup(<PayNowButton onPay={() => {}} />);

    const payNowButton = screen.getByText('pay-now');

    expect(payNowButton).toBeInTheDocument();
  });

  it('should open confirm dialog after clicking pay now button', async () => {
    const { user } = setup(<PayNowButton onPay={() => {}} />);
    const payNowButton = screen.getByText('pay-now');

    await user.click(payNowButton);

    const dialogDescription = await screen.findByText('pay-description');
    expect(dialogDescription).toBeInTheDocument();
  });

  it('should call onPay after confirming payment', async () => {
    const onPay = jest.fn();
    const { user } = setup(<PayNowButton onPay={onPay} />);
    const payNowButton = screen.getByText('pay-now');
    await user.click(payNowButton);
    const confirmButton = await screen.findByText('confirm');
    expect(onPay).not.toBeCalled();

    await user.click(confirmButton);

    expect(onPay).toBeCalled();
  });
});
