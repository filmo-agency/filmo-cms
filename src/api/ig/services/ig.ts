'use strict';

const axios = require('axios');
const CACHE_NAMESPACE = 'ig-cache';
const CACHE_KEY = 'latest-posts';

export default {
  async getCachedPosts() {
    try {
      const store = strapi.store({
        type: 'core',
        name: CACHE_NAMESPACE,
      });

      const cached = (await store.get({ key: CACHE_KEY })) as { items?: unknown[] } | null;
      if (Array.isArray(cached?.items) && cached.items.length > 0) {
        return cached.items;
      }
    } catch (error) {
      strapi.log.warn(`Unable to read Instagram cache: ${error.message}`);
    }

    return null;
  },

  async setCachedPosts(posts) {
    try {
      const store = strapi.store({
        type: 'core',
        name: CACHE_NAMESPACE,
      });

      await store.set({
        key: CACHE_KEY,
        value: {
          items: posts,
          updatedAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      strapi.log.warn(`Unable to write Instagram cache: ${error.message}`);
    }
  },

  async fetchPosts() {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    if (!token) {
      throw new Error('Missing INSTAGRAM_ACCESS_TOKEN');
    }

    const mediaPath = userId ? `${userId}/media` : 'me/media';

    try {
      const res = await axios.get(
        `https://graph.instagram.com/${mediaPath}`,
        {
          params: {
            fields: 'id,media_url,permalink,media_type,thumbnail_url,timestamp',
            access_token: token,
            limit: 3,
          },
          timeout: 10000,
        }
      );

      const posts = res.data.data.map((post) => ({
        id: post.id,
        mediaUrl: post.media_url,
        permalink: post.permalink,
        mediaType: post.media_type,
        thumbnailUrl: post.thumbnail_url ?? null,
        timestamp: post.timestamp ?? null,
      }));

      await this.setCachedPosts(posts);
      return posts;
    } catch (error) {
      const cachedPosts = await this.getCachedPosts();
      if (cachedPosts) {
        strapi.log.warn('Instagram API failed, returning cached posts');
        return cachedPosts;
      }

      if (axios.isAxiosError(error)) {
        const apiMessage = error.response?.data?.error?.message;
        const code = error.response?.data?.error?.code;
        if (code === 190) {
          throw new Error(
            `Instagram token expired/invalid (code 190). ${apiMessage || ''}`.trim()
          );
        }

        throw new Error(
          `Instagram API error${code ? ` (code ${code})` : ''}: ${apiMessage || error.message}`
        );
      }

      throw error;
    }
  },
};
