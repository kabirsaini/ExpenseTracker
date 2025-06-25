import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createExpense, updateExpense } from '../api/expenses';
import './style/ExpenseForm.css';

const ExpenseForm = ({ onExpenseAdded, editingExpense, setEditingExpense }) => {
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        description: '',
        date: '',
        type: 'expense'
    });

    useEffect(() => {
        if (editingExpense) {
            setFormData({
                amount: editingExpense.amount,
                category: editingExpense.category,
                description: editingExpense.description || '',
                date: editingExpense.date?.substring(0, 10), 
                type: editingExpense.type
            });
        }
    }, [editingExpense]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingExpense) {
                await updateExpense(editingExpense._id, formData);
                toast.success("Entry updated successfully!", { position: "top-center", autoClose: 2000 });
                setEditingExpense(null); 
            } else {
                await createExpense(formData);
                toast.success("Entry added successfully!", { position: "top-center", autoClose: 2000 });
            }

            setFormData({
                amount: '',
                category: '',
                description: '',
                date: '',
                type: 'expense'
            });

            if (onExpenseAdded) onExpenseAdded();
        } catch (error) {
            toast.error("Failed to submit entry!", { position: "top-center", autoClose: 2000 });
        }
    };

    return (
        <>
            <h2 className="form-heading">
                {editingExpense ? 'Update your record' : 'What do we need to record today?'}
            </h2>
            <form className="expense-form" onSubmit={handleSubmit}>
                <select
                    name="type"
                    className="expense-input type-select"
                    value={formData.type}
                    onChange={handleChange}
                    required
                >
                    <option value="expense">Expense</option>
                    <option value="credit">Credit</option>
                </select>

                <input
                    type="number"
                    name="amount"
                    className="expense-input amount-input"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />
                <select
                    name="category"
                    className="expense-input category-select"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">-- Select Category --</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Rent">Rent</option>
                    <option value="Food">Food</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Other">Other</option>
                </select>
                <input
                    type="text"
                    name="description"
                    className="expense-input description-input"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="date"
                    className="expense-input date-input"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="submit-button">
                    {editingExpense ? 'Update Entry' : 'Add Entry'}
                </button>
            </form>
        </>
    );
};

export default ExpenseForm;
