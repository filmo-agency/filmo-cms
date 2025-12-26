export default {
  routes: [
    {
      method: 'GET',
      path: '/portfolio',
      handler: 'portfolio.index',
      config: {
        auth: false,
      },
    },
  ],
};
