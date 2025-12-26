export default {
  async getPosts(ctx) {
    const posts = await strapi.service('api::ig.ig').getPosts();
    ctx.body = posts;
  },
};
