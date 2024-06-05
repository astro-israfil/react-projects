import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import authReducer from "../features/authSlice";
import postsReducer from "../features/postsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        appState: themeReducer,
        posts: postsReducer,
    }
})