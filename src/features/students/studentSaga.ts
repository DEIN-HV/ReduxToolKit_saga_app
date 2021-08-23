import { PayloadAction } from "@reduxjs/toolkit";
import studentApi from "api-collection/studentApi";
import { ListParams, ListResponse, Student } from "models";
import { call, debounce, put, takeLatest } from "redux-saga/effects";
import { studentActions } from "./studentSlice";

function* fetchStudentList(action: PayloadAction<ListParams>) {
    try {
        const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
        yield put(studentActions.fecthStudentListSuccess(response));

    } catch (error) {
        yield put(studentActions.fecthStudentListFailed);
        console.log('error message', error)
    }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
    yield put(studentActions.setFilter(action.payload));
    console.log(action.payload)
}

export default function* studentSaga() {
    yield takeLatest(studentActions.fecthStudentList, fetchStudentList);

    yield debounce(500, studentActions.setFilterDebounce.type, handleSearchDebounce);
}