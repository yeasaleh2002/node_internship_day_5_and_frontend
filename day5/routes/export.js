// routes/export.js
const express = require('express');
const Transaction = require('../models/transaction');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const router = express.Router();

router.get('/api/v1/export', async (req, res) => {
    const transactions = await Transaction.findAll();
    const csvWriter = createCsvWriter({
        path: 'transactions.csv',
        header: [
            { id: 'id', title: 'ID' },
            { id: 'order_id', title: 'Order ID' },
            { id: 'user_id', title: 'User ID' },
            { id: 'shipping_dock_id', title: 'Shipping Dock ID' },
            { id: 'amount', title: 'Amount' },
            { id: 'discount', title: 'Discount' },
            { id: 'tax', title: 'Tax' },
            { id: 'total', title: 'Total' },
            { id: 'notes', title: 'Notes' },
            { id: 'status', title: 'Status' }
        ]
    });

    await csvWriter.writeRecords(transactions);
    res.download('transactions.csv');
});

module.exports = router;