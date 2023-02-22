export default {
  argTypes: {
    axis: {
      options: ['x', 'y', 'both'],
      control: { type: 'radio' },
      description: 'Define the axis on which the element is draggable'
    },
    w: {
      control: {
        type: 'number',
        min: 0,
        description: 'Define the width of the element'
      }
    },
    h: {
      control: {
        type: 'number',
        min: 0,
        description: 'Define the height of the element'
      }
    },
    z: {
      control: {
        type: 'number',
        description: 'Define the z-index of the element'
      }
    },
    active: {
      control: 'boolean',
      description: 'Determines if the component should be active or not'
    },
    draggable: {
      control: 'boolean',
      description: 'Defines it the component should be draggable or not'
    },
    resizable: {
      control: 'boolean',
      description: 'Defines it the component should be resizable or not'
    },
    preventDeactivation: {
      control: 'boolean',
      description: 'Determines if the component should be deactivated when the user clicks/taps outside it'
    },
    handles: {
      control: 'inline-check',
      options: ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'],
      description: 'Define the array of handles to restrict the element resizing'
    },
    lockAspectRatio: {
      control: 'boolean',
      description: 'Locks the aspect ratio of the component'
    },
    parent: {
      control: 'boolean',
      description: 'Force the component to stay in the parent element'
    },
    minWidth: {
      control: 'number',
      description: 'The minimum width of the component'
    },
    minHeight: {
      control: 'number',
      description: 'The minimum height of the component'
    },
    maxWidth: {
      control: 'number',
      description: 'The maximum width of the component'
    },
    maxHeight: {
      control: 'number',
      description: 'The maximum height of the component'
    },
    grid: {
      description: 'The definition of the grid'
    }
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    }
  },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: { expanded: true },
    options: {
      storySort: {
        order: ['Basic', '*'],
      },
    }
  }
};
