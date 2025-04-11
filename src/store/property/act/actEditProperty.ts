import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";
import { axiosErrorHandler } from "../../../utils";
import { RealProperty } from "../../../types";

type TData = {
  tokenUser: string;
  property: RealProperty;
};

export const editProperty = createAsyncThunk(
  "properties/editProperty",
  async (data: TData, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await axiosConfig.post(
        `api/Properties/${data.property.userId}`,
        {
          headers: {
            Authorization: `Bearer ${data.tokenUser}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error("EditProperty Error:", axiosErrorHandler(error));
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
