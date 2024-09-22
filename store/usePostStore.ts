import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import { PostProps } from "@/types/post";
import { create } from "zustand";

interface PostStore {
  posts: PostProps[] | []
  latestPosts: PostProps[] | []
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  fetchAllPosts: () => Promise<void>,
  fetchTrendingPosts: () => Promise<void>
}

const fetchPosts = async(
  fetchFunction: () => Promise<PostProps[]>,
  setter: (posts: PostProps[] | []) => void,
  setIsLoading: (loading: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await fetchFunction();
    setter(response);
  } catch (error) {
    console.log("Error fetching posts", error);
    setter([])
  } finally {
    setIsLoading(false);
  }
}

export const usePostStore = create<PostStore>(
  (set) => ({
    posts: [],
    latestPosts: [],
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading }),
    fetchAllPosts: () => fetchPosts(
      getAllPosts,
      (posts) => set({ posts }), 
      (isLoading) => set({ isLoading })
    ),
    fetchTrendingPosts: () => fetchPosts(
      getLatestPosts,
      (latestPosts) => set({ latestPosts }),
      (isLoading) => set({ isLoading })
    )
  })
)