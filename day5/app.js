require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import the cors package
const sequelize = require('./config/database');
const importRoutes = require('./routes/import');
const exportRoutes = require('./routes/export');

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(importRoutes);
app.use(exportRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');
        await sequelize.sync();
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});