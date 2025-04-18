import { createSlice } from "@reduxjs/toolkit";
import { TLoading, TUser, isString } from "../../types";
import { getAllUser } from "./act/actGetAllUser";
import { getOneUser } from "./act/actGetOneUser";
import { deleteUser } from "./act/actDeleteUser";
import { editUser } from "./act/actEditUser";

interface IAuthState {
  records: TUser[];
  usersById: Record<string, TUser>;
  loading: TLoading;
  error: string | null;
}

const initialState: IAuthState = {
  records: [],
  usersById: {},
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
        
        let users: TUser[] = [];
        if (Array.isArray(action.payload)) {
          users = action.payload;
        } else if (action.payload && typeof action.payload === "object" && Array.isArray((action.payload as any).$values)) {
          users = (action.payload as any).$values; 
        }

        state.records = users;
        if (users.length > 0) {
          state.usersById = users.reduce((acc: Record<string, TUser>, user: TUser) => {
            acc[user.id] = user;
            return acc;
          }, {});
        } else {
          state.usersById = {}; 
        }
        state.error = null;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        } else {
          state.error = "Failed to fetch users";
        }
      })
      // getOneUser
      .addCase(getOneUser.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getOneUser.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.usersById[action.payload.id] = action.payload;
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
        state.usersById[action.payload.id] = action.payload;
        if (Array.isArray(state.records)) {
          const index = state.records.findIndex(
            (user) => user.id === action.payload.id
          );
          if (index !== -1) {
            state.records[index] = action.payload;
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
        delete state.usersById[action.payload];
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