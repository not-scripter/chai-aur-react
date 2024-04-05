import { Client, ID, Databases, Storage, Query, Permission, Role } from "appwrite";
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
          joined,
        },
        [
          Permission.read(Role.users()),
          Permission.update(Role.users()),
        ]
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
    posts,
    replies,
    saves,
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
          posts,
          replies,
          saves,
          joined,
        },
      );
    } catch (error) {
      console.log("appwrite :: update profile ::", error.message);
    }
  }
  async deleteProfile(userId) {
    try {
      return await this.databases.deleteDocument(
        conf.databaseId,
        conf.profilesId,
        userId,
      );
    } catch (error) {
      console.log("appwrite :: delete profile ::", error.message);
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
  async createPost({ userId, content, images, visibility }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.postsId,
        ID.unique(),
        {
          userId,
          content,
          images,
          visibility,
        },
        [
          Permission.read(Role.users()),
          Permission.update(Role.users()),
        ]
      );
    } catch (error) {
      console.log("appwrite :: create post ::", error.message);
    }
  }
  async updatePost({ docId, content, images, visibility, replies, likes, dislikes, saves, shares }) {
    try {
      return await this.databases.updateDocument(
        conf.databaseId,
        conf.postsId,
        docId,
        {
          content,
          images,
          visibility,
          likes,
          dislikes,
          replies,
          saves,
          shares,
        },
      );
    } catch (error) {
      console.log("appwrite :: update post ::", error.message);
    }
  }
  async deletePost(postId) {
    try {
      return await this.databases.deleteDocument(
        conf.databaseId,
        conf.postsId,
        postId,
      );
    } catch (error) {
      console.log("appwrite :: delete post ::", error.message);
    }
  }
  async getPost(postId) {
    try {
      return await this.databases.getDocument(
        conf.databaseId,
        conf.postsId,
        postId,
      );
    } catch (error) {
      console.log("appwrite :: get post ::", error.message);
    }
  }
  async getPosts() {
    try {
      return await this.databases.listDocuments(
        conf.databaseId,
        conf.postsId,
        [ Query.equal("visibility", "public") ]
      );
    } catch (error) {
      console.log("appwrite :: get posts ::", error.message);
    }
  }

  async getMyPosts(userId) {
    try {
      return await this.databases.listDocuments(
        conf.databaseId,
        conf.postsId,
        [ Query.equal("userId", userId) ]
      );
    } catch (error) {
      console.log("appwrite :: get my posts ::", error.message);
    }
  }
  async getPublicPosts(userId) {
    try {
      return await this.databases.listDocuments(
        conf.databaseId,
        conf.postsId,
        [
          Query.equal("userId", userId),
          Query.equal("visibility", "public"),
        ]
      );
    } catch (error) {
      console.log("appwrite :: get public posts ::", error.message);
    }
  }

  //Replies Services
  async createReply({ userId, content, images, replyTo, replyToId }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.repliesId,
        ID.unique(),
        {
          userId,
          content,
          images,
          replyTo,
          replyToId,
        },
        [
          Permission.read(Role.users()),
          Permission.update(Role.users()),
        ]
      );
    } catch (error) {
      console.log("appwrite :: create reply ::", error.message);
    }
  }
  async updateReply({ docId, content, images, replies, replyTo, replyToId, likes, dislikes, saves, shares }) {
    try {
      return await this.databases.updateDocument(
        conf.databaseId,
        conf.repliesId,
        docId,
        {
          content,
          images,
          replyTo,
          replyToId,
          likes,
          dislikes,
          replies,
          saves,
          shares,
        },
      );
    } catch (error) {
      console.log("appwrite :: update reply ::", error.message);
    }
  }
  async deleteReply(replyId) {
    try {
      return await this.databases.deleteDocument(
        conf.databaseId,
        conf.repliesId,
        replyId,
      );
    } catch (error) {
      console.log("appwrite :: delete reply ::", error.message);
    }
  }
  async getReply(replyId) {
    try {
      return await this.databases.getDocument(
        conf.databaseId,
        conf.repliesId,
        replyId,
      );
    } catch (error) {
      console.log("appwrite :: get reply ::", error.message);
    }
  }
  async getReplies(replyToId) {
    try {
      return await this.databases.listDocuments(
        conf.databaseId,
        conf.repliesId,
        [ Query.equal("replyToId", replyToId) ]
      );
    } catch (error) {
      console.log("appwrite :: get replies ::", error.message);
    }
  }

  async getMyReplies(userId) {
    try {
      return await this.databases.listDocuments(
        conf.databaseId,
        conf.repliesId,
        [ Query.equal("userId", userId) ]
      );
    } catch (error) {
      console.log("appwrite :: get my replies ::", error.message);
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
  //Tests
  async updateDoc({ type, docId, likes, dislikes, saves, shares, replies }) {
    try {
      return await this.databases.updateDocument(
        conf.databaseId,
        type === "post" ? conf.postsId : conf.repliesId,
        docId,
        {
          likes,
          dislikes,
          replies,
          saves,
          shares,
        },
      );
    } catch (error) {
      console.log("appwrite :: update doc ::", error.message);
    }
  }
}

export default new postServices();
