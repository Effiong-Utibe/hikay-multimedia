import React, { FC } from 'react'
import { BarChart } from '@mui/x-charts/BarChart';



interface Props {
  monthlyStats: Record<string, number[]>
}

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

const colors = [
  'rgba(54, 162, 235, 0.6)',
  'rgba(16, 185, 129, 0.6)',
  'rgba(245, 158, 11, 0.6)',
  'rgba(255, 99, 132, 0.6)',
  'rgba(153, 102, 255, 0.6)'
]

const MediaOverviewChart: FC<Props> = ({ monthlyStats }) => {

  const ChartData= months.map((month,index)=>{
    const entry:any={month};
    Object.entries(monthlyStats).forEach(([Category,dataArry])=>{
      entry[Category]=dataArry[index]
    });
    return entry;
  });
  //defining the serie(one for each category in monthlyStats)
  const series=Object.keys(monthlyStats).map((category,index)=>({
    dataKey:category,
    label:category,
    color: colors[index % colors.length],
    valueFormatter: (value: number | null) => `${value} units`,
  }))


  return (
    <div style={{ width:'100%', height: 300, margin:10 }}>
      <BarChart
      dataset={ChartData}
      xAxis={[{
        scaleType: 'band',
        dataKey: 'month',
        label: 'Months',
        barGapRatio: 0.1,
        categoryGapRatio: 0.3,
      }]}
        series={series}

        height={300}
        margin={{ top: 10, bottom: 10, left: 0, right: 0 }}
        slotProps={{
          legend: {

            position: { vertical: 'top', horizontal: 'center' as const },
          },
        }}
       />

    </div>
  )
}

export default MediaOverviewChart
