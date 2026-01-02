export default {
  routes: [
    {
      method: 'GET',
      path: '/schools/slugs',
      handler: 'school.listSchoolSlugs',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/schools/:slug/proms',
      handler: 'school.findPromsBySlug',
      config: {
        auth: false,
      },
    },
  ],
};