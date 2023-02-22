import path from 'path'

module.exports = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [{
    name: '@storybook/addon-essentials',
    options: {
      backgrounds: false
    }
  }, '@storybook/addon-links', '@storybook/addon-controls'],
  resolve: {
    alias: [
      {
          find: "@",
          replacement: path.resolve(__dirname, "./src"),
      },
    ]
  },
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  core: {
    disableTelemetry: true
  },
  features: {
    storyStoreV7: true
  },
  docs: {
    autodocs: false
  }
};
