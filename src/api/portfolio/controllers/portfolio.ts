'use strict';

module.exports = {
  async index(ctx) {
    const data = await strapi
      .service('api::portfolio.portfolio')
      .getPortfolio();

    ctx.body = data;
  },
};
