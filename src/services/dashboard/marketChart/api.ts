import axios from "axios"

const fetchMarketChart = async (id: string) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=60&interval=daily&precision=2`,
  )
  return response.data
}

export { fetchMarketChart }
