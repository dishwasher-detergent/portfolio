type ServerTypes = {
  endpoint: string;
  project: string;
  collectionID: string;
  databaseID: string;
  bucketID: string;
};

export const Server: ServerTypes = {
  endpoint: process.env.NEXT_PUBLIC_APP_ENDPOINT
    ? process.env.NEXT_PUBLIC_APP_ENDPOINT
    : "",
  project: process.env.NEXT_PUBLIC_APP_PROJECT
    ? process.env.NEXT_PUBLIC_APP_PROJECT
    : "",
  collectionID: process.env.NEXT_PUBLIC_APP_COLLECTION_ID
    ? process.env.NEXT_PUBLIC_APP_COLLECTION_ID
    : "",
  databaseID: process.env.NEXT_PUBLIC_APP_DATABASE_ID
    ? process.env.NEXT_PUBLIC_APP_DATABASE_ID
    : "",
  bucketID: process.env.NEXT_PUBLIC_APP_BUCKET_ID
    ? process.env.NEXT_PUBLIC_APP_BUCKET_ID
    : "",
};
