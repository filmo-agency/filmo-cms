'use strict';

module.exports = {
  async getSchoolPage(schoolId) {
    const school = await strapi.entityService.findMany(
      'api::school.school',
      {
        filters: { schoolId },
        fields: ['schoolId', 'school'],
        populate: {
          schoolLogo: { fields: ['url'] },
          schoolCover: { fields: ['url'] },
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
      id: s.schoolId,
      name: s.school,
      logo: s.schoolLogo?.url ?? null,
      cover: s.schoolCover?.url ?? null,
      proms: s.proms.map((p) => ({
        id: p.promId,
        cover: p.promCover?.url ?? null,
      })),
    };
  },
};
