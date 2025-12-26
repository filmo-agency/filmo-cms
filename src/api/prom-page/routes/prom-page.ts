export default {
  routes: [
    {
      method: 'GET',
      path: '/proms/:promId',
      handler: 'prom-page.show',
      config: {
        auth: false,
      },
    },
  ],
};
