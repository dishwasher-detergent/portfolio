import { Client as Appwrite, Databases, Account, Storage, ID } from "appwrite";
import { Server } from "../utils/config";

let api = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    let appwrite = new Appwrite();
    appwrite.setEndpoint(Server.endpoint).setProject(Server.project);
    const account = new Account(appwrite);
    const database = new Databases(appwrite);
    const storage = new Storage(appwrite);

    api.sdk = { database, account, storage, appwrite };

    return { database, account, storage, appwrite };
  },

  createAccount: (email, password, name) => {
    return api.provider().account.create("unique()", email, password, name);
  },

  getAccount: () => {
    return api.provider().account.get();
  },

  createSession: (email, password) => {
    return api.provider().account.createEmailSession(email, password);
  },

  getSession: () => {
    return api.provider().account.getSession("current");
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession("current");
  },

  createDocument: (collectionId, data) => {
    return api
      .provider()
      .database.createDocument(
        Server.databaseID,
        collectionId,
        ID.unique(),
        data
      );
  },

  listDocuments: (collectionId) => {
    return api
      .provider()
      .database.listDocuments(Server.databaseID, collectionId);
  },

  updateDocument: (collectionId, documentId, data) => {
    return api
      .provider()
      .database.updateDocument(
        Server.databaseID,
        collectionId,
        documentId,
        data
      );
  },

  deleteDocument: (collectionId, documentId) => {
    return api
      .provider()
      .database.deleteDocument(Server.databaseID, collectionId, documentId);
  },

  createFile: (file) => {
    return api
      .provider()
      .storage.createFile(Server.bucketID, ID.unique(), file);
  },

  getFile: (fileId) => {
    return api.provider().storage.getFile(Server.bucketID, fileId);
  },

  getFilePreview: (
    fileId,
    height = null,
    width = null,
    quality = null,
    gravity = null
  ) => {
    return api.provider().storage.getFilePreview(Server.bucketID, fileId);
  },

  deleteFile: (fileID) => {
    return api.provider().storage.deleteFile(Server.bucketID, fileID);
  },

  checkSessionStatus: async () => {
    try {
      return await api.getSession();
    } catch (error) {
      return null;
    }
  },
};

export default api;
