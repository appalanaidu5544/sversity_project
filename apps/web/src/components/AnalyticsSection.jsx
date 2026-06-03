import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Legend 
} from 'recharts';

const barData = [
  { name: '2022', students: 4000, faculty: 240 },
  { name: '2023', students: 4500, faculty: 280 },
  { name: '2024', students: 5200, faculty: 320 },
  { name: '2025', students: 6100, faculty: 390 },
  { name: '2026', students: 7400, faculty: 450 },
];

const areaData = [
  { month: 'Jan', revenue: 4000, expenses: 2400 },
  { month: 'Feb', revenue: 3000, expenses: 1398 },
  { month: 'Mar', revenue: 2000, expenses: 9800 },
  { month: 'Apr', revenue: 2780, expenses: 3908 },
  { month: 'May', revenue: 1890, expenses: 4800 },
  { month: 'Jun', revenue: 2390, expenses: 3800 },
  { month: 'Jul', revenue: 3490, expenses: 4300 },
];

const AnalyticsSection = () => {
  return (
    <section className="py-24 bg-[#F8F9FA] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-[#111827]">
            How data analytics transforms your institution
          </h2>
          <p className="text-lg text-[#1F2937]">
            Make informed decisions with real-time insights. Our advanced analytics engine processes thousands of data points to give you a clear picture of institutional health, student performance, and financial growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Bar Chart */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-[#111827] mb-6">Growth Metrics</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(229, 231, 235, 0.5)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(243, 244, 246, 0.5)' }}
                    contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="students" name="Students" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="faculty" name="Faculty" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Side - Area Chart */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-[#111827] mb-6">Financial Trends</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(229, 231, 235, 0.5)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#06B6D4" strokeWidth={3} fillOpacity={1} fill="url(#colorExpenses)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;