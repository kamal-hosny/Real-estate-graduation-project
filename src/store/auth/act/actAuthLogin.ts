import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "../../../utils";

import { axiosConfig } from "../../../services/axiosConfig";

type TLoginData = {
    Email: string;
    password: string;
  };
  
  type TResponse = {
    message: string;
    test: {
      _id: string;
      contactName: string;
      lastName: string;
      companyName: string;
      Email: string;
      phoneNumber: string;
      country: string;
      isVerified: boolean;
    };
    token: string;
  };

  const actAuthLogin = createAsyncThunk(
    "auth/actAuthLogin",
    async (loginData:TLoginData, thunk ) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axiosConfig.post<TResponse>("/user/login", loginData)
            return res.data
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
  )

  export default actAuthLogin;