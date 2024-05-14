import { render, screen } from '@testing-library/react';
import PayNowButton from '../../../src/components/PayNowButton';

describe('<PayNowButton />', () => {
  it('should render pay now button', () => {
    render(<PayNowButton onPay={() => {}} />);

    const payNowButton = screen.getByText('pay-now');

    expect(payNowButton).toBeInTheDocument();
  });

  it('should open confirm dialog after clicking pay now button', async () => {
    render(<PayNowButton onPay={() => {}} />);
    const payNowButton = screen.getByText('pay-now');

    payNowButton.click();

    const dialogDescription = await screen.findByText('pay-description');
    expect(dialogDescription).toBeInTheDocument();
  });

  it('should call onPay after confirming payment', async () => {
    const onPay = jest.fn();
    render(<PayNowButton onPay={onPay} />);
    const payNowButton = screen.getByText('pay-now');
    payNowButton.click();
    const confirmButton = await screen.findByText('confirm');
    expect(onPay).not.toBeCalled();

    confirmButton.click();

    expect(onPay).toBeCalled();
  });
});
