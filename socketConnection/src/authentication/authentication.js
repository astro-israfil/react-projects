import { Client, ID, Account } from "appwrite";
import conf from "../conf/conf";

class Authentication {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteEndpoint)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ fullName, email, password }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                fullName
            );

            if (userAccount) {
                return await this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log("Authentication :: createAccount :: error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Authentication :: getCurrentUser :: error", error);
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password,
            );
        } catch (error) {
            console.log("Authentication :: login :: error", error);
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            return true;
        } catch (error) {
            console.log("Authentication :: logout :: error", error);
            return false;
        }
    }
}

const authentication = new Authentication();

export default authentication;