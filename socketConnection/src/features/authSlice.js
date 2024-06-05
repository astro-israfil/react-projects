import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authState: false,
    userData: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        localAuthLogin: (state, action) => {
            state.authState = true;
            state.userData = action.payload.userData
        },
        localAuthLogout: (state) => {
            state.authState = false;
            state.userData = null;
        }
    }
});

export const {localAuthLogin, localAuthLogout} = authSlice.actions;

export default authSlice.reducer;