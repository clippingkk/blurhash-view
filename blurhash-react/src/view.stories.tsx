import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BlurhashView from './view';

export default {
  title: 'BlurhashView',
  component: BlurhashView,
  argTypes: {},
} as ComponentMeta<typeof BlurhashView>;

const Template: ComponentStory<typeof BlurhashView> = args => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <BlurhashView {...args} />
    </div>
  )
};

export const BlurViewStory = Template.bind({});
BlurViewStory.args = {
  className: '',
  style: {
    borderRadius: 4,
    boxShadow: '0px 0px 16px 0px rgba(0, 0, 0 ,0.6)',
  },
  blurhashValue: 'LEHLk~WB2yk8pyo0adR*.7kCMdnj',
  src: 'https://picsum.photos/361/200',
  width: 361,
  height: 200
};
