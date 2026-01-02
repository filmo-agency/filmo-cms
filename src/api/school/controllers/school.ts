'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::school.school', ({ strapi }) => ({
  async listSchoolSlugs(ctx) {
    const rows = await strapi.db.query('api::school.school').findMany({
      select: ['slug'],
    });

    const unique = Array.from(new Map(rows.map((r) => [r.slug, r])).values());

    return unique;
  },

  async findPromsBySlug(ctx) {
    const { slug } = ctx.params;

    const school = await strapi.db.query('api::school.school').findOne({
      where: { slug },
      populate: {
        proms: {
          select: ['promId'],
        },
      },
    });

    if (!school) {
      return ctx.notFound('School not found');
    }

    return school.proms.map((prom) => ({
      prom: prom.promId,
    }));
  },
}));
