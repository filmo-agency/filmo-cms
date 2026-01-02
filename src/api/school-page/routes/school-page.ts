export default {
  routes: [
    {
      method: 'GET',
      path: '/schools/:slug',
      handler: 'school-page.show',
      config: {
        auth: false,
      },
    },
  ],
};
