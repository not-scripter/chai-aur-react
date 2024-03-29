import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf";

export class postServices {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client.setEndpoint(conf.endpoint).setProject(conf.projectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }
  //Profile Services
  async createProfile({
    userId,
    fullname,
    username,
    dob,
    visibility,
    avatar,
    banner,
    email,
    ip,
    location,
    website,
    following,
    followers,
    joined,
  }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.profilesId,
        userId,
        {
          fullname,
          username,
          dob,
          visibility,
          avatar,
          banner,
          email,
          ip,
          location,
          website,
          following,
          followers,
          joined,
        },
      );
    } catch (error) {
      console.log("appwrite :: create profile :: ", error.message);
    }
  }
  async updateProfile({
    userId,
    fullname,
    username,
    dob,
    visibility,
    avatar,
    banner,
    email,
    ip,
    location,
    website,
    following,
    followers,
    joined,
  }) {
    try {
      return await this.databases.updateDocument(
        conf.databaseId,
        conf.profilesId,
        userId,
        {
          fullname,
          username,
          dob,
          visibility,
          avatar,
          banner,
          email,
          ip,
          location,
          website,
          following,
          followers,
          joined,
        },
      );
    } catch (error) {
      console.log("appwrite :: update profile ::", error.message);
    }
  }
  async getProfile(userId) {
    try {
      return await this.databases.getDocument(
        conf.databaseId,
        conf.profilesId,
        userId,
      );
    } catch (error) {
      console.log("appwrite :: get profile ::", error.message);
    }
  }
  async getProfiles() {
    try {
      return await this.databases.listDocuments(
        conf.databaseId,
        conf.profilesId,
        [Query.equal("visibility", "public")],
      );
    } catch (error) {
      console.log("appwrite :: get profiles ::", error.message);
    }
  }

  //Post Services
  async createPost({ slug, userId, title, content, images, visibility }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.postsId,
        slug,
        {
          userId,
          title,
          content,
          images,
          visibility,
        },
      );
    } catch (error) {
      console.log("appwrite :: create post ::", error.message);
    }
  }
  async updatePost({ slug, title, content, images, visibility }) {
    try {
      return await this.databases.updateDocument(
        conf.databaseId,
        conf.postsId,
        slug,
        {
          title,
          content,
          images,
          visibility,
        },
      );
    } catch (error) {
      console.log("appwrite :: update post ::", error.message);
    }
  }
  async deletePost(slug) {
    try {
      return await this.databases.deleteDocument(
        conf.databaseId,
        conf.postsId,
        slug,
      );
    } catch (error) {
      console.log("appwrite :: delete post ::", error.message);
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.databaseId,
        conf.postsId,
        slug,
      );
    } catch (error) {
      console.log("appwrite :: get post ::", error.message);
    }
  }
  async getPosts() {
    try {
      return await this.databases.listDocuments(conf.databaseId, conf.postsId, [
        Query.equal("visibility", "public"),
      ]);
    } catch (error) {
      console.log("appwrite :: get posts ::", error.message);
    }
  }

  async getMyPosts(userId) {
    try {
      return await this.databases.listDocuments(conf.databaseId, conf.postsId, [
        Query.equal("userId", userId),
      ]);
    } catch (error) {
      console.log("appwrite :: get my posts ::", error.message);
    }
  }

  // Storage Services
  // Profile Avatar
  async uploadAvatar(file) {
    try {
      return await this.storage.createFile(conf.avatarsId, ID.unique(), file);
    } catch (error) {
      console.log("appwrite :: uploaf avatar ::", error.message);
    }
  }
  async deleteAvatar(fileId) {
    try {
      return await this.storage.deleteFile(conf.avatarsId, fileId);
    } catch (error) {
      console.log("appwrite :: delete avatar ::", error.message);
    }
  }
  getAvatarPreview(fileId) {
    try {
      return this.storage.getFilePreview(conf.avatarsId, fileId);
    } catch (error) {
      console.log("appwrite :: getAvatarPreview ::", error.message);
    }
  }
  // Profile Banner
  async uploadBanner(file) {
    try {
      return await this.storage.createFile(conf.bannersId, ID.unique(), file);
    } catch (error) {
      console.log("appwrite :: upload banner ::", error.message);
    }
  }
  async deleteBanner(fileId) {
    try {
      return await this.storage.deleteFile(conf.bannersId, fileId);
    } catch (error) {
      console.log("appwrite :: delete banner ::", error.message);
    }
  }
  getBannerPreview(fileId) {
    try {
      return this.storage.getFilePreview(conf.bannersId, fileId);
    } catch (error) {
      console.log("appwrite :: get banner preview ::", error.message);
    }
  }

  // Storage Services
  async uploadFile(file) {
    try {
      return await this.storage.createFile(conf.imagesId, ID.unique(), file);
    } catch (error) {
      console.log("appwrite :: upload file ::", error.message);
    }
  }
  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(conf.imagesId, fileId);
    } catch (error) {
      console.log("appwrite :: delete file ::", error.message);
    }
  }
  getFilePreview(fileId) {
    try {
      return this.storage.getFilePreview(conf.imagesId, fileId);
    } catch (error) {
      console.log("appwrite :: get file preview ::", error.message);
    }
  }
}

export default new postServices();
