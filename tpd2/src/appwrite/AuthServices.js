import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";
// import sdk from "node-appwrite";

export class authServices {
  client = new Client();
  account;
  // users = new sdk.Users();

  constructor() {
    this.client.setEndpoint(conf.endpoint).setProject(conf.projectId);
    this.account = new Account(this.client);
  }

  async createAccount({ name, email, password }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getUser({ userId }) {
    try {
      return await this.account.get(userId);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

export default new authServices();
