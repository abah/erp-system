const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database configuration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'erp_dashboard',
    password: 'postgres',
    port: 5432,
});

// Test database connection
pool.connect((err, client, done) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Successfully connected to the database');
        done();
    }
});

// Login route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query(
            'SELECT id, username, full_name, email FROM users WHERE username = $1 AND password = crypt($2, password)',
            [username, password]
        );
        
        if (result.rows.length > 0) {
            res.json({ success: true, user: result.rows[0] });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Get sales data
app.get('/api/sales', async (req, res) => {
    try {
        // Get total sales
        const totalSales = await pool.query(
            'SELECT COUNT(*) as total_orders, SUM(amount) as total_amount FROM sales_orders'
        );
        
        // Get monthly sales
        const monthlySales = await pool.query(
            'SELECT EXTRACT(MONTH FROM order_date) as month, SUM(amount) as amount ' +
            'FROM sales_orders ' +
            'GROUP BY EXTRACT(MONTH FROM order_date) ' +
            'ORDER BY month'
        );

        res.json({
            success: true,
            data: {
                total_orders: parseInt(totalSales.rows[0].total_orders),
                total_amount: parseFloat(totalSales.rows[0].total_amount) || 0,
                monthly_sales: monthlySales.rows.map(row => ({
                    month: parseInt(row.month),
                    amount: parseFloat(row.amount) || 0
                }))
            }
        });
    } catch (err) {
        console.error('Error fetching sales data:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Get inventory data
app.get('/api/inventory', async (req, res) => {
    try {
        // Get inventory summary
        const summary = await pool.query(
            'SELECT COUNT(*) as total_items, ' +
            'SUM(CASE WHEN quantity <= reorder_point THEN 1 ELSE 0 END) as low_stock_items, ' +
            'SUM(quantity * unit_price) as total_value ' +
            'FROM inventory_items'
        );
        
        // Get items by group
        const byGroup = await pool.query(
            'SELECT item_group, COUNT(*) as item_count, SUM(quantity) as total_quantity ' +
            'FROM inventory_items ' +
            'GROUP BY item_group'
        );

        res.json({
            success: true,
            data: {
                summary: {
                    total_items: parseInt(summary.rows[0].total_items),
                    low_stock_items: parseInt(summary.rows[0].low_stock_items),
                    total_value: parseFloat(summary.rows[0].total_value) || 0
                },
                by_group: byGroup.rows.map(row => ({
                    item_group: row.item_group,
                    item_count: parseInt(row.item_count),
                    total_quantity: parseInt(row.total_quantity)
                }))
            }
        });
    } catch (err) {
        console.error('Error fetching inventory data:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 