import { Client, Databases, Storage, Query, Permission, Role } from "appwrite";
import conf from "../conf/conf";
import {v1 as uuidv1} from "uuid"

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
        uuidv1(),
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
  async updatePost({ postId, content, images, visibility, replies, likes, dislikes, saves, shares }) {
    try {
      return await this.databases.updateDocument(
        conf.databaseId,
        conf.postsId,
        postId,
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
  async getUsersPosts(userId) {
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
  async createReply({ userId, content, images, replyTo, replyToId, replyToType, visibility, tags }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.repliesId,
        uuidv1(),
        {
          userId,
          content,
          images,
          replyTo,
          replyToId,
          replyToType,
          visibility,
          tags,
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
  async updateReply({ replyId, content, images, replies, likes, dislikes, saves, shares, tags }) {
    try {
      return await this.databases.updateDocument(
        conf.databaseId,
        conf.repliesId,
        replyId,
        {
          content,
          images,
          likes,
          dislikes,
          replies,
          saves,
          shares,
          tags,
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
  async deleteReplies(replyToId) {
    try {
      return await this.databases.deleteDocument(
        conf.databaseId,
        conf.repliesId,
        [ Query.equal("replyToId", replyToId) ]
      );
    } catch (error) {
      console.log("appwrite :: delete replies ::", error.message);
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
  async getUsersReplies(userId) {
    try {
      return await this.databases.listDocuments(
        conf.databaseId,
        conf.repliesId,
        [
          Query.equal("userId", userId),
          Query.equal("visibility", "public"),
        ]
      );
    } catch (error) {
      console.log("appwrite :: get public posts ::", error.message);
    }
  }

  // Storage Services
  // Profile Avatar
  async uploadAvatar(file) {
    try {
      return await this.storage.createFile(conf.avatarsId, uuidv1(), file);
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
      return await this.storage.createFile(conf.bannersId, uuidv1(), file);
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
      return await this.storage.createFile(conf.imagesId, uuidv1(), file);
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
  async createDoc({ docType, userId, replyTo, replyToId, content, images, visibility }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        docType === "post" ? conf.postsId : "reply" ? conf.repliesId : null,
        uuidv1(),
        {
          userId,
          replyTo,
          replyToId,
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
      console.log("appwrite :: create doc ::", error.message);
    }
  }
  async updateDoc({ docType, docId, likes, dislikes, saves, shares, replies }) {
    try {
      return await this.databases.updateDocument(
        conf.databaseId,
        docType === "post" ? conf.postsId : "reply" ? conf.repliesId : null,
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
  async getDoc({docType, docId}) {
    try {
      return await this.databases.getDocument(
        conf.databaseId,
        docType === "post" ? conf.postsId : "reply" ? conf.repliesId : null,
        docId,
      );
    } catch (error) {
      console.log("appwrite :: get doc ::", error.message);
    }
  }
  async deleteDoc({docType, docId}) {
    console.log(docType, docId)
    try {
      return await this.databases.deleteDocument(
        conf.databaseId,
        docType === "post" ? conf.postsId : "reply" ? conf.repliesId : null,
        docId,
      );
    } catch (error) {
      console.log("appwrite :: delete doc ::", error.message);
    }
  }
  async updateProfileDocs({
    docType,
    userId,
    docs,
  }) {
    try {
      const docsType = docType === "post" ? "posts" : "reply" ? "replies" : "save" ? "saves" : null;
      return await this.databases.updateDocument(
        conf.databaseId,
        conf.profilesId,
        userId,
        {
          [docsType]: docs,
        },
      );
    } catch (error) {
      console.log("appwrite :: update profile docs ::", error.message);
    }
  }
}

export default new postServices();
