import { Card, Divider, SparkAreaChart } from "@tremor/react"
import { chartdataSparkAreaChart } from "../data"

type Props = {
  title: string
  volume: string
  subTitle: string
  isChart?: boolean
}

const CardItem = ({ title, volume, subTitle, isChart = true }: Props) => {
  return (
    <Card className="mx-auto max-w-sm">
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">{title}</p>
      <Divider />
      <div className="flex gap-2">
        <div>
          <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            {volume}
          </p>
          <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">{subTitle}</p>
        </div>
        {isChart ? (
          <SparkAreaChart
            data={chartdataSparkAreaChart}
            categories={["Performance"]}
            index={"month"}
            colors={["emerald"]}
            className="h-8 w-20 sm:h-10 sm:w-36"
          />
        ) : null}
      </div>
    </Card>
  )
}

export default CardItem
