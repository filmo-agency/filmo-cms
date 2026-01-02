module.exports = {
  async getPromPageBySchool(slug, promId) {
    const prom = (await strapi.entityService.findMany(
      'api::prom.prom',
      {
        filters: {
          promId,
          school: {
            slug,
          },
        },
        populate: {
          promCover: { fields: ['url'] },
          promPics: { fields: ['url', 'id', 'width', 'height', 'formats'] },
        },
      }
    )) as any[];

    const p = prom[0];
    if (!p) return null;

    return {
      id: p.promId,
      text: p.promText,
      subText: p.promSubText,
      videoId: p.promVideoId,
      cover: p.promCover?.url ?? null,
      pics: p.promPics?.map((pic: any) => {
        const optimalFormat = pic.formats?.medium; 
        const optimizedUrl = optimalFormat?.url ?? pic.url;

        return {
          url: pic.url,
          optimizedUrl: optimizedUrl,
          id: pic.id,
          width: optimalFormat?.width ?? pic.width,
          height: optimalFormat?.height ?? pic.height,
        };
      }) ?? [],
    };
  },
};
