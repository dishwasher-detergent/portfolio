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

    api.sdk = { database, account, storage };

    return { database, account, storage };
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
      .database.updateDocument(collectionId, documentId, data);
  },

  deleteDocument: (collectionId, documentId) => {
    return api.provider().database.deleteDocument(collectionId, documentId);
  },

  createFile: (file) => {
    return api
      .provider()
      .storage.createFile(Server.bucketID, ID.unique(), file);
  },

  deleteFile: (fileID) => {
    return api.provider().storage.deleteFile(Server.bucketID, fileID);
  },
};

export default api;
