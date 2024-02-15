import axios from "axios"

const fetchCoinsMarkets = async (params?: any) => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&page=1&sparkline=false&locale=en",
    {
      params,
    },
  )
  return response.data
}

export { fetchCoinsMarkets }
