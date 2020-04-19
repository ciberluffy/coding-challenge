import { put, call, takeLatest, all } from "redux-saga/effects"
import { api } from "../services"
import {
  REQUEST_API_DATA,
  receiveApiData,
  REQUEST_API_DETAILS,
  receiveApiDetails,
} from "../actions/actions"

function* getApiData(offset) {
  try {
    const data = yield call(api.fetchUpcoming, offset)
    yield put(receiveApiData(data))
  } catch (e) {
    // console.log(e)
  }
}

export function* myDataSaga() {
  yield takeLatest(REQUEST_API_DATA, getApiData)
}

function* getApiDetails(id) {
  try {
    const data = yield call(api.fetchDetail, id)
    yield put(receiveApiDetails(data))
  } catch (e) {
    // console.log(e)
  }
}

export function* myDetailsSaga() {
  yield takeLatest(REQUEST_API_DETAILS, getApiDetails)
}

export default function* root() {
  yield all([call(myDataSaga), call(myDetailsSaga)])
}
