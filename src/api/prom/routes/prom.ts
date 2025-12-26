export default {
  routes: [
    {
      method: 'GET',
      path: '/schools/:schoolId/proms/:promId',
      handler: 'prom.findBySchoolAndPromId',
      config: {
        auth: false,
      },
    },
  ],
};
