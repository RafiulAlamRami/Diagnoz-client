import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const Stats = () => {
    const axiosSecure = useAxiosSecure();

    const { data: pending = [] } = useQuery({
        queryKey: ['pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/delivery-pending');
            return res.data;
        }
    })

    const { data: delivered = [] } = useQuery({
        queryKey: ['delivered'],
        queryFn: async () => {
            const res = await axiosSecure.get('/delivery-delivered');
            return res.data;
        }
    })

    const data = [
        { name: "Pending", value: pending.length },
        { name: "Delivered", value: delivered.length },
    ];


    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div>
            <div>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Stats;