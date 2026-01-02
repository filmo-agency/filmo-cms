'use strict';

module.exports = {
  async getPortfolio() {
    const schools = await strapi.entityService.findMany(
      'api::school.school',
      {
        sort: { priority: 'asc' },
        fields: ['slug', 'name', 'priority'],
        populate: {
          logo: { fields: ['url'] },
          cover: { fields: ['url'] }
        },
      }
    );

    return {
      // Algun dia crear la interfaz
      schools: (schools as any[]).map((school) => ({
        id: school.slug,
        name: school.name,
        priority: school.priority,
        logo: school.logo?.url ?? null,
        cover: school.cover?.url ?? null
      })),
    };
  },
};
