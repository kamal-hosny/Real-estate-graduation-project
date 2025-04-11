import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";
import { axiosErrorHandler } from "../../../utils";
import { RealProperty } from "../../../types";

type TData = {
  tokenUser: string;
  property: RealProperty;
};

export const createProperty = createAsyncThunk(
  "properties/createProperty",
  async (data: TData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosConfig.post(
        `api/Properties`,
        data.property, 
        { 
          headers: {
            Authorization: `Bearer ${data.tokenUser}`,
          },
        }
      );

      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error("CreateProperty Error:", axiosErrorHandler(error));
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);