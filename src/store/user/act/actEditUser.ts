import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";
import { axiosErrorHandler } from "../../../utils";

type TUserData = {
  id: string | null;
  fullName: string | null;
  email: string | null;
  password: string | null | undefined;
  phoneNumber: string | null;
  image: string | null | undefined;
  token: string | null;
};

export const editUser = createAsyncThunk(
  "users/editUser",
  async (data: TUserData, thunk) => {
    const { rejectWithValue } = thunk;

    try {
      const res = await axiosConfig.get(`/api/users/${data.id}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Login Error:", axiosErrorHandler(error));
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
