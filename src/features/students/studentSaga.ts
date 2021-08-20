import { PayloadAction } from "@reduxjs/toolkit";
import studentApi from "api-collection/studentApi";
import { ListParams, ListResponse, Student } from "models";
import { call, put, takeLatest } from "redux-saga/effects";
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

export default function* studentSaga() {
    yield takeLatest(studentActions.fecthStudentList, fetchStudentList);
}