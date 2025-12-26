'use strict';

module.exports = {
  async findBySchoolAndPromId(ctx) {
    const { schoolId, promId } = ctx.params;

    const data = await strapi
      .service('api::prom-page.prom-page')
      .getPromPageBySchool(schoolId, Number(promId));

    if (!data) {
      ctx.notFound();
      return;
    }

    ctx.body = data;
  },
};
