import PaymentMethodDialog from '@/components/PaymentMethodDialog';
import { Button } from '@mui/material';
import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import { useEffect, useState } from 'react';
import createMirageServer from '../../../__mocks__/MirageServer';

const meta = {
  title: 'Components/PaymentMethodDialog',
  component: PaymentMethodDialog,
  tags: ['autodocs'],
  args: { onPay: fn() },
} satisfies Meta<typeof PaymentMethodDialog>;

export default meta;

type Args = Parameters<typeof PaymentMethodDialog>[0];

export const PrePaid = (args: Args) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  const server = createMirageServer(undefined, 'development');
  useEffect(() => () => server.shutdown());

  return (
    <>
      <Button onClick={toggleOpen}>PrePay Payment</Button>
      <PaymentMethodDialog
        {...args}
        open={open}
        isPrePay
        onClose={toggleOpen}
      />
    </>
  );
};

export const PostPaid = (args: Args) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  const server = createMirageServer(undefined, 'development');
  useEffect(() => () => server.shutdown());

  return (
    <>
      <Button onClick={toggleOpen}>PostPay Payment</Button>
      <PaymentMethodDialog
        {...args}
        open={open}
        isPrePay={false}
        onClose={toggleOpen}
      />
    </>
  );
};
