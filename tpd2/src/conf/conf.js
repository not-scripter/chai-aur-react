export default const conf = {
  endpoint: String(import.meta.env.VITE_APP_ENDPOINT),
  projectId: String(import.meta.env.VITE_APP_PROJECT_ID),
  databaseId: String(import.meta.env.VITE_APP_DATABASE_ID),
  postsId: String(import.meta.env.VITE_APP_POSTS_ID),
  repliesId: String(import.meta.env.VITE_APP_REPLIES_ID),
  imagesId: String(import.meta.env.VITE_APP_IMAGES_ID),
};
