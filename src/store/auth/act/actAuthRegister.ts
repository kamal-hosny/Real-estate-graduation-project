import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "../../../utils";

import { axiosConfig } from "../../../services/axiosConfig";

type TRegisterData = {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  image: string;
};

const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (RegisterData: TRegisterData, thunk) => {
    const { rejectWithValue } = thunk;

    try {
      const res = await axiosConfig.post("/api/users", RegisterData);
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
export default actAuthRegister;
