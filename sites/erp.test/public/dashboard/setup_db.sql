-- Drop database if exists
DROP DATABASE IF EXISTS erp_dashboard;

-- Create database
CREATE DATABASE erp_dashboard;

-- Connect to database
\c erp_dashboard;

-- Enable password encryption
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create users table
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create sales_orders table
DROP TABLE IF EXISTS sales_orders;
CREATE TABLE sales_orders (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(20) UNIQUE NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    order_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create inventory_items table
DROP TABLE IF EXISTS inventory_items;
CREATE TABLE inventory_items (
    id SERIAL PRIMARY KEY,
    item_code VARCHAR(20) UNIQUE NOT NULL,
    item_name VARCHAR(100) NOT NULL,
    item_group VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(15,2) NOT NULL,
    reorder_point INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
INSERT INTO users (username, password, full_name, email)
VALUES (
    'admin',
    crypt('admin123', gen_salt('bf')),
    'Administrator',
    'admin@example.com'
);

-- Insert sample sales data
INSERT INTO sales_orders (order_id, customer_name, order_date, status, amount)
VALUES 
    ('SO-2025-0001', 'PT Maju Jaya', '2025-03-10', 'Completed', 12500000),
    ('SO-2025-0002', 'CV Abadi Sentosa', '2025-03-09', 'To Deliver', 8750000),
    ('SO-2025-0003', 'PT Sejahtera Bersama', '2025-03-08', 'Completed', 15000000),
    ('SO-2025-0004', 'PT Makmur Jaya', '2025-03-07', 'Completed', 9250000),
    ('SO-2025-0005', 'CV Mitra Utama', '2025-03-06', 'To Deliver', 11000000);

-- Insert sample inventory data
INSERT INTO inventory_items (item_code, item_name, item_group, quantity, unit_price, reorder_point)
VALUES 
    ('ITM-001', 'Laptop Dell XPS 13', 'Electronics', 25, 15000000, 5),
    ('ITM-002', 'Printer HP LaserJet', 'Electronics', 15, 3500000, 3),
    ('ITM-003', 'Office Desk', 'Furniture', 30, 2000000, 5),
    ('ITM-004', 'Office Chair', 'Furniture', 50, 1500000, 10),
    ('ITM-005', 'Whiteboard 120x240', 'Office Supplies', 10, 750000, 2),
    ('ITM-006', 'Paper A4 (Box)', 'Office Supplies', 100, 350000, 20); 