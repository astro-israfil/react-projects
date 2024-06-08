import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    editPost: null,
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
        },
        setEditPost: (state, action) => {
            state.editPost = action.payload.post;
        },

        clearEditPost: (state) => {
            state.editPost = null;
        },

        updatePosts: (state, action) => {
            state.posts = state.posts.map((post) => {
                if (post.$id === action.payload.editedPost.$id) {
                    // console.log(action.payload.editedPost)
                    return action.payload.editedPost;
                } else {
                    return post;
                }
            });
        },

        deletePost: (state, action) => {
            state.posts = state.posts.filter((post) => {
                return post.$id !== action.payload.postId;
            })
        }
    }
});

export const {addPosts, addPost, deletePost, setEditPost, clearEditPost, updatePosts} = postsSlice.actions;

export default postsSlice.reducer;