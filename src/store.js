import { configureStore } from '@reduxjs/toolkit';
import studentsDataSlice from './Pages/studentsDataSlice';

const store = configureStore({
  reducer: {
    data: studentsDataSlice,
  },
});

export default store;
