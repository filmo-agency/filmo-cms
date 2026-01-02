'use strict';

module.exports = {
  async getHomeData() {
    const schools = await strapi.entityService.findMany(
      'api::school.school',
      {
        sort: { priority: 'asc' },
        fields: ['slug', 'name', 'priority'],
        populate: {
          logo: { fields: ['url'] },
          cover: { fields: ['url'] },

          lastProm: {
            fields: ['promId'],
            populate: {
              promCover: { fields: ['url'] },
            },
          },
        },
      }
    );

    return {
      // Algun dia crear la interfaz de school
      schools: (schools as any[]).map((school) => ({
        slug: school.slug,
        name: school.name,
        priority: school.priority,
        logo: school.logo?.url ?? null,
        cover: school.cover?.url ?? null,
        prom: school.lastProm
          ? {
              id: school.lastProm.promId,
              cover: school.lastProm.promCover?.url ?? null,
            }
          : null,
      })),
    };
  },
}