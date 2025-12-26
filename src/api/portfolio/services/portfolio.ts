'use strict';

module.exports = {
  async getPortfolio() {
    const schools = await strapi.entityService.findMany(
      'api::school.school',
      {
        sort: { priority: 'asc' },
        fields: ['schoolId', 'school', 'priority'],
        populate: {
          schoolLogo: { fields: ['url'] },
          schoolCover: { fields: ['url'] }
        },
      }
    );

    return {
      // Algun dia crear la interfaz
      schools: (schools as any[]).map((school) => ({
        id: school.schoolId,
        name: school.school,
        priority: school.priority,
        logo: school.schoolLogo?.url ?? null,
        cover: school.schoolCover?.url ?? null
      })),
    };
  },
};
