import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, PaginationParams, Student } from 'models';

export interface studentState {
  loading: boolean;
  list: Student[];
  filter: ListParams;
  pagination: PaginationParams;
}

const initialState: studentState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 8,
  },
  pagination: {
    _page: 1,
    _limit: 5,
    _totalRows: 50,
  },
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fecthStudentList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },

    fecthStudentListSuccess(state, action: PayloadAction<ListResponse<Student>>) {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },

    fecthStudentListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },

    setFilterDebounce(state, action: PayloadAction<ListParams>) {
    },

  },
});

const studentReducers = studentSlice.reducer;
export default studentReducers;

export const selectStudentList = (state: RootState) => state.student.list;
export const selectStudentLoading = (state: RootState) => state.student.loading;
export const selectStudentFilter = (state: RootState) => state.student.filter;
export const selectStudentPagination = (state: RootState) => state.student.pagination;

export const studentActions = studentSlice.actions;
