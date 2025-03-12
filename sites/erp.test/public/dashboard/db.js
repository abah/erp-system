// Database Connection Module for ERP Dashboard
// Note: This is a client-side implementation that uses a simple API approach
// In a real-world scenario, you would implement a proper backend API

const API_BASE_URL = 'http://localhost:3000/api';

const db = {
    // Login function
    async login(username, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem('user', JSON.stringify(data.user));
                return { success: true, user: data.user };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Network error' };
        }
    },

    // Get sales data
    async getSalesData() {
        try {
            const response = await fetch(`${API_BASE_URL}/sales`);
            const data = await response.json();
            
            if (data.success) {
                return {
                    totalSales: data.data.total_amount,
                    totalOrders: data.data.total_orders,
                    averageOrderValue: data.data.total_amount / data.data.total_orders,
                    monthlySales: data.data.monthly_sales.map(item => ({
                        month: item.month,
                        amount: item.amount
                    }))
                };
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error fetching sales data:', error);
            throw error;
        }
    },

    // Get inventory data
    async getInventoryData() {
        try {
            const response = await fetch(`${API_BASE_URL}/inventory`);
            const data = await response.json();
            
            if (data.success) {
                return {
                    totalItems: data.data.summary.total_items,
                    lowStockItems: data.data.summary.low_stock_items,
                    inventoryValue: data.data.summary.total_value,
                    itemsByGroup: data.data.by_group.map(item => ({
                        group: item.item_group,
                        quantity: item.total_quantity
                    }))
                };
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error fetching inventory data:', error);
            throw error;
        }
    },

    // Check if user is logged in
    isLoggedIn() {
        return localStorage.getItem('user') !== null;
    },

    // Get current user
    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    // Logout function
    logout() {
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    }
};

// Make db object available globally
window.db = db; 