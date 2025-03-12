# ERP Dashboard

Dashboard ERP sederhana dengan integrasi PostgreSQL untuk manajemen data perusahaan.

## Fitur

- Login dan autentikasi pengguna
- Dashboard Sales Overview dengan grafik dan metrik
- Dashboard Inventory Overview dengan grafik dan metrik
- Tabel Recent Sales Orders
- Filter berdasarkan rentang tanggal
- Integrasi dengan database PostgreSQL

## Cara Menggunakan

### Prasyarat

- PostgreSQL 14 atau lebih baru
- Web browser modern (Chrome, Firefox, Safari, Edge)

### Setup Database

1. Pastikan PostgreSQL sudah terinstal dan berjalan
2. Buat database baru dengan nama `erp_dashboard`:
   ```
   createdb erp_dashboard
   ```
3. Import skema dan data sampel:
   ```
   psql erp_dashboard -f setup_db.sql
   ```

### Menjalankan Dashboard

1. Buka file `login.html` di browser
2. Login dengan kredensial berikut:
   - Username: `admin`
   - Password: `admin123`
3. Setelah login, Anda akan diarahkan ke dashboard utama

## Struktur Database

### Tabel Users

Menyimpan data pengguna untuk autentikasi.

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    full_name VARCHAR(100),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabel Sales Orders

Menyimpan data pesanan penjualan.

```sql
CREATE TABLE sales_orders (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(20) UNIQUE NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    order_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabel Inventory Items

Menyimpan data item inventori.

```sql
CREATE TABLE inventory_items (
    id SERIAL PRIMARY KEY,
    item_code VARCHAR(20) UNIQUE NOT NULL,
    item_name VARCHAR(100) NOT NULL,
    item_group VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(15, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Pengembangan Selanjutnya

Untuk pengembangan selanjutnya, Anda dapat:

1. Mengimplementasikan API backend yang sebenarnya untuk menghubungkan dashboard dengan database PostgreSQL
2. Menambahkan fitur CRUD untuk mengelola data
3. Menambahkan fitur laporan dan ekspor data
4. Mengimplementasikan sistem notifikasi
5. Menambahkan fitur manajemen pengguna dengan level akses berbeda

## Catatan

Dashboard ini dibuat sebagai solusi sementara karena adanya masalah dengan database MariaDB di Frappe. Untuk implementasi produksi, disarankan untuk mengintegrasikan dashboard ini dengan Frappe framework secara penuh. 