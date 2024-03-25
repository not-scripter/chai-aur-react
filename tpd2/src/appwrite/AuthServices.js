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
      throw error;
    }
  }

  async updateName({ username }) {
    try {
      return await this.account.updateName(username);
    } catch (error) {
      throw error;
    }
  }
  async updatePhone({ phone, password }) {
    try {
      return await this.account.updatePhone(phone, password);
    } catch (error) {
      throw error;
    }
  }
  async updateEmail({ email, password }) {
    try {
      return await this.account.updateEmail(email, password);
    } catch (error) {
      throw error;
    }
  }
  async updatePassword({ newPassword, password }) {
    try {
      return await this.account.updatePassword(newPassword, password);
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
