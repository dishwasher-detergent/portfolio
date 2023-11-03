import { ProjectType } from "@/types/types";
import { Client, Databases, Query } from "appwrite";

export const AW_ENDPOINT =
  process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
export const AW_PROJECT_ID = process.env.APPWRITE_PROJECT_ID as string;
export const AW_DATABASE_ID = process.env.APPWRITE_DATABASE_ID as string;
export const AW_PROJECT_COLLECTION_ID = "63e17a3b092917cea721";
export const AW_PROJECT_BUCKET_ID = "63e17bd7024f7fadf59d";

const client = new Client();
client.setEndpoint(AW_ENDPOINT).setProject(AW_PROJECT_ID);

const db = new Databases(client);

export const AppwriteService = {
  async listProjects() {
    return await db.listDocuments<ProjectType>(
      AW_DATABASE_ID,
      AW_PROJECT_COLLECTION_ID,
      [Query.orderAsc("order")]
    );
  },
};
