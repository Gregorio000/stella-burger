import { IngrDetUI } from '@ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/IngrDet',
  component: IngrDetUI,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof IngrDetUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultIngrDet: Story = {
  args: {
    ingredientData: {
      _id: '111',
      name: 'Начинка',
      type: 'main',
      proteins: 23,
      fat: 34,
      carbohydrates: 45,
      calories: 56,
      price: 67,
      image: '',
      image_large: '',
      image_mobile: ''
    }
  }
};
