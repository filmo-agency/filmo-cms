'use strict';

module.exports = {
  async show(ctx) {
    const { slug } = ctx.params;

    const data = await strapi
      .service('api::school-page.school-page')
      .getSchoolPage(slug);

    if (!data) {
      ctx.notFound();
      return;
    }

    ctx.body = data;
  },
};
