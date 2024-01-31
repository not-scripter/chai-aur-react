import { Client, ID, Databases, Storage, Query } from "appwrite";
import { conf } from "../conf/conf.js";

export class Service {
 client = new Client();
 databases;
 storage;

 constructor(){
  this.client
  .setEndpoint(conf.appwriteUrl)
  .setProject(conf.appwriteProjectId)
  this.databases = new Databases(this.client);
  this.storage = new Storage(this.client);
 };

 async createPost({title, slug, content, featuredImage, status, userId}) {
  try {
   return await this.databases.createDocument(
    conf.appwriteDatabaseId,
    conf.appwriteCollectionId,
    slug,
    {
     Title: title,
     Content: content,
     Status: status,
     UserId: userId,
     featuredImage: featuredImage,
    }
   )
  } catch (error) {
   console.log("Appwrite service :: createPost :: error", error);
  }
 };

 async updatePost({slug, title, content, featuredImage, status}){
  try {
   return await this.databases.updateDocument(
    conf.appwriteDatabaseId,
    conf.appwriteCollectionId,
    slug,
    {
     title,
     content,
     featuredImage,
     status,
    }
   )
  } catch (error) {
   console.log("Appwrite serive :: updatePost :: error", error);
  }
 }

 async deletePost(slug){
  try {   
   await this.databases.deleteDocument(
    conf.appwriteDatabaseId,
    conf.appwriteCollectionId,
    slug,
   )
   return true
  } catch (error) {
   console.log("Appwrite serive :: deletePost :: error", error);
   return false
  }
 }

 async getPost(slug){
  try {   
   return await this.databases.getDocument(
    conf.appwriteDatabaseId,
    conf.appwriteCollectionId,
    slug,
   )
  } catch (error) {
   console.log("Appwrite serive :: getPost :: error", error);
   return false
  }
 }

 async getPosts( queries = [Query.equal("Status", "active")] ){
  try {
   return await this.databases.listDocuments(
    conf.appwriteDatabaseId,
    conf.appwriteCollectionId,
    queries,
   )
  } catch (error) {
   console.log("Appwrite serive :: getPosts :: error", error);
   return false
  }
 }

 // File Upload Service
 
 async uploadFile({fileId, file}){
  try {
   return await this.storage.createFile(
    conf.appwriteBucketId,
    // ID.unique(),
    fileId,
    file,
   )
  } catch (error) {
   console.log("Appwrite serive :: uploadFile :: error", error);
   return false
  }
 }

 async deleteFile(fileId){
  try {
   await this.storage.deleteFile(
    conf.appwriteBucketId,
    fileId,
   )
   return true
  } catch (error) {
   console.log("Appwrite serive :: deleteFile :: error", error);
   return false
  }
 }

 getFilePreview(fileId){
  try {
   return this.storage.getFilePreview(
    conf.appwriteBucketId,
    fileId,
   )
  } catch (error) {
   console.log("Appwrite serive :: getFilePreview :: error", error);
   return false
  }
 }

}

export const appwriteService = new Service()
