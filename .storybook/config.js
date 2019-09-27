import { addDecorator, configure } from '@storybook/react';
import { addReadme } from 'storybook-readme';

addDecorator(addReadme);
const req = require.context('../src/components/', true, /\.stories\.tsx$/);
function loadStories() {
  require('../src/stories/global.stories.tsx');
  const keys = req.keys();
  keys.forEach(filename => req(filename));
};

configure(loadStories, module);
