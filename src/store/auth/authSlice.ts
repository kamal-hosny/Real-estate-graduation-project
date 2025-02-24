import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "../../types/TLoading";
import actAuthLogin from "./act/actAuthLogin";
import { isString } from "../../types";
import actAuthRegister from "./act/actAuthRegister";

interface IAuthState {
    test: {
    _id: string;
    contactName: string;
    lastName: string;
    companyName: string;
    Email: string;
    phoneNumber: string;
    country: string;
  } | null;
  token: string | null;
  message: string | null;
  loading: TLoading;
  error: string | null;
  isVerified: boolean | null
}

const initialState: IAuthState = {
    test: null,
    token: null,
    message: null,
    loading: "idle",
    error: null,
    isVerified: null,
};


const authSlice = createSlice({
    name: "auth",
    initialState, 
    reducers: {
        resetUI: (state) => {
            state.loading = "idle";
            state.error = null;
        },
        authLogout: (state) => {
            state.test = null;
            state.token = null;
            state.message = null
        },
    },
    extraReducers: (builder) => {
        //register
        builder.addCase(actAuthRegister.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        })
        
        builder.addCase(actAuthRegister.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.message = action.payload.message
        })
        builder.addCase(actAuthRegister.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload
            }
        })

        //login
        builder.addCase(actAuthLogin.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        })
        builder.addCase(actAuthLogin.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.token = action.payload.token
            state.test = action.payload.test
            state.message = action.payload.message
        })
        builder.addCase(actAuthLogin.rejected, (state, action) => {
            state.loading = "failed";
            if(isString(action.payload)) {
                state.error = action.payload;
            }
        })


    }
})

export { actAuthLogin, actAuthRegister}
export const { resetUI, authLogout } = authSlice.actions;
export default authSlice.reducer;