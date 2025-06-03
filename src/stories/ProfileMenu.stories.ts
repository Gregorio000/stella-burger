import { ProfileMUI } from '@ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/ProfileM',
  component: ProfileMUI,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof ProfileMUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultProfileM: Story = {
  args: {
    pathname: '/profile',
    handleLogout: () => {}
  }
};
