import { render, screen } from '@testing-library/react';
import PayNowButton from '../../../src/components/PayNowButton';
import userEvent from '@testing-library/user-event';

describe('<PayNowButton />', () => {
  it('should render pay now button', () => {
    render(<PayNowButton onPay={() => {}} />);

    const payNowButton = screen.getByText('pay-now');

    expect(payNowButton).toBeInTheDocument();
  });

  it('should open confirm dialog after clicking pay now button', async () => {
    render(<PayNowButton onPay={() => {}} />);
    const payNowButton = screen.getByText('pay-now');

    await userEvent.click(payNowButton);

    const dialogDescription = await screen.findByText('pay-description');
    expect(dialogDescription).toBeInTheDocument();
  });

  it('should call onPay after confirming payment', async () => {
    const onPay = jest.fn();
    render(<PayNowButton onPay={onPay} />);
    const payNowButton = screen.getByText('pay-now');
    await userEvent.click(payNowButton);
    const confirmButton = await screen.findByText('confirm');
    expect(onPay).not.toBeCalled();

    await userEvent.click(confirmButton);

    expect(onPay).toBeCalled();
  });
});
