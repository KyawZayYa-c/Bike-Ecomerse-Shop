import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    reviews: [], // Changed from 'review' to 'reviews' to match your extraReducers
};

// Accessing the environment variable from .env
const BASE_URL = import.meta.env.VITE_API_URL;

export const addReview = createAsyncThunk(
    "/review/addReview",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/shop/reviews/add`,
                formData
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

export const getReviews = createAsyncThunk(
    "/review/getReviews",
    async (id) => {
        const response = await axios.get(
            `${BASE_URL}/shop/reviews/${id}`
        );
        return response.data;
    }
);

const reviewSlice = createSlice({
    name: 'reviewSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getReviews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviews = action.payload.data;
            })
            .addCase(getReviews.rejected, (state) => {
                state.isLoading = false;
                state.reviews = [];
            });
    }
});

export default reviewSlice.reducer;