const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { importTransactions, exportTransactions } = require('../controllers/importExportController');

const router = express.Router();

router.post('/api/v1/import', upload.single('file'), importTransactions);
router.get('/api/v1/export', exportTransactions);

module.exports = router;
