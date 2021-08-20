import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Student } from "models";
import { RootState } from 'app/store';

export interface DashboardStatistic {
    maleCount: number;
    femaleCount: number;
    highMarkCount: number;
    lowMarkCount: number;
}

export interface RankingByCity {
    cityId: string;
    cityName: string;
    rankingList: Student[];
}

export interface StateDashboard {
    loading: boolean;
    statistic: DashboardStatistic;
    highestStudentList: Student[];
    lowestStudentList: Student[];
    rankingByCity: RankingByCity[];
}

const initialState: StateDashboard = {
    loading: false,
    statistic: {
        maleCount: 0,
        femaleCount: 0,
        highMarkCount: 0,
        lowMarkCount: 0,
    },
    highestStudentList: [],
    lowestStudentList: [],
    rankingByCity: [],
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        fecthData(state) {
            state.loading = true;
        },
        fecthDataSuccess(state) {
            state.loading = false;
        },
        fecthDataFalse(state) {
            state.loading = false;
        },
        setStatistic(state, action: PayloadAction<DashboardStatistic>) {
            state.statistic = action.payload;
        },
        setHighestStudentList(state, action: PayloadAction<Student[]>) {
            state.highestStudentList = action.payload;
        },
        setLowestStudentList(state, action: PayloadAction<Student[]>) {
            state.lowestStudentList = action.payload;
        },
        setRankingByCityList(state, action: PayloadAction<RankingByCity[]>) {
            state.rankingByCity = action.payload;
        },
    },
})

//Actions
export const dashboardActions = dashboardSlice.actions;

//Selector
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
export const selectDashboardStatistic = (state: RootState) => state.dashboard.statistic;
export const selectHighestStudent = (state: RootState) => state.dashboard.highestStudentList;
export const selectLowestStudent = (state: RootState) => state.dashboard.lowestStudentList;
export const selectRankingByCity = (state: RootState) => state.dashboard.rankingByCity;

//Reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;