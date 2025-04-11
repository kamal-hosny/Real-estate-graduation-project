import { createSlice } from "@reduxjs/toolkit";
import { TLoading, TUser, isString } from "../../types";
import { getAllUser } from "./act/actGetAllUser";
import { getOneUser } from "./act/actGetOneUser";
import { deleteUser } from "./act/actDeleteUser";
import { editUser } from "./act/actEditUser";

interface IAuthState {
    records: any;
    record: TUser | null;
    token: string | null;
    loading: TLoading;
    error: string | null;
}

const initialState: IAuthState = {
    records: [],
    record: null,
    token: null,
    loading: "idle",
    error: null,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // getAllUser
            .addCase(getAllUser.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.records = action.payload;
                state.error = null;
            })
            .addCase(getAllUser.rejected, (state, action) => {
                state.loading = "failed";
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // getOneUser
            .addCase(getOneUser.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(getOneUser.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.record = action.payload;
                state.error = null;
            })
            .addCase(getOneUser.rejected, (state, action) => {
                state.loading = "failed";
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // editUser
            .addCase(editUser.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.loading = "succeeded";
                if (Array.isArray(state.records)) {
                    const index = state.records.findIndex(
                        (user) => user.id === action.payload.id
                    );
                    if (index !== -1) {
                        state.records[index] = action.payload;
                    }
                    if (state.record?.id === action.payload.id) {
                        state.record = action.payload;
                    }
                }
                state.error = null;
            })
            .addCase(editUser.rejected, (state, action) => {
                state.loading = "failed";
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // deleteUser
            .addCase(deleteUser.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = "succeeded";
                if (Array.isArray(state.records)) {
                    state.records = state.records.filter(
                        (el) => el.id !== action.payload
                    );
                }
                state.error = null;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = "failed";
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            });
    },
});

export default userSlice.reducer;
