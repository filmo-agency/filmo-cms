'use strict';

const axios = require('axios');

export default {
  async fetchPosts() {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    if (!token || !userId) {
      throw new Error('Instagram env vars missing');
    }

    const res = await axios.get(
      `https://graph.instagram.com/${userId}/media`,
      {
        params: {
          fields: 'id,media_url,permalink,media_type,thumbnail_url',
          access_token: token,
          limit: 3,
        },
      }
    );

    return res.data.data.map((post) => ({
      id: post.id,
      mediaUrl: post.media_url,
      permalink: post.permalink,
      mediaType: post.media_type,
      thumbnailUrl: post.thumbnail_url ?? null,
    }));
  },
};
