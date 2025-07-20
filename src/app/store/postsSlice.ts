import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '@/app/lib/firebase';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

export type Post = {
  id: string;
  title: string;
  content: string;
  comments?: string[];
};

interface PostsState {
  items: Post[];
  loading: boolean;
}

const initialState: PostsState = {
  items: [],
  loading: false,
};

export const fetchPosts = createAsyncThunk('posts/fetch', async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Post, 'id'>),
  }));
});

export const createPost = createAsyncThunk(
  'posts/create',
  async (data: Omit<Post, 'id'>) => {
    console.log('Данные перед отправкой в Firestore', data);
    const docRef = await addDoc(collection(db, 'posts'), data);
    return { id: docRef.id, ...data };
  },
);

export const updatePost = createAsyncThunk(
  'posts/update',
  async ({ id, data }: { id: string; data: Partial<Omit<Post, 'id'>> }) => {
    const ref = doc(db, 'posts', id);
    await updateDoc(ref, data);
    return { id, data };
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        const index = state.items.findIndex(p => p.id === id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...data };
        }
      });
  },
});

export default postsSlice.reducer;
