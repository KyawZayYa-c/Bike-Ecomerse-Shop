import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    featureImageList: []
};

// Accessing the environment variable
const BASE_URL = import.meta.env.VITE_API_URL;

export const getFeatureImages = createAsyncThunk(
    "/common/getFeatureImages",
    async () => {
        const response = await axios.get(
            `${BASE_URL}/common/feature/get`
        );
        return response.data;
    }
);

export const addFeatureImages = createAsyncThunk(
    "/common/addFeatureImages",
    async (image) => {
        const response = await axios.post(
            `${BASE_URL}/common/feature/add`,
            { image }
        );
        return response.data;
    }
);

const commonSlice = createSlice({
    name: 'commonSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFeatureImages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeatureImages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.featureImageList = action.payload.data;
                // Note: Ensure your API response actually returns orderId for this logic
                if (action.payload.orderId) {
                    sessionStorage.setItem('currentOrderId', JSON.stringify(action.payload.orderId));
                }
            })
            .addCase(getFeatureImages.rejected, (state) => {
                state.isLoading = false;
                state.featureImageList = [];
            });
    }
});

export default commonSlice.reducer;