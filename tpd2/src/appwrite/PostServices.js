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

  async createPost({ slug, userId, title, content, images, status }) {
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
          status,
        },
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost({ slug, title, content, image, status }) {
    try {
      return await this.databases.updateDocument(
        conf.databaseId,
        conf.postsId,
        slug,
        {
          title,
          content,
          image,
          status,
        },
      );
    } catch (error) {
      throw error;
    }
  }
  async deletePost({ slug }) {
    try {
      return await this.databases.deleteDocument(
        conf.databaseId,
        conf.postsId,
        slug,
      );
    } catch (error) {
      throw error;
    }
  }
  async getPost({ slug }) {
    try {
      return await this.databases.deleteDocument(
        conf.databaseId,
        conf.postsId,
        slug,
      );
    } catch (error) {
      throw error;
    }
  }
  async getPosts({ queries = [Query.equal("status", "public")] }) {
    try {
      return await this.databases.listDocuments(
        conf.databaseId,
        conf.postsId,
        queries
      );
    } catch (error) {
      throw error;
    }
  }
  // Storage Services
  async uploadFile({ file }) {
    try {
      return await this.storage.createFile(
        conf.imagesId,
        ID.unique(),
        file
      );
    } catch (error) {
      throw error;
    }
  }
  async deleteFile({fileId}) {
    try {
      return await this.storage.deleteFile(
        conf.imagesId,
        fileId,
      );
    } catch (error) {
      throw error;
    }
  }
  getFilePreview({fileId}) {
    try {
      return this.storage.getFilePreview(
        conf.imagesId,
        fileId,
      );
    } catch (error) {
      throw error;
    }
  }
}

export default new postServices();
