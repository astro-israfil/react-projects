import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
}

const postsSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        addPosts: (state, action) => {
            state.posts = [...action.payload.posts];
        },
        addPost: (state, action) => {
            state.posts.push(action.payload.post);
        }
    }
});

export const {addPosts, addPost} = postsSlice.actions;

export default postsSlice.reducer;