export default {
  async afterCreate(event) {
    await updateLastProm(event);
  },

  async afterUpdate(event) {
    if (event.params.data.publishedAt) {
      await updateLastProm(event);
    }
  },
};

async function updateLastProm(event) {
  const { result } = event;

  if (!result.school?.id) return;

  const schoolId = result.school.id;

  await strapi.entityService.update(
    'api::school.school',
    schoolId,
    {
      data: {
        lastProm: result.id,
      },
    }
  );
}