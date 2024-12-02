const express = require('express');
const multer = require('multer');
const Transaction = require('../models/transaction');
const csv = require('csv-parser');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/api/v1/import', upload.single('file'), async (req, res) => {
    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                await Transaction.bulkCreate(results);
                res.status(200).send('Data imported successfully');
            } catch (error) {
                res.status(500).send('Error importing data: ' + error.message);
            } finally {
                fs.unlinkSync(req.file.path); // Clean up the uploaded file
            }
        });
});

module.exports = router;