import { screen } from '@testing-library/react';
import createMirageServer from '../../../__mocks__/MirageServer';
import PaymentStatus from '@/components/PaymentStatus';
import { Server } from 'miragejs';
import { setup } from '../../UserEvent';

describe('<PaymentStatus />', () => {
  let server: Server;

  afterEach(() => {
    server?.shutdown();
  });

  it('should display confirm button if payment status is success', async () => {
    server = createMirageServer({
      paymentStatus: 1,
    });
    setup(<PaymentStatus onPay={() => {}} onRetry={() => {}} />);

    const confirmButton = await screen.findByText('confirm');

    expect(confirmButton).toBeInTheDocument();
  });

  it('should call onPay when user clicks confirm button', async () => {
    const onPay = jest.fn();
    server = createMirageServer({
      paymentStatus: 1,
    });
    const { user } = setup(<PaymentStatus onPay={onPay} onRetry={() => {}} />);
    const confirmButton = await screen.findByText('confirm');
    expect(onPay).not.toBeCalled();

    await user.click(confirmButton);

    expect(onPay).toBeCalled();
  });

  it('should display retry button if payment status is error', async () => {
    server = createMirageServer({
      paymentStatus: 0,
    });
    setup(<PaymentStatus onPay={() => {}} onRetry={() => {}} />);

    const retryButton = await screen.findByText('retry');

    expect(retryButton).toBeInTheDocument();
  });

  it('should call onRetry when user clicks retry button', async () => {
    const onRetry = jest.fn();
    server = createMirageServer({
      paymentStatus: 0,
    });
    const { user } = setup(
      <PaymentStatus onPay={() => {}} onRetry={onRetry} />
    );
    const retryButton = await screen.findByText('retry');
    expect(onRetry).not.toBeCalled();

    await user.click(retryButton);

    expect(onRetry).toBeCalled();
  });
});
