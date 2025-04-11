import { createSlice } from "@reduxjs/toolkit";
import { RealProperty, TLoading, isString } from "../../types";
import { getAllProperties } from "./act/actGetAllProperties";
import { getOneProperty } from "./act/actGetOneProperty";
import { editProperty } from "./act/actEditProperty";
import { deleteProperty } from "./act/actDeleteProperty";
import { createProperty } from "./act/actCreateProperty";

interface IPropertyState {
  records: {
    $id: string;
    $values: RealProperty[];
  };
  record: RealProperty | null;
  loading: TLoading;
  error: string | null;
}

const initialState: IPropertyState = {
  records: {
    $id: "",
    $values: [],
  },
  record: null,
  loading: "idle",
  error: null,
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllProperties
      .addCase(getAllProperties.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.records = action.payload; 
        state.error = null;
      })
      .addCase(getAllProperties.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      })

      // getOneProperty
      .addCase(getOneProperty.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getOneProperty.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.record = action.payload;
        state.error = null;
      })
      .addCase(getOneProperty.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      })

      // createProperty
      .addCase(createProperty.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.records.$values.push(action.payload);
        state.error = null;
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      })

      // editProperty
      .addCase(editProperty.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(editProperty.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const index = state.records.$values.findIndex(
          (property) => property.propertyId === action.payload.propertyId
        );
        if (index !== -1) {
          state.records.$values[index] = action.payload;
        }
        if (state.record?.propertyId === action.payload.propertyId) {
          state.record = action.payload;
        }
        state.error = null;
      })
      .addCase(editProperty.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      })

      // deleteProperty
      .addCase(deleteProperty.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.records.$values = state.records.$values.filter(
          (el) => el.propertyId !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
  },
});

export default propertySlice.reducer;