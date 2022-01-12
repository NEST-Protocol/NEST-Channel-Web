import { Line } from '@ant-design/charts'
import React, { FC } from 'react'

type LineChartProps = {
  data: any[]
  xField: string
  yField: string
}

const LineChart: FC<LineChartProps> = ({ ...props }) => {
  const config = {
    data: props.data,
    xField: props.xField,
    yField: props.yField,
    yAxis: {
      title: {
        text: 'Interval from last quotation',
      },
      label: {
        formatter: (text: string) => {
          return text + 's'
        },
      },
    },
    xAxis: {
      label: {
        formatter: (text: string) => {
          return 'Latest ' + (21 - Number(text))
        },
      },
    },
    tooltip: {
      showTitle: false,
    },
    color: '#EAAA00',
    autoFit: true,
    point: {
      shape: 'circle',
      size: 4,
    },
    smooth: true,
  }

  return <Line {...config} />
}

export default LineChart
