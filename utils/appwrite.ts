import {
  Databases,
  Account,
  Storage,
  ID,
  Models,
  Client,
  Locale,
  Avatars,
} from "appwrite";
import { Server } from "../utils/config";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

type PreviewFileType = {
  project?: string;
  width?: string;
  height?: string;
  gravity?: string;
  quality?: string;
  borderWidth?: string;
  borderColor?: string;
  borderRadius?: string;
  opacity?: string;
  rotation?: string;
  background?: string;
  output?: string;
};

type SdkType = {
  database: Databases;
  account: Account;
  storage: Storage;
  client: Client;
  locale: Locale;
  avatar: Avatars;
};

type ApiType = {
  sdk: null | SdkType;
  provider: () => SdkType;
  createAccount: (
    email: string,
    password: string,
    name: string
  ) => Promise<Models.Account<Models.Preferences>>;
  getAccount: () => Promise<Models.Account<Models.Preferences>>;
  setSession: (hash: string | RequestCookie) => void;
  createSession: (email: string, password: string) => Promise<Models.Session>;
  getSession: () => Promise<Models.Session>;
  deleteCurrentSession: () => Promise<{}>;
  createDocument: (collectionId: string, data: any) => Promise<any>;
  listDocuments: (
    collectionId: string
  ) => Promise<Models.DocumentList<Models.Document>>;
  getDocument: (
    documentId: string,
    collectionId: string
  ) => Promise<Models.Document>;
  updateDocument: (
    collectionId: string,
    documentId: string,
    data: any
  ) => Promise<any>;
  deleteDocument: (collectionId: string, documentId: string) => Promise<{}>;
  createFile: (file: File) => Promise<Models.File>;
  getFile: (fileId: string) => Promise<Models.File>;
  getFilePreview: (fileId: string, option: PreviewFileType) => URL;
  deleteFile: (fileID: string) => Promise<{}>;
  checkSessionStatus: () => Promise<Models.Session | null>;
};

export const APPWRITE_PROJECT_ID: string = "63e17a1b54d5f6eec8ea";
export const APPWRITE_ENDPOINT: string = "https://data.kennethbass.com/v1";

// Used by SSR
export const APP_HOSTNAME: string = "kennethbass.com";
export const APPWRITE_HOSTNAME: string = "data.kennethbass.com"; // Must be subdomain of APP_HOSTNAME

const api: ApiType = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    const client = new Client()
      .setEndpoint(Server.endpoint)
      .setProject(Server.project);
    const account = new Account(client);
    const database = new Databases(client);
    const storage = new Storage(client);
    const locale = new Locale(client);
    const avatar = new Avatars(client);

    api.sdk = { database, account, storage, client, locale, avatar };

    return api.sdk;
  },

  createAccount: async (email, password, name) => {
    return await api
      .provider()
      .account.create("unique()", email, password, name);
  },

  getAccount: async () => {
    return await api.provider().account.get();
  },

  setSession: (hash) => {
    const authCookies: any = {};
    authCookies["a_session_" + Server.project] = hash;
    api.provider().client.headers["X-Fallback-Cookies"] =
      JSON.stringify(authCookies);
  },

  createSession: async (email, password) => {
    return await api.provider().account.createEmailSession(email, password);
  },

  getSession: async () => {
    return await api.provider().account.getSession("current");
  },

  deleteCurrentSession: async () => {
    return await api.provider().account.deleteSession("current");
  },

  createDocument: async (collectionId, data) => {
    return await api
      .provider()
      .database.createDocument(
        Server.databaseID,
        collectionId,
        ID.unique(),
        data
      );
  },

  listDocuments: async (collectionId) => {
    return await api
      .provider()
      .database.listDocuments(Server.databaseID, collectionId);
  },

  getDocument: async (documentId, collectionId) => {
    return await api
      .provider()
      .database.getDocument(Server.databaseID, collectionId, documentId);
  },

  updateDocument: async (collectionId, documentId, data) => {
    return await api
      .provider()
      .database.updateDocument(
        Server.databaseID,
        collectionId,
        documentId,
        data
      );
  },

  deleteDocument: async (collectionId, documentId) => {
    return await api
      .provider()
      .database.deleteDocument(Server.databaseID, collectionId, documentId);
  },

  createFile: async (file) => {
    return await api
      .provider()
      .storage.createFile(Server.bucketID, ID.unique(), file);
  },

  getFile: async (fileId) => {
    return await api.provider().storage.getFile(Server.bucketID, fileId);
  },

  getFilePreview: (fileId, option) => {
    const baseUrl =
      Server.endpoint +
      `/storage/buckets/${Server.bucketID}/files/${fileId}/preview`;

    const url = new URL(baseUrl);
    option.project = Server.project;
    url.search = new URLSearchParams(option).toString();

    return url;
  },

  deleteFile: async (fileID) => {
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
