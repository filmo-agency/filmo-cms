export default {
  routes: [
    {
      method: 'GET',
      path: '/ig',
      handler: 'ig.getPosts',
      config: { auth: false },
    },
  ],
};
