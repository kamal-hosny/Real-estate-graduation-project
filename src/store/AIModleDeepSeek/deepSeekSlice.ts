import { createSlice } from "@reduxjs/toolkit";
import { TLoading, isString } from "../../types";
import { sendMessageToDeepSeek } from "./act/actSendMassageToDeepSeek";

interface IInitialState {
    record: string | null;
    loading: TLoading;
    error: string | null;
}

const initialState: IInitialState = {
    record: null,
    loading: "idle",
    error: null,
};

const deepSeekSlice = createSlice({
    name: "deepSeek",
    initialState,
    reducers: {
        reset: (state) => {
            state.record = null;
            state.loading = "idle";
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessageToDeepSeek.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(sendMessageToDeepSeek.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.record = action.payload;
                state.error = null;
            })
            .addCase(sendMessageToDeepSeek.rejected, (state, action) => {
                state.loading = "failed";
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            });
    }
});

export const { reset } = deepSeekSlice.actions;
export default deepSeekSlice.reducer;