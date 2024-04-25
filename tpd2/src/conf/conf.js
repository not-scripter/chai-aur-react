const conf = {
  endpoint: String(import.meta.env.VITE_APP_ENDPOINT),
  projectId: String(import.meta.env.VITE_APP_PROJECT_ID),
  databaseId: String(import.meta.env.VITE_APP_DATABASE_ID),
  profilesId: String(import.meta.env.VITE_APP_PROFILES_ID),
  postsId: String(import.meta.env.VITE_APP_POSTS_ID),
  repliesId: String(import.meta.env.VITE_APP_REPLIES_ID),
  imagesId: String(import.meta.env.VITE_APP_IMAGES_ID),
  avatarsId: String(import.meta.env.VITE_APP_AVATARS_ID),
  bannersId: String(import.meta.env.VITE_APP_BANNERS_ID),
};
export default conf;
