'use strict';

module.exports = {
  async getHomeData() {
    const schools = await strapi.entityService.findMany(
      'api::school.school',
      {
        sort: { priority: 'asc' },
        fields: ['schoolId', 'school', 'priority'],
        populate: {
          schoolLogo: { fields: ['url'] },
          schoolCover: { fields: ['url'] },

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
        id: school.schoolId,
        name: school.school,
        priority: school.priority,
        logo: school.schoolLogo?.url ?? null,
        cover: school.schoolCover?.url ?? null,
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