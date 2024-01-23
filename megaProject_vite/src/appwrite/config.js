import { Client, ID, Databases, Storage, Query } from "appwrite";
import { conf } from "./conf";

export class Service = {
 client = new Client();
 databases;
 storage;

 constructor(){
  this.client
  .setEndpoint(conf.appwriteUrl)
  .setProject(conf.appwriteProjectId);
  this.databases = new Databases(this.client)
  this.storage = new Storage(this.client)
 }

 async createPost({title, slug, content, fearturedImage, status, userId}){
  try {
   return await this.databases.createDocument(
    conf.appwriteDatabaseId,
    conf.appwriteCollectionId,
    slug,
    {
     title,
     content,
     fearturedImage,
     status,
     userId,
    }
   )
  } catch (error) {
   throw error
  }
 }

 async updatePost({slug, title, content, fearturedImage, status}){
  try {
   return await this.databases.updateDocument(
    conf.appwriteDatabaseId,
    conf.appwriteCollectionId,
    slug,
    {
     title,
     content,
     fearturedImage,
     status,
    }
   )
  } catch (error) {
   throw error
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
   throw error
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
   return true
  } catch (error) {
   throw error
   return false
  }
 }

 async getPosts( queries = [Query.equal("status", "active")] ){
  try {
   return await this.databases.listDocuments(
    conf.appwriteDatabaseId,
    conf.appwriteCollectionId,
    queries,
   )
  } catch (error) {
   throw error
   return false
  }
 }

 // File Upload Service
 
 async uploadFile(file){
  try {
   return await this.storage.createFile(
    conf.appwriteBucketId,
    ID.unique(),
    file,
   )
  } catch (error) {
   throw error
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
   throw error
   return false
  }
 }

 async getFilePreview(fileId){
  try {
   return this.storage.getFilePreview(
    conf.appwriteBucketId,
    fileId,
   )
  } catch (error) {
   throw error
   return false
  }
 }

}

export const appwriteService = new Service()
