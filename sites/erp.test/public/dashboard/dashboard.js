// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Dashboard initialized');
    
    // Check login status
    if (!db.isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }

    // Set username from localStorage
    const user = db.getCurrentUser();
    if (user) {
        const usernameElement = document.getElementById('username');
        if (usernameElement) {
            usernameElement.textContent = user.username;
        }
    }

    // Setup logout button
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            db.logout();
        });
    }

    // Setup date range filter
    const dateRange = document.getElementById('date-range');
    if (dateRange) {
        dateRange.addEventListener('change', function() {
            updateDashboard();
        });
    }

    // Initialize chart variables
    window.salesChart = null;
    window.inventoryChart = null;

    // Initial dashboard update
    updateDashboard();
});

// Function to update dashboard data
async function updateDashboard() {
    try {
        // Get metric elements
        const totalSalesElement = document.querySelector('.row.mb-4 .col-md-4:nth-child(1) .metric-value');
        const totalOrdersElement = document.querySelector('.row.mb-4 .col-md-4:nth-child(2) .metric-value');
        const avgOrderValueElement = document.querySelector('.row.mb-4 .col-md-4:nth-child(3) .metric-value');

        // Show loading state
        [totalSalesElement, totalOrdersElement, avgOrderValueElement].forEach(el => {
            if (el) el.textContent = 'Loading...';
        });
        
        // Fetch data from API
        const salesData = await db.getSalesData();
        const inventoryData = await db.getInventoryData();
        
        if (salesData && inventoryData) {
            // Update sales metrics
            if (totalSalesElement) {
                totalSalesElement.textContent = formatCurrency(salesData.totalSales);
            }
            if (totalOrdersElement) {
                totalOrdersElement.textContent = salesData.totalOrders.toString();
            }
            if (avgOrderValueElement) {
                avgOrderValueElement.textContent = formatCurrency(salesData.averageOrderValue);
            }
            
            // Update charts
            updateSalesChart(salesData.monthlySales);
            updateInventoryChart(inventoryData.itemsByGroup);
        }
    } catch (error) {
        console.error('Error updating dashboard:', error);
        alert('Error updating dashboard. Please try again.');
    }
}

// Function to update sales chart
function updateSalesChart(salesData) {
    const ctx = document.getElementById('salesChart');
    if (!ctx) {
        console.error('Sales chart canvas not found');
        return;
    }
    
    if (window.salesChart instanceof Chart) {
        window.salesChart.destroy();
    }
    
    window.salesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: salesData.map(item => getMonthName(item.month)),
            datasets: [{
                label: 'Sales Amount',
                data: salesData.map(item => item.amount),
                backgroundColor: '#4a6cf7',
                borderColor: '#4a6cf7',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => formatCurrency(value)
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: context => formatCurrency(context.raw)
                    }
                }
            }
        }
    });
}

// Function to update inventory chart
function updateInventoryChart(inventoryData) {
    const ctx = document.getElementById('inventoryChart');
    if (!ctx) {
        console.error('Inventory chart canvas not found');
        return;
    }
    
    if (window.inventoryChart instanceof Chart) {
        window.inventoryChart.destroy();
    }
    
    window.inventoryChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: inventoryData.map(item => item.group),
            datasets: [{
                data: inventoryData.map(item => item.quantity),
                backgroundColor: [
                    '#4a6cf7',
                    '#28a745',
                    '#fd7e14',
                    '#dc3545',
                    '#6f42c1'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                tooltip: {
                    callbacks: {
                        label: context => {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${context.label}: ${value} items (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Helper function to format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

// Helper function to get month name
function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('en-US', { month: 'short' });
} 