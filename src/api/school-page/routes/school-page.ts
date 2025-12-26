export default {
  routes: [
    {
      method: 'GET',
      path: '/schools/:schoolId',
      handler: 'school-page.show',
      config: {
        auth: false,
      },
    },
  ],
};
