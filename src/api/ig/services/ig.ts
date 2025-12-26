import axios from 'axios';

export default {
  
  async getPosts() {
    try {
      const token = process.env.INSTAGRAM_ACCESS_TOKEN;
      const userId = process.env.INSTAGRAM_USER_ID;

      const res = await axios.get(
        `https://graph.instagram.com/${userId}/media`,
        {
          params: {
            fields: 'id,media_url,permalink,thumbnail_url,media_type,caption',
            access_token: token,
          },
        }
      );

      return res.data.data.slice(0, 3);
    } catch (err: any) {
      console.error(
        'Instagram error:',
        err.response?.data || err.message
      );
      throw err;
    }
  },
};
