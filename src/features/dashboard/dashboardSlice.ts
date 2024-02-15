import type {
  CoinDataType,
  DashboardSliceState,
  MarketChartType,
  PayloadActionCoinsMarketsType,
  coinChartDataType,
  coinType,
} from "@/types"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { REDUCERS } from "./constants"

const initialState: DashboardSliceState = {
  coinsMarkets: [],
  coinChartData: [],
  selectedCoin: "bitcoin",
  capitalizedCoinName: "Bitcoin",
  coinData: {} as coinType,
  loadings: {
    coinsMarkets: false,
    marketChart: false,
    coin: false,
  },
  errors: {
    coinsMarkets: null,
    marketChart: null,
    coin: null,
  },
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const dashboardSlice = createSlice({
  name: REDUCERS.DASHBOARD,
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: ({ reducer }) => ({
    getCoinsMarketsDataRequest: reducer((state, action: PayloadAction<PayloadActionCoinsMarketsType>) => {
      state.loadings.coinsMarkets = true
      state.errors.coinsMarkets = initialState.errors.coinsMarkets
    }),
    getCoinsMarketsDataSuccess: reducer((state, action: PayloadAction<CoinDataType[]>) => {
      state.coinsMarkets = action.payload
      state.loadings.coinsMarkets = initialState.loadings.coinsMarkets
      state.errors.coinsMarkets = initialState.errors.coinsMarkets
    }),
    getCoinsMarketsDataError: reducer((state, action: PayloadAction<string>) => {
      state.loadings.coinsMarkets = initialState.loadings.coinsMarkets
      state.errors.coinsMarkets = action.payload
    }),

    getMarketChartRequest: reducer((state, action: PayloadAction<MarketChartType>) => {
      state.selectedCoin = action.payload.id
      state.loadings.marketChart = true
      state.errors.marketChart = initialState.errors.marketChart
    }),
    getMarketChartSuccess: reducer((state, action: PayloadAction<coinChartDataType>) => {
      state.coinChartData = action.payload.prices.map(price => {
        const date = new Date(price[0])
        const month = date.toLocaleString("en", { month: "short" })
        const day = date.getDate()
        state.capitalizedCoinName = `${state.selectedCoin.charAt(0).toUpperCase()}${state.selectedCoin.slice(1)}`

        return {
          date: `${month} ${day}`,
          [state.capitalizedCoinName]: price[1],
        }
      })
      state.loadings.marketChart = initialState.loadings.marketChart
      state.errors.marketChart = initialState.errors.marketChart
    }),
    getMarketChartError: reducer((state, action: PayloadAction<string>) => {
      state.loadings.marketChart = initialState.loadings.marketChart
      state.errors.marketChart = action.payload
    }),

    getCoinsRequest: reducer((state, action: PayloadAction<{ id: string }>) => {
      state.loadings.coin = true
      state.errors.coin = initialState.errors.coin
    }),
    getCoinsSuccess: reducer((state, action: PayloadAction<coinType>) => {
      state.coinData = action.payload
      state.loadings.coin = initialState.loadings.coin
      state.errors.coin = initialState.errors.coin
    }),
    getCoinsError: reducer((state, action) => {
      state.loadings.coin = initialState.loadings.coin
      state.errors.coin = `Failed to load data for "${action.payload}" coin.`
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectCoinsMarkets: dashboard => dashboard.coinsMarkets,
    selectLoadings: dashboard => dashboard.loadings,
    selectErrors: dashboard => dashboard.errors,
    selectCoin: dashboard => dashboard.selectedCoin,
    selectCoinChartData: dashboard => dashboard.coinChartData,
    selectCapitalizedCoinName: dashboard => dashboard.capitalizedCoinName,
    selectCoinData: dashboard => dashboard.coinData,
  },
})

// Action creators are generated for each case reducer function.
export const dashboardActions = dashboardSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const dashboardSelectors = dashboardSlice.selectors
