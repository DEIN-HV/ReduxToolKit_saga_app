import cityApi from 'api-collection/cityApi';
import { City, ListResponse } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { cityActions } from './citySlice';

function* fetchCityList() {

    try {
        const cityList: ListResponse<City> = yield call(cityApi.getAll);
        yield put(cityActions.fetchCityListSuccess(cityList));
    } catch (error) {
        yield put(cityActions.fetchCityListFailed);
    }
}

export function* citySaga() {
    yield takeLatest(cityActions.fetchCityList.type, fetchCityList)
}