import React from 'react';
import { OrdersStatUI } from '@ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/OrdersStat',
  component: OrdersStatUI,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'fit-content', margin: 20 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof OrdersStatUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultOrdersStat: Story = {
  args: {
    textStyle: '#E52B1A',
    text: 'Готовится'
  }
};
