'use strict';

module.exports = {
  async findBySchoolId(ctx) {
    const { schoolId } = ctx.params;

    const data = await strapi
      .service('api::school-page.school-page')
      .getSchoolPage(schoolId);

    if (!data) {
      ctx.notFound();
      return;
    }

    ctx.body = data;
  },
};
