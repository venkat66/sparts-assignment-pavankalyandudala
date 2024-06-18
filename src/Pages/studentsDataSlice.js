import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk('data/fetchData', async ({ page, pageSize }) => {
  const apiUrl = `http://3.223.98.72:1337/api/students?pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
});

const studentsDataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    pagination: {
      page: 1,
      pageSize: 10,
      pageCount: 0,
      total: 0,
    },
  },
  reducers: {
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
        state.pagination = action.payload.meta.pagination;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setPage } = studentsDataSlice.actions;

export default studentsDataSlice.reducer;
