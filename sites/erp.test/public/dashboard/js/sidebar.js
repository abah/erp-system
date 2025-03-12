// Sidebar HTML template
const sidebarTemplate = `
    <div class="sidebar">
        <div class="sidebar-brand">
            <i class="fas fa-building"></i> ERP System
        </div>
        <ul class="sidebar-menu">
            <li>
                <a href="index.html" class="d-flex align-items-center">
                    <i class="fas fa-home"></i>
                    <span>Dashboard</span>
                </a>
            </li>
            <li>
                <a href="#" class="d-flex align-items-center justify-content-between" data-bs-toggle="collapse" data-bs-target="#salesSubmenu">
                    <div>
                        <i class="fas fa-shopping-cart"></i>
                        <span>Sales</span>
                    </div>
                    <i class="fas fa-chevron-down"></i>
                </a>
                <ul class="sidebar-submenu collapse" id="salesSubmenu">
                    <li><a href="sales.html">Sales Orders</a></li>
                    <li><a href="#">Customers</a></li>
                    <li><a href="#">Quotations</a></li>
                </ul>
            </li>
            <li>
                <a href="#" class="d-flex align-items-center justify-content-between" data-bs-toggle="collapse" data-bs-target="#inventorySubmenu">
                    <div>
                        <i class="fas fa-box"></i>
                        <span>Inventory</span>
                    </div>
                    <i class="fas fa-chevron-down"></i>
                </a>
                <ul class="sidebar-submenu collapse" id="inventorySubmenu">
                    <li><a href="inventory.html">Stock Items</a></li>
                    <li><a href="#">Stock Transfers</a></li>
                    <li><a href="#">Stock Adjustments</a></li>
                </ul>
            </li>
            <li>
                <a href="#" class="d-flex align-items-center justify-content-between" data-bs-toggle="collapse" data-bs-target="#purchaseSubmenu">
                    <div>
                        <i class="fas fa-truck"></i>
                        <span>Purchasing</span>
                    </div>
                    <i class="fas fa-chevron-down"></i>
                </a>
                <ul class="sidebar-submenu collapse" id="purchaseSubmenu">
                    <li><a href="#">Purchase Orders</a></li>
                    <li><a href="#">Suppliers</a></li>
                    <li><a href="#">Purchase Returns</a></li>
                </ul>
            </li>
            <li>
                <a href="#" class="d-flex align-items-center justify-content-between" data-bs-toggle="collapse" data-bs-target="#financeSubmenu">
                    <div>
                        <i class="fas fa-money-bill"></i>
                        <span>Finance</span>
                    </div>
                    <i class="fas fa-chevron-down"></i>
                </a>
                <ul class="sidebar-submenu collapse" id="financeSubmenu">
                    <li><a href="#">Accounts</a></li>
                    <li><a href="#">Invoices</a></li>
                    <li><a href="#">Payments</a></li>
                </ul>
            </li>
            <li>
                <a href="analytics.html" class="d-flex align-items-center">
                    <i class="fas fa-chart-bar"></i>
                    <span>Analytics</span>
                </a>
            </li>
            <li>
                <a href="#" class="d-flex align-items-center">
                    <i class="fas fa-cog"></i>
                    <span>Settings</span>
                </a>
            </li>
        </ul>
    </div>
`;

// Initialize sidebar
function initSidebar() {
    // Insert sidebar template
    document.body.insertAdjacentHTML('afterbegin', sidebarTemplate);
    
    // Wrap existing content
    const mainContent = document.createElement('div');
    mainContent.className = 'main-content';
    
    // Move all body content except sidebar into main-content
    const sidebar = document.querySelector('.sidebar');
    while (document.body.firstChild !== sidebar) {
        mainContent.appendChild(document.body.firstChild);
    }
    document.body.appendChild(mainContent);
    
    // Set active menu based on current page
    setActiveMenu();
    
    // Setup event listeners
    setupSidebarListeners();
}

// Set active menu item based on current page
function setActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuItems = document.querySelectorAll('.sidebar-menu a');
    
    menuItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('active');
            
            // If item is in submenu, show parent menu
            const submenu = item.closest('.sidebar-submenu');
            if (submenu) {
                submenu.classList.add('show');
                const parentLink = submenu.previousElementSibling;
                if (parentLink) {
                    parentLink.classList.add('active');
                }
            }
        }
    });
}

// Setup sidebar event listeners
function setupSidebarListeners() {
    // Toggle submenu on click
    document.querySelectorAll('.sidebar-menu a[data-bs-toggle="collapse"]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            if (submenu) {
                submenu.classList.toggle('show');
            }
        });
    });

    // Toggle sidebar on mobile
    const toggleButton = document.querySelector('.navbar-toggler');
    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            document.querySelector('.sidebar').classList.toggle('show');
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    if (sidebarCollapse) {
        sidebarCollapse.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            content.classList.toggle('active');
        });
    }

    // Auto-hide sidebar on mobile when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnToggle = sidebarCollapse.contains(event.target);
        
        if (!isClickInsideSidebar && !isClickOnToggle && window.innerWidth <= 768) {
            sidebar.classList.add('active');
            content.classList.remove('active');
        }
    });

    // Handle active menu items
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuItems = document.querySelectorAll('#sidebar ul li a');
    
    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.parentElement.classList.add('active');
        } else {
            item.parentElement.classList.remove('active');
        }
    });

    // Automatically show content on desktop
    function adjustLayout() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            content.classList.remove('active');
        } else {
            sidebar.classList.add('active');
            content.classList.remove('active');
        }
    }

    // Initial layout adjustment
    adjustLayout();

    // Adjust layout on window resize
    window.addEventListener('resize', adjustLayout);
}); 