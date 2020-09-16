import React from 'react'
import { Line } from 'react-chartjs-2';

export default function TimelineChart({ width, height, timeline }) {
  return (
    <Line
      width={width}
      height={height}
      data={{
        labels: timeline.map(({ date }) => date),
        datasets: [{
          data: timeline.map(({ confirmed }) => confirmed),
          label: 'Infected',
          borderColor: '#de3700',
          borderWidth: 1,
          pointStyle: 'dash'
        }, {
          data: timeline.map(({ deaths }) => deaths),
          label: 'Deaths',
          borderColor: '#00809d',
          borderWidth: 1,
          pointStyle: 'dash'
        },
        ],
      }}
    />
  )
}
