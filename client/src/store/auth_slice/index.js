import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated : false,
    isLoading: true,
    user: null,
}

export const registerUser = createAsyncThunk('/auth/register',
    async(formData, {rejectWithValue}) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', formData,
            {
                withCredentials : true
            });

        return response.data;
    }catch (error) {
        // Error တစ်ခုခုတက်ရင် Console မှာ ကြည့်လို့ရအောင် ထုတ်ပြပါမယ်
        console.log("Axios Error Details:", error.response || error.message);
        return rejectWithValue(error.response?.data || "Something went wrong");
    }

}
)

export const loginUser = createAsyncThunk('/auth/login',
    async(formData, {rejectWithValue}) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData,
                {
                    withCredentials : true
                });

            return response.data;
        }catch (error) {
            console.log("Axios Error Details:", error.response || error.message);
            return rejectWithValue(error.response?.data || "Something went wrong");
        }

    }
)

export const logoutUser = createAsyncThunk('/auth/logout',
    async() => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/logout',{},
                {
                    withCredentials : true
                });

            return response.data;
        }catch (error) {
            console.log("Axios Error Details:", error.response || error.message);
        }

    }
)

export const checkAuth = createAsyncThunk('/auth/checkauth',
    async() => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/check-auth',
                {
                    withCredentials : true,
                    headers : {
                        'Cache-control' : 'no-store, no-cache, must-revalidate, proxy-revalidate',
//။ Headers တစ်ခုချင်းစီရဲ့ အဓိပ္ပာယ်
// no-store: ဒီအဖြေကို ဘယ်တော့မှ (Hard drive ထဲမှာ) မသိမ်းထားပါနဲ့။
//
// no-cache: အဖြေကို မသုံးခင် Backend ဆီမှာ အမြဲတမ်း ပြန်စစ်ပါ။
//
// must-revalidate / proxy-revalidate: အဖြေက ဟောင်းသွားပြီဆိုရင် (သို့မဟုတ်) နောက်တစ်ကြိမ် ခေါ်ရင် အသစ်ပြန်တောင်းကို တောင်းရမယ်လို့ အတင်းအကြပ် ခိုင်းစေတာပါ။
                    },
                })
            return response.data;
        }catch (error) {
            console.log("Axios Error Details:", error.response || error.message);
            return rejectWithValue(error.response?.data || "Something went wrong");
        }

    }
)


const authSlice = createSlice(
    {
        name : "auth",
        initialState,
        reducers : {
            setUser : (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true
            },
        },
        extraReducers : (builder) => {
            builder
                .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
                .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false
            })
                .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false
            })

                .addCase(loginUser.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(loginUser.fulfilled, (state, action) => {
                    console.log(action)
                    state.isLoading = false;
                    state.user = action.payload.success ?  action.payload.user : null;
                    state.isAuthenticated = action.payload.success ;
                })
                .addCase(loginUser.rejected, (state, action) => {
                    state.isLoading = false;
                    state.user = null;
                    state.isAuthenticated = false
                })


                .addCase(checkAuth.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(checkAuth.fulfilled, (state, action) => {

                    state.isLoading = false;
                    state.user = action.payload.success ?  action.payload.user : null;
                    state.isAuthenticated = action.payload.success ;
                })
                .addCase(checkAuth.rejected, (state, action) => {
                    state.isLoading = false;
                    state.user = null;
                    state.isAuthenticated = false
                })
                .addCase(logoutUser.fulfilled, (state, action) => {

                    state.isLoading = false;
                    state.user =  null;
                    state.isAuthenticated = false;
                })


        }
    }
)

export const {setUser} = authSlice.actions;
export default authSlice.reducer;