import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { City, ListResponse } from "models";

export interface cityState {
    loading: boolean;
    list: City[];
}

const initialState: cityState = {
    loading: false,
    list: [],
}

const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        fetchCityList(state) {
            state.loading = true;
        },
        fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
            state.loading = false;
            state.list = action.payload.data;
        },
        fetchCityListFailed(state) {
            state.loading = false;
        },
    }
});

const cityReducers = citySlice.reducer;
export default cityReducers;

export const cityActions = citySlice.actions;

export const selectCityLoading = (state: RootState) => state.city.loading;
export const selectCityList = (state: RootState) => state.city.list;
export const selectCityMap = createSelector(selectCityList, (cityList) =>
    cityList.reduce((map: { [key: string]: City }, city) => {
        map[city.code] = city;
        return map;
    }, {})
);

