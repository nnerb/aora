import { Models } from "react-native-appwrite";

export interface PostProps extends Models.Document {
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  users: {
    username: string;
    email: string;
    avatar: string;
    accountId: string;
    $id: string;
  };
  $databaseId: string;
  $collectionId: string;
}