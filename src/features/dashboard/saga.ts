import { fetchCoinsMarkets } from "@/services/dashboard/coinsMarkets/api"
import type { CoinDataType, MarketChartType, PayloadActionCoinsMarketsType, coinChartDataType, coinType } from "@/types"
import type { PayloadAction } from "@reduxjs/toolkit"
import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

import { fetchCoins } from "@/services/dashboard/coins/api"
import { fetchMarketChart } from "@/services/dashboard/marketChart/api"
import { dashboardActions } from "./dashboardSlice"

function* coinsMarketsDataRequest({ payload: { params } }: PayloadAction<PayloadActionCoinsMarketsType>) {
  try {
    const data: CoinDataType[] = yield call(fetchCoinsMarkets, params)
    yield put(dashboardActions.getCoinsMarketsDataSuccess(data))
  } catch (error: any) {
    yield put(dashboardActions.getCoinsMarketsDataError(error.message))
  }
}

function* marketChartDataRequest({ payload: { id } }: PayloadAction<MarketChartType>) {
  try {
    const data: coinChartDataType = yield call(fetchMarketChart, id)

    yield put(dashboardActions.getMarketChartSuccess(data))
  } catch (error: any) {
    yield put(dashboardActions.getMarketChartError(error.message))
  }
}

function* coinDataRequest({ payload: { id } }: PayloadAction<{ id: string }>) {
  try {
    const data: coinType = yield call(fetchCoins, id)
    yield put(dashboardActions.getCoinsSuccess(data))
  } catch (error: any) {
    yield put(dashboardActions.getCoinsError(error.message))
  }
}

export function* watchDashboard() {
  yield takeEvery(dashboardActions.getCoinsMarketsDataRequest, coinsMarketsDataRequest)
  yield takeEvery(dashboardActions.getMarketChartRequest, marketChartDataRequest)
  yield takeLatest(dashboardActions.getCoinsRequest, coinDataRequest)
}
