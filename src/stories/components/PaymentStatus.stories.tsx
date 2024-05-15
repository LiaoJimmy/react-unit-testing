import PaymentStatus from '@/components/PaymentStatus';
import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import createMirageServer from '../../../__mocks__/MirageServer';
import { useEffect } from 'react';

const meta = {
  title: 'Components/PaymentStatus',
  component: PaymentStatus,
  tags: ['autodocs'],
  args: { onPay: fn(), onRetry: fn() },
} satisfies Meta<typeof PaymentStatus>;

export default meta;

type Args = Parameters<typeof PaymentStatus>[0];

export const Success = (args: Args) => {
  const server = createMirageServer(undefined, 'development');
  useEffect(() => () => server.shutdown());
  return <PaymentStatus {...args} />;
};

export const Error = (args: Args) => {
  const server = createMirageServer({ paymentStatus: 0 }, 'development');
  useEffect(() => () => server.shutdown());
  return <PaymentStatus {...args} />;
};
