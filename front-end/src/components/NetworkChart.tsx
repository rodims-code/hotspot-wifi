import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { time: '02', upload: 25, download: 45 },
  { time: '03', upload: 30, download: 40 },
  { time: '04', upload: 20, download: 35 },
  { time: '05', upload: 35, download: 50 },
  { time: '06', upload: 28, download: 45 },
  { time: '07', upload: 40, download: 55 },
  { time: '08', upload: 32, download: 48 },
  { time: '09', upload: 45, download: 60 },
  { time: '10', upload: 38, download: 52 },
  { time: '11', upload: 43, download: 58 },
  { time: '12', upload: 35, download: 50 },
  { time: '13', upload: 40, download: 55 },
];

export function NetworkChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="time" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              fontSize: '12px'
            }}
            formatter={(value, name) => [
              `${value} Mbps`,
              name === 'upload' ? 'Vitesse upload' : 'Vitesse download'
            ]}
          />
          <Line 
            type="monotone" 
            dataKey="upload" 
            stroke="#f97316" 
            strokeWidth={2}
            dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="download" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Vitesse upload</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Vitesse download</span>
        </div>
      </div>
    </div>
  );
}