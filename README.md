# ERP Dashboard

Modern ERP Dashboard built with Node.js, PostgreSQL, and Chart.js.

## Features

- 📊 Real-time sales and inventory metrics
- 📈 Interactive charts and data visualization
- 🔐 Secure authentication system
- 💼 Sales order management
- 📦 Inventory tracking
- 📱 Responsive design

## Tech Stack

- Frontend:
  - HTML5, CSS3, JavaScript
  - Bootstrap 5
  - Chart.js
  - Font Awesome

- Backend:
  - Node.js
  - Express.js
  - PostgreSQL
  - JSON Web Tokens (JWT)

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- Python 3 (for development server)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/erp-dashboard.git
   cd erp-dashboard
   ```

2. Install dependencies:
   ```bash
   cd sites/erp.test/public/dashboard/api
   npm install
   ```

3. Set up the database:
   ```bash
   psql -U postgres
   \i setup_db.sql
   ```

4. Start the API server:
   ```bash
   cd sites/erp.test/public/dashboard/api
   node server.js
   ```

5. Start the static file server:
   ```bash
   cd sites/erp.test/public/dashboard
   python3 -m http.server 8002
   ```

6. Access the application:
   - Open http://localhost:8002/login.html in your browser
   - Login with default credentials:
     - Username: admin
     - Password: admin123

## Project Structure

```
erp-dashboard/
├── sites/
│   └── erp.test/
│       └── public/
│           └── dashboard/
│               ├── api/           # Backend API
│               ├── css/          # Stylesheets
│               ├── js/           # JavaScript files
│               ├── index.html    # Main dashboard
│               ├── login.html    # Login page
│               └── setup_db.sql  # Database setup
```

## API Endpoints

- `POST /api/login` - User authentication
- `GET /api/sales` - Get sales data
- `GET /api/inventory` - Get inventory data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 