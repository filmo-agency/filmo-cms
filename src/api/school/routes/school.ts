export default {
  routes: [
    {
      method: 'GET',
      path: '/schools/:schoolId',
      handler: 'school.findBySchoolId',
      config: {
        auth: false,
      },
    },
  ],
};
