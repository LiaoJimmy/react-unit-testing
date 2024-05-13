import PaymentStatus from '@/components/PaymentStatus';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

const meta = {
  title: 'Components/PaymentStatus',
  component: PaymentStatus,
  tags: ['autodocs'],
  args: { onPay: fn(), onRetry: fn() },
} satisfies Meta<typeof PaymentStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
