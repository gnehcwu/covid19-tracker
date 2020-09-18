import React, { useState, useEffect, useMemo } from 'react'
import { Line } from 'react-chartjs-2';

export default function TimelineChart({ timeline, container }) {
  const [viewWidth, setViewWidth] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)

  useEffect(() => {
    setViewWidth(window.document.body.clientWidth)
    if (container.current) {
      setContainerHeight(container.current.clientHeight)
    }
  }, [container])

  const data = useMemo(() => {
    return {
      labels: timeline.map(({ date }) => date),
      datasets: [{
        data: timeline.map(({ confirmed }) => confirmed),
        label: 'Infected',
        borderColor: '#de3700',
        borderWidth: 1,
        pointStyle: 'line'
      }, {
        data: timeline.map(({ deaths }) => deaths),
        label: 'Deaths',
        borderColor: '#00809d',
        borderWidth: 1,
        pointStyle: 'line'
      },
      ],
    }
  }, [timeline])

  useEffect(() => {
    setViewWidth(document.body.clientWidth)

  }, [])

  const responsiveHeight = viewWidth > 768 ? 0 : containerHeight
  const responsiveWidth = viewWidth > 768 ? viewWidth - 412 : viewWidth - 48

  return <Line height={responsiveHeight} width={responsiveWidth} data={data} />
}
