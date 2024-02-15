import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { dashboardActions, dashboardSelectors } from "@/features/dashboard/dashboardSlice"
import { dataFormatter } from "@/utils/dataFormatter"
import { AreaChart } from "@tremor/react"
import { useEffect } from "react"

function AreaChartHero() {
  const dispatch = useAppDispatch()
  const coinChartData = useAppSelector(dashboardSelectors.selectCoinChartData)
  const selectedCoin = useAppSelector(dashboardSelectors.selectCoin)
  const capitalizedCoinName = `${selectedCoin.charAt(0).toUpperCase()}${selectedCoin.slice(1)}`

  useEffect(() => {
    dispatch(dashboardActions.getMarketChartRequest({ id: selectedCoin }))
  }, [dispatch, selectedCoin])

  return (
    <AreaChart
      className="h-80"
      data={coinChartData}
      index="date"
      categories={[capitalizedCoinName]}
      colors={["blue"]}
      yAxisWidth={60}
      valueFormatter={dataFormatter}
      onValueChange={v => console.log(v)}
    />
  )
}

export default AreaChartHero
