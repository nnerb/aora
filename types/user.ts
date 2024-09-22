import { Models } from "react-native-appwrite";
export interface UserProps extends Models.Document {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $updatedAt: string;
  accountId: string;
  avatar: string;
  email: string;
  username: string;
}
