const { Transaction } = require('../models');
const csv = require('fast-csv');
const fs = require('fs');
const path = require('path');

exports.importTransactions = async (req, res) => {
  const filePath = req.file.path;
  const transactions = [];

  fs.createReadStream(filePath)
    .pipe(csv.parse({ headers: true }))
    .on('data', row => transactions.push(row))
    .on('end', async () => {
      try {
        await Transaction.bulkCreate(transactions);
        res.status(200).send('Transactions imported successfully');
      } catch (error) {
        res.status(500).send('Error importing transactions');
      }
    });
};

exports.exportTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    const csvStream = csv.format({ headers: true });
    res.setHeader('Content-disposition', 'attachment; filename=transactions.csv');
    res.set('Content-Type', 'text/csv');
    csvStream.pipe(res);
    transactions.forEach(transaction => {
      csvStream.write(transaction.get({ plain: true }));
    });
    csvStream.end();
  } catch (error) {
    res.status(500).send('Error exporting transactions');
  }
};
