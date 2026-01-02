'use strict';

export default {
  async getPosts(ctx) {
    try {
      const posts = await strapi
        .service('api::ig.ig')
        .fetchPosts();

      return posts;
    } catch (err) {
      console.error('Instagram error:', err.message);
      ctx.throw(500, 'Failed to fetch Instagram posts');
    }
  },
};
