import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";
import { axiosErrorHandler } from "../../../utils";

export const getOneProperty = createAsyncThunk(
  "properties/getOneProperty",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      if (!id) {
        throw new Error("User ID is property");
      }
      const res = await axiosConfig.get(`/api/Properties/${id}`);
      return res.data;
    } catch (error) {
      console.error("Get One Property Error:", axiosErrorHandler(error));
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
