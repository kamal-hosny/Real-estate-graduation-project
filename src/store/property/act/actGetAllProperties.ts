import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";
import { axiosErrorHandler } from "../../../utils";

export const getAllProperties = createAsyncThunk(
  "properties/getAllProperties",
  async (_, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await axiosConfig.get(`/api/Properties`);
      return res.data;
    } catch (error) {
      console.error("getAllProperties:", axiosErrorHandler(error));
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
