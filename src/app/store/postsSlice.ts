import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "@/app/lib/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
  const querySnapshot = await getDocs(collection(db, "posts"));
  return querySnapshot.docs.map(doc => ({
  id: doc.id,
  ...(doc.data() as Omit<Post, 'id'>)
}));;
});

export const createPost = createAsyncThunk("posts/create", async (data: { title: string; content: string; excerpt: string;  }) => {
  const docRef = await addDoc(collection(db, "posts"), data);
  return { id: docRef.id, ...data };
});
type Post = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
};

interface PostsState {
  items: Post[];
  loading: boolean;
}

const initialState: PostsState = {
  items: [],
  loading: false
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  }
});

export default postsSlice.reducer;
