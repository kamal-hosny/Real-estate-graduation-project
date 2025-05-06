import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig"; 
import { axiosErrorHandler } from "../../../utils";

type TResponse = any[]

export const getAllUser = createAsyncThunk(
    "users/getAllUser",
    async(adminToken: string | null, thunk) =>{
        const { rejectWithValue } = thunk;
        try{
            const res = await axiosConfig.get<TResponse>(`/api/users/` ,
            {
                headers: {
                  Authorization: `Bearer ${adminToken}`,
                },
              });
            return res.data
        }catch(error){
            console.error("Login Error:", axiosErrorHandler(error));
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
)