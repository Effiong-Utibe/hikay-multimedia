import React, { FC } from 'react'
import { LineChart as MuiLineChart } from '@mui/x-charts/LineChart';

interface Props {
  // Assuming views is an array of 12 numbers (Jan-Dec)
  data: number[];
}

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const TotalViewsChart: FC<Props> = ({ data }) => {
  // Map the array to the format MUI X Charts expects
  const chartData = months.map((month, index) => ({
    month,
    views: data[index] ?? 0,
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <MuiLineChart
        dataset={chartData}
        xAxis={[{
          scaleType: 'point',
          dataKey: 'month',
          label: '2024 Overview'
        }]}
        series={[
          {
            dataKey: 'views',
            label: 'Total Views',
            color: '#f97316', // Tailwind orange-500 to match your dashboard icon
            area: true,       // Optional: makes it an Area Chart
          },
        ]}
        height={300}
        margin={{ left: 10, right: 5, top: 5, bottom: 10 }}
      />
    </div>
  );
};

export default TotalViewsChart;

