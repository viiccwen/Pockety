'use client';
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Label } from 'recharts';



interface DataProps {
  category: string;
  value: number;
}

interface DisplayPieChartProps {
  data: DataProps[] | undefined;
}

interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  value: number;
  index: number;
}

export const DisplayPieChart = ({data} : DisplayPieChartProps) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28','#6D83B5', '#88CCEE', '#8B00FF', '#00FFFF'];

  {/* TODO: Implement chart */}
  return (
    <>
    {
      data?.length == 0 || data == undefined 
      ? 
      <div className='flex justify-center mt-5 font-bold'>
        <div className=' bg-red-400 text-white p-2 rounded-sm'>
          沒有資料...
        </div>
      </div> 
      : 
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={350} height={350}>
          <Pie
            data={data}
            dataKey="value"

            cx="50%"
            cy="50%"
            fill="#8884d8"
            label={true}
            labelLine={true}
          >
            {
              data?.map((entry, index) => (
                <>
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                
              </>
              ))
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    }
    </>
  );
}