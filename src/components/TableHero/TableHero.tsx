import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { dashboardActions, dashboardSelectors } from "@/features/dashboard/dashboardSlice"
import {
  Card,
  Divider,
  SparkAreaChart,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react"
import { useEffect } from "react"
import { chartdataSparkAreaChart } from "../data"

const TableHero = () => {
  const dispatch = useAppDispatch()
  const coinsMarkets = useAppSelector(dashboardSelectors.selectCoinsMarkets)
  //const loadings = useAppSelector(dashboardSelectors.selectLoadings)
  const errors = useAppSelector(dashboardSelectors.selectErrors)

  useEffect(() => {
    dispatch(
      dashboardActions.getCoinsMarketsDataRequest({
        params: { per_page: 10 },
      }),
    )
  }, [dispatch])

  return (
    <Card className="mx-auto max-w-full">
      <div className="flex justify-between items-center w-full relative">
        <h3 className="dark:text-white">Market</h3>
      </div>
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Market</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            <TableHeaderCell>24H Change</TableHeaderCell>
            <TableHeaderCell>24H Lowest</TableHeaderCell>
            <TableHeaderCell>24H Highest</TableHeaderCell>
            <TableHeaderCell>24H Volume</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody className="relative h-20 ">
          {errors.coinsMarkets && coinsMarkets.length === 0 ? (
            <TableRow className="m-4 flex items-center justify-center w-full  absolute">
              <TableCell>{`${errors.coinsMarkets}: Too Many Requests`}</TableCell>
            </TableRow>
          ) : null}
          {coinsMarkets.map(coin => (
            <TableRow key={coin.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <img className="h-4 w-4" src={`${coin.image}`} alt={coin.name} />
                  {coin.name}
                  <span className="text-xs">({coin.symbol})</span>
                </div>
              </TableCell>
              <TableCell>${coin.current_price}</TableCell>
              <TableCell className={`${coin.price_change_percentage_24h < 0 ? "text-red-400" : "text-green-400"}`}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </TableCell>
              <TableCell>{coin.low_24h}</TableCell>
              <TableCell>{coin.high_24h}</TableCell>
              <TableCell>{coin.total_volume}</TableCell>
              <TableCell>
                <SparkAreaChart
                  data={chartdataSparkAreaChart}
                  categories={["Performance"]}
                  index={"month"}
                  colors={[`${coin.price_change_percentage_24h < 0 ? "red" : "emerald"}`]}
                  className="h-8 w-20 sm:h-10 sm:w-36"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

export default TableHero
