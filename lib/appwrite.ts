import { PostProps } from '@/types/post';
import { UserProps } from '@/types/user';
import { Account, Avatars, Client, Databases, ID, Models, Query } from 'react-native-appwrite';


export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.brenn.aora',
  projectId: '66ec57a10038e2e19a2a',
  databaseId: '66ec58e8000ad02c09f4',
  userCollectionId: '66ec59040039d04cd94c',
  videoCollectionId: '66ec591c0003ede40978',
  storageId: '66ec5ab50036ffaa2d32'
}

const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform)
  ;

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

export const createUser = async (email: string, password: string, username: string) => {

  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    )

    if (!newAccount) throw Error

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
      }
    )

    return newUser

  } catch (error) {
    console.log('[SIGN_UP_USER]', error)
    throw new Error('[SIGN_UP_USER]', { cause: error })
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password)
    return session
  } catch (error) {
    console.log('[SIGN_IN_USER]', error)
    throw new Error('[SIGN_IN_USER]', { cause: error })
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error('No active session found.');

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if (!currentUser) throw Error('User document not found in the database');
    return currentUser.documents[0] as UserProps

  } catch (error) {
    console.log('[GET_CURRENT_USER]', error)
    throw new Error('[GET_CURRENT_USER]', { cause: error })
  }
}

export const getAllPosts = async () => {
  try {
    const { databaseId, videoCollectionId } = config
    
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId
    )
    // console.log('Post', JSON.stringify(posts.documents, null, 2))
    return posts.documents as PostProps[]

  } catch (error) {
    console.log('[GET_ALL_POST]', error)
    throw new Error('[GET_ALL_POST]', { cause: error })
  }
}

export const getLatestPosts = async () => {
  try {
    const { databaseId, videoCollectionId } = config
    
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [
        Query.orderDesc('$createdAt'), 
        Query.limit(7)
      ]
    )

    console.log('Latest Posts', JSON.stringify(posts.documents, null, 2))
    return posts.documents as PostProps[]

  } catch (error) {
    console.log('[GET_LATEST_POST]', error)
    throw new Error('[GET_LATEST_POST]', { cause: error })
  }
}

