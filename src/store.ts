import { create } from 'zustand';
import { Post, Comment } from './types';
import { fetchPosts, fetchComments, updateComment } from './services/api';

interface AppState {
  posts: Post[];
  comments: Comment[];
  selectedPostId: number | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  getPosts: () => Promise<void>;
  getComments: (postId: number) => Promise<void>;
  setSelectedPost: (postId: number) => void;
  updateCommentBody: (commentId: number, body: string) => Promise<Comment>;
}

export const useStore = create<AppState>((set, get) => ({
  posts: [],
  comments: [],
  selectedPostId: null,
  loading: false,
  error: null,
  
  getPosts: async () => {
    set({ loading: true, error: null });
    try {
      const posts = await fetchPosts();
      set({ posts, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch posts', loading: false });
    }
  },
  
  getComments: async (postId: number) => {
    set({ loading: true, error: null, selectedPostId: postId });
    try {
      const comments = await fetchComments(postId);
      set({ comments, loading: false });
    } catch (error) {
      set({ error: `Failed to fetch comments for post ${postId}`, loading: false });
    }
  },
  
  setSelectedPost: (postId: number) => {
    set({ selectedPostId: postId });
  },
  
  updateCommentBody: async (commentId: number, body: string) => {
    set({ loading: true, error: null });
    try {
      const updatedComment = await updateComment(commentId, body);
      const comments = get().comments.map(comment => 
        comment.id === commentId ? { ...comment, body } : comment
      );
      set({ comments, loading: false });
      return updatedComment;
    } catch (error) {
      set({ error: `Failed to update comment ${commentId}`, loading: false });
      throw error;
    }
  },
})); 