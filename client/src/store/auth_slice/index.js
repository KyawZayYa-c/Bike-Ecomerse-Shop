import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
};

// Accessing the environment variable
const BASE_URL = import.meta.env.VITE_API_URL;

export const registerUser = createAsyncThunk(
    '/auth/register',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/register`, formData, {
                withCredentials: true,
            });

            return response.data;
        } catch (error) {
            console.log("Axios Error Details:", error.response || error.message);
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

export const loginUser = createAsyncThunk(
    '/auth/login',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, formData, {
                withCredentials: true,
            });

            return response.data;
        } catch (error) {
            console.log("Axios Error Details:", error.response || error.message);
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

export const logoutUser = createAsyncThunk(
    '/auth/logout',
    async () => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/logout`, {}, {
                withCredentials: true,
            });

            return response.data;
        } catch (error) {
            console.log("Axios Error Details:", error.response || error.message);
        }
    }
);

export const checkAuth = createAsyncThunk(
    '/auth/checkauth',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/auth/check-auth`, {
                withCredentials: true,
                headers: {
                    'Cache-control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                },
            });
            return response.data;
        } catch (error) {
            console.log("Axios Error Details:", error.response || error.message);
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;