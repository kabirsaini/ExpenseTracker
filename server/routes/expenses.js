const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/auth'); 

router.use(auth);


router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.userId });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { amount, category, description, date, type } = req.body;

        const newExpense = new Expense({
            amount,
            category,
            description,
            date,
            type, 
            user: req.userId
        });
        if (!['credit', 'expense'].includes(type)) {
            return res.status(400).json({ error: 'Invalid type. Must be "credit" or "expense".' });
        }
        

        const saved = await newExpense.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updated = await Expense.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Expense not found or unauthorized' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Expense.findOneAndDelete({ _id: req.params.id, user: req.userId });
        if (!deleted) return res.status(404).json({ message: 'Expense not found or unauthorized' });
        res.sendStatus(204);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
