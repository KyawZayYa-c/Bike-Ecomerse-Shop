import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading : false,
    review : [],
}
export const addReview = createAsyncThunk(
    "/review/addReview",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/shop/reviews/add`,
                formData
            );
            return response.data;
        } catch (error) {
            // Backend က ပို့လိုက်တဲ့ { success: false, message: "..." } ကို ယူတာပါ
            return rejectWithValue(error.response.data);
        }
    }
);

export const getReviews = createAsyncThunk(
    "/review/getReviews",
    async(id) => {
        const response = await axios.get(
            `http://localhost:5000/api/shop/reviews/${id}`
        );
        return response.data;
    }
)


const reviewSlice = createSlice({
    name : 'reviewSlice',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
            builder.addCase(getReviews.pending, (state ) => {
                state.isLoading = true;
            }).addCase(getReviews.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reviews = action.payload.data;
            }).addCase(getReviews.rejected, (state ) => {
                state.isLoading = false;
                state.reviews = [];
            })
    }
})

export default reviewSlice.reducer;