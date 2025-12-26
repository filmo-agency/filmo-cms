module.exports = {
  async home(ctx) {
    const data = await strapi
      .service('api::landing.landing')
      .getHomeData();
      ctx.body = data;
  },
}