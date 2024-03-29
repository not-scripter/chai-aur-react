import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";

export class authServices {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(conf.endpoint).setProject(conf.projectId);
    this.account = new Account(this.client);
  }

  async createAccount({ username, email, password }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        username,
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("appwrite :: create account ::", error.message);
    }
  }

  async updateName(username) {
    try {
      return await this.account.updateName(username);
    } catch (error) {
      console.log("appwrite :: update name ::", error.message);
    }
  }
  async updatePhone({ phone, password }) {
    try {
      return await this.account.updatePhone(phone, password);
    } catch (error) {
      console.log("appwrite :: update phone ::", error.message);
    }
  }
  async updateEmail({ email, password }) {
    try {
      return await this.account.updateEmail(email, password);
    } catch (error) {
      console.log("appwrite :: update email ::", error.message);
    }
  }
  async updatePassword({ newPassword, password }) {
    try {
      return await this.account.updatePassword(newPassword, password);
    } catch (error) {
      console.log("appwrite :: update password ::", error.message);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("appwrite :: login ::", error.message);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("appwrite :: get current user ::", error.message);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("appwrite :: logout ::", error.message);
    }
  }
}

export default new authServices();
