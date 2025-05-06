import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";
import { axiosErrorHandler } from "../../../utils";

type TUserData = {
  id: string;
  token: string;
};

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (data: TUserData, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await axiosConfig.delete(`/api/users/${data.id}`, {
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
