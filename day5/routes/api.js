// app.js
const express = require('express');
const sequelize = require('./config/database');
const Transaction = require('./models/transaction');
const importRoutes = require('./routes/import');
const exportRoutes = require('./routes/export');

const app = express();
app.use(express.json());
app.use(importRoutes);
app.use(exportRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    await sequelize.sync();
    console.log(`Server is running on http://localhost:${PORT}`);
});