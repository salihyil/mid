export interface CoinDataType {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number | null
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  roi: {
    times: number
    currency: string
    percentage: number
  } | null
  last_updated: string
}

export type MenuItem = {
  icon: any
  path: string
  title: string
  signOut?: boolean
}

export interface DashboardSliceState {
  coinsMarkets: CoinDataType[]
  coinChartData: any[]
  coinData: coinType
  selectedCoin: string
  capitalizedCoinName: string
  loadings: {
    coinsMarkets: boolean
    marketChart: boolean
    coin: boolean
  }
  errors: {
    coinsMarkets: null | string
    marketChart: null | string
    coin: null | string
  }
}
export type PayloadActionCoinsMarketsType = {
  params: { per_page: number }
}

export type MarketChartType = {
  id: string
}

export type coinChartDataType = {
  prices: [number, number][]
  market_caps: [number, number][]
  total_volumes: [number, number][]
}

export type coinType = {
  id: string
  symbol: string
  name: string
  web_slug: string
  asset_platform_id: null | any // Değişken platform özelliğinin tipini belirlemek için uygun bir tür ekleyebilirsiniz
  platforms: Record<string, any> // Object yapısı olduğu için Record<string, any> kullanıldı
  detail_platforms: Record<string, any> // Object yapısı olduğu için Record<string, any> kullanıldı
  block_time_in_minutes: number
  hashing_algorithm: string
  categories: string[]
  preview_listing: boolean
  public_notice: null | any // Değişken public_notice özelliğinin tipini belirlemek için uygun bir tür ekleyebilirsiniz
  additional_notices: any[] // Değişken additional_notices özelliğinin tipini belirlemek için uygun bir tür ekleyebilirsiniz
  localization: Record<string, string>
  description: Record<string, string>
  links: Record<string, string>
  image: {
    thumb: string
    small: string
    large: string
  }
  country_origin: string
  genesis_date: string
  sentiment_votes_up_percentage: number
  sentiment_votes_down_percentage: number
  watchlist_portfolio_users: number
  market_cap_rank: number
  market_data: MarketData
  community_data: Record<string, any>
  developer_data: Record<string, any>
  status_updates: any[] // Değişken status_updates özelliğinin tipini belirlemek için uygun bir tür ekleyebilirsiniz
  last_updated: string
  tickers: {
    base: string
    target: string
    market: {
      name: string
      identifier: string
      has_trading_incentive: boolean
    }
    last: number
    volume: number
    converted_last: Record<string, number>
    converted_volume: Record<string, number>
    trust_score: string
    bid_ask_spread_percentage: number
    timestamp: string
    last_traded_at: string
    last_fetch_at: string
    is_anomaly: boolean
    is_stale: boolean
    trade_url: string
    token_info_url: null | string
    coin_id: string
  }[]
}

interface MarketData {
  current_price: Common
  total_value_locked: null
  mcap_to_tvl_ratio: null
  fdv_to_tvl_ratio: null
  roi: null
  ath: Common
  ath_change_percentage: Common
  ath_date: Record<string, string>
  atl: Common
  atl_change_percentage: Common
  atl_date: Record<string, string>
  market_cap: Common
  market_cap_rank: number
  fully_diluted_valuation: Common
  market_cap_fdv_ratio: number
  total_volume: Common
  high_24h: Common
  low_24h: Common
  price_change_24h: number
  price_change_percentage_24h: number
  price_change_percentage_7d: number
  price_change_percentage_14d: number
  price_change_percentage_30d: number
  price_change_percentage_60d: number
  price_change_percentage_200d: number
  price_change_percentage_1y: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  price_change_24h_in_currency: Common
  price_change_percentage_1h_in_currency: Common
  price_change_percentage_24h_in_currency: Common
  price_change_percentage_7d_in_currency: Common
  price_change_percentage_14d_in_currency: Common
  price_change_percentage_30d_in_currency: Common
  price_change_percentage_60d_in_currency: Common
  price_change_percentage_200d_in_currency: Common
  price_change_percentage_1y_in_currency: Common
  market_cap_change_24h_in_currency: Common
  market_cap_change_percentage_24h_in_currency: Common
  total_supply: number
  max_supply: number
  circulating_supply: number
  last_updated: string
}

interface Common {
  aed: number
  ars: number
  aud: number
  bch: number
  bdt: number
  bhd: number
  bmd: number
  bnb: number
  brl: number
  btc: number
  cad: number
  chf: number
  clp: number
  cny: number
  czk: number
  dkk: number
  dot: number
  eos: number
  eth: number
  eur: number
  gbp: number
  gel: number
  hkd: number
  huf: number
  idr: number
  ils: number
  inr: number
  jpy: number
  krw: number
  kwd: number
  lkr: number
  ltc: number
  mmk: number
  mxn: number
  myr: number
  ngn: number
  nok: number
  nzd: number
  php: number
  pkr: number
  pln: number
  rub: number
  sar: number
  sek: number
  sgd: number
  thb: number
  try: number
  twd: number
  uah: number
  usd: number
  vef: number
  vnd: number
  xag: number
  xau: number
  xdr: number
  xlm: number
  xrp: number
  yfi: number
  zar: number
  bits: number
  link: number
  sats: number
}
