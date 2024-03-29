// @ts-check
const baseDocusaurus = require('../docusaurus.base');

/** @type {import('@docusaurus/types').Config} */
const config = {
  ...baseDocusaurus,
  title: 'userdocks',
  tagline: '',
  url: 'https://docs.userdocks.com',
  staticDirectories: ['../static'],
  themeConfig: {
    ...baseDocusaurus.themeConfig,
    navbar: {
      // @ts-ignore
      ...baseDocusaurus.themeConfig?.navbar,
      title: 'userdocks',
      items: [
        {
          to: '/',
          label: 'Dashboard',
          position: 'left',
        },
        {
          to: '/api',
          label: 'API',
          position: 'left',
        },
        // {
        //   href: 'https://blog.userdocks.com',
        //   label: 'Blog',
        //   position: 'left',
        // },
        // @ts-ignore
        ...baseDocusaurus.themeConfig.navbar.items,
      ],
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          path: 'pages',
          editUrl: 'https://github.com/userdocks/public-resources/tree/main/docs/',
          sidebarPath: 'sidebars.js',
        },
        blog: false,
        theme: {
          customCss: require.resolve('../src/css/custom.css'),
        },
      }),
    ],
  ],
};

module.exports = config;
