import React from 'react';
import {
    Bar,
    BarChart,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import './style/Dashboard.css';

const COLORS = ['#ffc658', '#82ca9d','#ff8042', '#191970', '#00C49F', '#FFBB28'];

const Dashboard = ({ expenses }) => {
    const categoryData = Object.values(
        expenses
            .filter(exp => exp.type === 'expense')
            .reduce((acc, exp) => {
                acc[exp.category] = acc[exp.category] || { category: exp.category, total: 0 };
                acc[exp.category].total += exp.amount;
                return acc;
            }, {})
    );

    const typeData = expenses.reduce(
        (acc, exp) => {
            if (exp.type === 'credit') {
                acc[0].value += exp.amount;
            } else {
                acc[1].value += exp.amount;
            }
            return acc;
        },
        [
            { name: 'Credit', value: 0 },
            { name: 'Expense', value: 0 }
        ]
    );

    const monthDataMap = {};

    expenses.forEach((exp) => {
        const month = new Date(exp.date).toLocaleString('default', {
            month: 'short',
            year: 'numeric'
        });

        if (!monthDataMap[month]) {
            monthDataMap[month] = { month, credit: 0, expense: 0 };
        }

        if (exp.type === 'credit') {
            monthDataMap[month].credit += exp.amount;
        } else {
            monthDataMap[month].expense += exp.amount;
        }
    });

    const monthData = Object.values(monthDataMap);

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Spending Insights</h2>

            <div className="chart-section">
                <h3 className="chart-title">Credit vs Expense</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={typeData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {typeData.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-section">
                <h3 className="chart-title">Expense By Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={categoryData}
                            dataKey="total"
                            nameKey="category"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {categoryData.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-section">
                <h3 className="chart-title">Monthly Credit vs Expense</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="credit" fill="#82ca9d" name="Credit" />
                        <Bar dataKey="expense" fill="#ff8042" name="Expense" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;
