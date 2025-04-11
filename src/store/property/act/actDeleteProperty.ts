import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";
import { axiosErrorHandler } from "../../../utils";

type TData = {
  idProperty: string;
  tokenUser: string;
};

export const deleteProperty = createAsyncThunk(
  "properties/deleteProperty",
  async (data: TData, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await axiosConfig.delete(
        `api/Properties/${data.idProperty}`,
        {
          headers: {
            Authorization: `Bearer ${data.tokenUser}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error("deleteProperty  Error:", axiosErrorHandler(error));
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
