import PayNowButton from '@/components/PayNowButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/PayNowButton',
  component: PayNowButton,
  tags: ['autodocs'],
} satisfies Meta<typeof PayNowButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'PayNowButton',
  },
};
