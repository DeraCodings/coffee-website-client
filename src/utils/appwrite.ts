import { Account, Client, Databases, Functions, Storage, OAuthProvider } from "appwrite";
import {
  Client as ServerClient,
  Databases as ServerDatabases,
  Storage as ServerStorage,
} from "node-appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);

export { OAuthProvider };

const serverClient = new ServerClient()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
  .setKey(process.env.APPWRITE_API_KEY as string);

export const serverDatabases = new ServerDatabases(serverClient);
export const serverStorage = new ServerStorage(serverClient);
