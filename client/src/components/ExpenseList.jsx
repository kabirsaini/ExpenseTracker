import React, { useState } from 'react';
import { deleteExpense } from '../api/expenses';
import './style/ExpenseList.css';

const ExpenseList = ({ expenses, setExpenses, onEdit }) => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const handleDelete = async (id) => {
        try {
            await deleteExpense(id);
            setExpenses(expenses.filter(exp => exp._id !== id));
        } catch (err) {
            console.error('Failed to delete:', err.message);
        }
    };

    const getFilteredExpenses = () => {
        return expenses.filter(exp => {
            const expDate = new Date(exp.date);
            const expMonth = String(expDate.getMonth() + 1).padStart(2, '0');
            const expYear = String(expDate.getFullYear());

            const matchMonth = selectedMonth ? expMonth === selectedMonth : true;
            const matchYear = selectedYear ? expYear === selectedYear : true;

            return matchMonth && matchYear;
        });
    };

    const uniqueYears = [...new Set(expenses.map(exp => new Date(exp.date).getFullYear()))].sort();

    const filteredExpenses = getFilteredExpenses();

    return (
        <div className="expense-list-container">
            <div className="expense-list-header">
                <h2 className="expense-list-title">Expense List</h2>
                <div className="filter-dropdowns">
                    <select
                        className="filter-dropdown"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        <option value="">All Months</option>
                        {[
                            '01','02','03','04','05','06','07','08','09','10','11','12'
                        ].map((month, index) => (
                            <option key={month} value={month}>
                                {new Date(0, index).toLocaleString('default', { month: 'long' })}
                            </option>
                        ))}
                    </select>

                    <select
                        className="filter-dropdown"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <option value="">All Years</option>
                        {uniqueYears.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredExpenses.length === 0 ? (
                <p className="no-expenses-msg">No entries for this period.</p>
            ) : (
                <table className="expense-table">
                    <thead>
                        <tr>
                            <th className="table-header">Amount</th>
                            <th className="table-header">Category</th>
                            <th className="table-header">Description</th>
                            <th className="table-header">Date</th>
                            <th className="table-header">Type</th>
                            <th className="table-header">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExpenses.map((exp) => (
                            <tr key={exp._id} className="expense-row">
                                <td className={`expense-cell amount ${exp.type}`}>
                                    {exp.type === 'credit' ? `+₹${exp.amount}` : `-₹${exp.amount}`}
                                </td>
                                <td className="expense-cell">{exp.category}</td>
                                <td className="expense-cell">{exp.description}</td>
                                <td className="expense-cell">{new Date(exp.date).toLocaleDateString()}</td>
                                <td className={`expense-cell ${exp.type}`}>{exp.type}</td>
                                <td className="expense-cell">
                                    <button
                                        className="edit-button"
                                        onClick={() => onEdit(exp)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(exp._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ExpenseList;
