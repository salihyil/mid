import { useAppDispatch, useAppSelector } from "@/app/hooks"
import AreaChartHero from "@/components/AreaChartHero"
import CardItem from "@/components/CardItem"
import Loading from "@/components/Loading"
import TableHero from "@/components/TableHero"
import { Card, Divider, SearchSelect, SearchSelectItem } from "@tremor/react"
import numeral from "numeral"
import { useEffect } from "react"
import { dashboardActions, dashboardSelectors } from "./dashboardSlice"

export const Dashboard = () => {
  const dispatch = useAppDispatch()
  const capitalizedCoinName = useAppSelector(dashboardSelectors.selectCapitalizedCoinName)
  const coinData = useAppSelector(dashboardSelectors.selectCoinData)
  const selectedCoin = useAppSelector(dashboardSelectors.selectCoin)
  const errors = useAppSelector(dashboardSelectors.selectErrors)

  useEffect(() => {
    dispatch(dashboardActions.getCoinsRequest({ id: selectedCoin }))
  }, [dispatch, selectedCoin])

  const handleChange = (selectedValue: string) => {
    dispatch(dashboardActions.getMarketChartRequest({ id: selectedValue }))
  }

  return (
    <main className="p-4 container mx-auto dark:bg-dark-tremor-background ">
      <div className="grid grid-cols-4 auto-rows-max grid-flow-row gap-4">
        {Object.keys(coinData).length === 0 && errors.coin ? (
          <Card className="grid grid-cols-4 auto-rows-max grid-flow-row gap-4">{`${errors.coinsMarkets}: Too Many Requests`}</Card>
        ) : null}

        {Object.keys(coinData).length > 0 ? (
          <CardItem
            title="Coins"
            volume={`${numeral(coinData.market_data.total_volume.usd).format("0.0a").toUpperCase()}`}
            subTitle={"Total Volume(USD)"}
          />
        ) : (
          <Card>
            <Loading />
          </Card>
        )}
        {Object.keys(coinData).length > 0 ? (
          <CardItem
            title="24H Price Change"
            volume={`${coinData.market_data.price_change_24h.toFixed(2)}`}
            subTitle={`${coinData.market_data.price_change_percentage_24h.toFixed(2)}%`}
          />
        ) : (
          <Card>
            <Loading />
          </Card>
        )}
        {Object.keys(coinData).length > 0 ? (
          <CardItem
            title="Total Market Cap(USD)"
            volume={`${numeral(coinData.market_data.market_cap.usd).format("0.0a").toUpperCase()}`}
            subTitle={"Total Volume(USD)"}
          />
        ) : (
          <Card>
            <Loading />
          </Card>
        )}
        {Object.keys(coinData).length > 0 ? (
          <CardItem
            title="Current Price(USD)"
            volume={`$${coinData.market_data.current_price.usd}`}
            subTitle={`Market Cap Rank: ${coinData.market_data.market_cap_rank}`}
            isChart={false}
          />
        ) : (
          <Card>
            <Loading />
          </Card>
        )}

        <div className="col-span-3">
          <SearchSelect defaultValue="bitcoin" onValueChange={handleChange}>
            <SearchSelectItem value="bitcoin">Bitcoin</SearchSelectItem>
            <SearchSelectItem value="ethereum">Ethereum</SearchSelectItem>
            <SearchSelectItem value="solana">Solana</SearchSelectItem>
          </SearchSelect>

          <AreaChartHero />
        </div>

        {Object.keys(coinData).length > 0 ? (
          <Card className="col-start-4">
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              {capitalizedCoinName} Price Change
            </p>
            <Divider />
            <p className="flex justify-between text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong">
              <div className="text-lg">7 days</div>
              <div
                className={`text-lg ${coinData.market_data.price_change_percentage_7d > 0 ? "text-green-500" : "text-red-500"}`}
              >{`${coinData.market_data.price_change_percentage_7d.toFixed(2)}%`}</div>
            </p>
            <p className="flex justify-between  text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong">
              <div className="text-lg">14 days</div>
              <div
                className={`text-lg ${coinData.market_data.price_change_percentage_14d > 0 ? "text-green-500" : "text-red-500"}`}
              >{`${coinData.market_data.price_change_percentage_14d.toFixed(2)}%`}</div>
            </p>
            <p className="flex justify-between text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong">
              <div className="text-lg">30 days</div>
              <div
                className={`text-lg ${coinData.market_data.price_change_percentage_30d > 0 ? "text-green-500" : "text-red-500"}`}
              >{`${coinData.market_data.price_change_percentage_30d.toFixed(2)}%`}</div>
            </p>
            <p className="flex justify-between text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong">
              <div className="text-lg">60 days</div>
              <div
                className={`text-lg ${coinData.market_data.price_change_percentage_60d > 0 ? "text-green-500" : "text-red-500"}`}
              >{`${coinData.market_data.price_change_percentage_60d.toFixed(2)}%`}</div>
            </p>
            <p className="flex justify-between  text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong">
              <div className="text-lg">200 days</div>
              <div
                className={`text-lg ${coinData.market_data.price_change_percentage_200d > 0 ? "text-green-500" : "text-red-500"}`}
              >{`${coinData.market_data.price_change_percentage_200d.toFixed(2)}%`}</div>
            </p>
            <p className="flex justify-between  text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong">
              <div className="text-lg">1 years</div>
              <div
                className={`text-lg ${coinData.market_data.price_change_percentage_1y > 0 ? "text-green-500" : "text-red-500"}`}
              >{`${coinData.market_data.price_change_percentage_1y.toFixed(2)}%`}</div>
            </p>
          </Card>
        ) : (
          <Card>
            <Loading />
          </Card>
        )}
      </div>
      <div className="mt-6">
        <TableHero />
      </div>
    </main>
  )
}
