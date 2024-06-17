import PaymentMethodDialog from '@/components/PaymentMethodDialog';
import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

const meta = {
  title: 'Components/PaymentMethodDialog',
  component: PaymentMethodDialog,
  tags: ['autodocs'],
  args: { onClose: fn(), onPay: fn() },
} satisfies Meta<typeof PaymentMethodDialog>;

export default meta;

type Args = Parameters<typeof PaymentMethodDialog>[0];

export const Primary = (args: Args) => {
  return (
    <PaymentMethodDialog
      {...args}
      open
      paymentMethods={[
        {
          id: 1,
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
    />
  );
};
