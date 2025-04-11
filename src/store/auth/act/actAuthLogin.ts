import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "../../../utils";
import { axiosConfig } from "../../../services/axiosConfig";
type TLoginData = {
  email: string;
  password: string;
};

type TResponse = {
  token: string;
  user: {
    id: string,
    name: string,
    email: string,
    phone: string,
    image: string,
    createdAt: string,
    roles: {
      "$values": string[]
    }
  }
};
const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (loginData: TLoginData, thunk) => {
    const { rejectWithValue } = thunk;
    console.log("Login Data:", loginData);

    try {
      const res = await axiosConfig.post<TResponse>("/api/auth/login", loginData, {
        headers: {
          "Content-Type": "application/json"
        },
      });
      return res.data;
    } catch (error) {
      console.error("Login Error:", axiosErrorHandler(error));
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);


export default actAuthLogin;