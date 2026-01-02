'use strict';

module.exports = {
  async getSchoolPage(slug) {
    const school = await strapi.entityService.findMany(
      'api::school.school',
      {
        filters: { slug },
        fields: ['slug', 'name'],
        populate: {
          logo: { fields: ['url'] },
          cover: { fields: ['url'] },
          proms: {
            fields: ['promId'],
            sort: { promId: 'desc' },
            populate: {
              promCover: { fields: ['url'] },
            },
          },
        },
      }
    );

    const s = (school as any[])[0];
    if (!s) return null;

    return {
      id: s.slug,
      name: s.name,
      logo: s.logo?.url ?? null,
      cover: s.cover?.url ?? null,
      proms: s.proms.map((p) => ({
        id: p.promId,
        cover: p.promCover?.url ?? null,
      })),
    };
  },
};
