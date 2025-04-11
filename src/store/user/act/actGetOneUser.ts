import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";
import { axiosErrorHandler } from "../../../utils";
import { TUser } from "../../../types";

type TUserData = {
    id: string;
};

type TResponse = TUser;

export const getOneUser = createAsyncThunk(
    "users/getOneUser",
    async ({ id }: TUserData, { rejectWithValue }) => {
        try {
            if (!id) {
                throw new Error("User ID is required");
            }
            const res = await axiosConfig.get<TResponse>(`/api/users/${id}`);
            return res.data;
        } catch (error) {
            console.error("Get One User Error:", axiosErrorHandler(error));
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);
