import { Client, Databases, ID, Storage } from "appwrite";
import conf from "../conf/conf";

class DatabaseService {
    client = new Client()
    database;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteEndpoint)
            .setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({image, userId, title, content}) {
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {title, content, image, userId}
            )
        } catch (error) {
            console.log("DatabaseService :: createPost :: error", error);
            throw error;
        }
    }

    async getPost(postId) {
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId
            );
        } catch (error) {
            console.log("DatabaseService :: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(postId, {image, userId, content, title}) {
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId,
                {image, content, title, userId}
            )
        } catch (error) {
            console.log("DatabaseService :: updatePost :: error", error);
            throw error;
        }
    }

    async deletePost(postId) {
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId,
            );
            return true;
        } catch (error) {
            console.log("DatabaseService :: deletePost :: error", error);
            throw error;
        }
    }

    async getPosts(queries = []) {
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("DatabaseService :: getPosts :: error", error);
            throw error;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("DatabaseService :: uploadFile :: error", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("DatabaseService :: deleteFile :: error", error);
            throw error;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    } 
}

const databaseService = new DatabaseService();
export default databaseService;