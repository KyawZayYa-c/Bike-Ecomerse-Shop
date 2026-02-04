import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    approvalURL: null,
    isLoading: false,
    orderId: null,
    orderList: [],
    orderDetails: null,
};

// Accessing the environment variable from .env
const BASE_URL = import.meta.env.VITE_API_URL;

export const createNewOrder = createAsyncThunk(
    "/order/createNewOrder",
    async (orderData) => {
        const response = await axios.post(
            `${BASE_URL}/shop/order/create`,
            orderData
        );
        return response.data;
    }
);

export const capturePayment = createAsyncThunk(
    "/order/capturePayment",
    async ({ paymentId, payerId, orderId }) => {
        const response = await axios.post(
            `${BASE_URL}/shop/order/capture`,
            { paymentId, payerId, orderId }
        );
        return response.data;
    }
);

export const getAllOrdersByUserId = createAsyncThunk(
    "/order/getAllOrdersByUserId",
    async (userId) => {
        const response = await axios.get(
            `${BASE_URL}/shop/order/list/${userId}`
        );
        return response.data;
    }
);

export const getOlderDetails = createAsyncThunk(
    "/order/getOlderDetails",
    async (id) => {
        const response = await axios.get(
            `${BASE_URL}/shop/order/details/${id}`
        );
        return response.data;
    }
);

const shoppingOrderSlice = createSlice({
    name: 'shoppingOrderSlice',
    initialState,
    reducers: {
        resetOrderDetails: (state) => {
            state.orderDetails = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNewOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNewOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.approvalURL = action.payload.approvalURL;
                state.orderId = action.payload.orderId;
                sessionStorage.setItem('currentOrderId', JSON.stringify(action.payload.orderId));
            })
            .addCase(createNewOrder.rejected, (state) => {
                state.isLoading = false;
                state.approvalURL = null;
                state.orderId = null;
            })
            .addCase(getAllOrdersByUserId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderList = action.payload.data;
            })
            .addCase(getAllOrdersByUserId.rejected, (state) => {
                state.isLoading = false;
                state.orderList = [];
            })
            .addCase(getOlderDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOlderDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderDetails = action.payload.data;
            })
            .addCase(getOlderDetails.rejected, (state) => {
                state.isLoading = false;
                state.orderDetails = null;
            });
    }
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;