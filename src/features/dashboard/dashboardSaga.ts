import cityApi from "api-collection/cityApi";
import studentApi from "api-collection/studentApi";
import { City, ListResponse, Student } from "models";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { dashboardActions, RankingByCity } from "./dashboardSlice";

function* fetchStatisticData() {
    const reponseList: Array<ListResponse<Student>> = yield all([
        call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'male' }),
        call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'female' }),
        call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
        call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
    ]);

    const statisticList = reponseList.map(x => x.pagination._totalRows);
    const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticList;

    yield put(dashboardActions.setStatistic({ maleCount, femaleCount, highMarkCount, lowMarkCount }));
}

function* fetchHighestMarkcData() {
    const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
        _page: 1,
        _limit: 5,
        _sort: 'mark',
        _order: 'desc'
    });

    yield put(dashboardActions.setHighestStudentList(data));
}
function* fetchLowestMarkData() {
    const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
        _page: 1,
        _limit: 5,
        _sort: 'mark',
        _order: 'asc'
    });

    yield put(dashboardActions.setLowestStudentList(data));
}

function* fetchRankingByCityList() {
    //fetch city list
    const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);

    //fetch data per city
    const callfetchStudentPerCity = cityList.map(city => (
        call(studentApi.getAll, {
            _page: 1,
            _limit: 5,
            _sort: 'mark',
            _order: 'asc',
            city: city.code,
        })
    ));

    const rankingStudentList: Array<ListResponse<Student>> = yield all(callfetchStudentPerCity);

    const fetchRankingPerCityList: Array<RankingByCity> = rankingStudentList.map((x, idx) => ({
        cityId: cityList[idx].code,
        cityName: cityList[idx].name,
        rankingList: x.data,
    }))

    //update state
    yield put(dashboardActions.setRankingByCityList(fetchRankingPerCityList))
}

function* fetchDashboardData() {
    try {
        yield all([
            call(fetchStatisticData),
            call(fetchHighestMarkcData),
            call(fetchLowestMarkData),
            call(fetchRankingByCityList),
        ]);

        yield put(dashboardActions.fecthDataSuccess());

    } catch (error) {
        console.log(error);
    }
}

export default function* dashboardSaga() {
    yield takeLatest(dashboardActions.fecthData.type, fetchDashboardData);
}