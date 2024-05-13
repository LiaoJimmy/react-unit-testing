import PayNowButton from '@/components/PayNowButton';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

const meta = {
  title: 'Components/PayNowButton',
  component: PayNowButton,
  tags: ['autodocs'],
  args: { onPay: fn() },
} satisfies Meta<typeof PayNowButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
