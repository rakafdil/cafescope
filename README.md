# ☕ CafeScope Backend Monorepo

CafeScope adalah platform **Sistem Informasi Geografis (GIS) berbasis komunitas** yang dirancang khusus untuk membantu pengguna menemukan cafe yang "produktif" (cocok untuk bekerja, belajar, atau *meeting*).

Sistem ini memecahkan masalah efisiensi pencarian tempat dengan menyediakan informasi relevan berbasis konteks (seperti ketersediaan colokan, koneksi WiFi, dan tingkat kebisingan) serta memanfaatkan data interaktif secara *real-time* dari kontribusi komunitas.

## 🏗 Arsitektur Sistem

CafeScope Backend dibangun menggunakan arsitektur **Microservices** modern berbasis monorepo:

* **Monorepo Management:** Turborepo & pnpm Workspaces
* **Framework Utama:** NestJS
* **Komunikasi Antar-Service:** *Synchronous Point-to-Point* menggunakan `Transport.TCP` (Tanpa *message broker* eksternal untuk menjaga sistem tetap proporsional dan ringan).
* **Database Pattern:** *Database-per-service* menggunakan PostgreSQL.

### Daftar Microservices

1. **API Gateway (HTTP - Port 3030):** Titik masuk tunggal (entry point) bagi aplikasi *client* (Web/Mobile). Menerima *request* REST API dan me-*routing* permintaan ke *microservices* terkait via TCP.
2. **User Service (TCP - Port 3031):** Mengelola autentikasi, otorisasi, dan manajemen identitas pengguna (Pengguna Umum, Pemilik Cafe, Admin). Terhubung ke **User DB** (PostgreSQL).
3. **Cafe Service (TCP - Port 3032):** Mengelola *master data* cafe, fasilitas, dan jam operasional. Terhubung ke **Cafe DB** (PostgreSQL + **PostGIS** untuk pengolahan data geospasial/koordinat peta).
4. **Discovery Service (TCP - Port 3033):** Menangani logika pencarian dan filter berbasis konteks. Service ini bersifat agregator dan akan meminta data dari *Cafe Service* dan *Community Service*. Tidak memiliki database mandiri.
5. **Community Service (TCP - Port 3034):** Mengelola fitur sosial seperti *check-in*, laporan kondisi *real-time*, dan ulasan pengguna. Terhubung ke **Community DB** (PostgreSQL).
6. **Notification Service (TCP - Port 3035):** Service pendukung yang bertugas mengirimkan pesan (Email / Push Notification) berdasarkan pemicu dari service lain. Tidak memiliki database mandiri.

## 📂 Struktur Direktori

Proyek ini dikelola dalam bentuk *monorepo* untuk memudahkan *sharing code* dan *deployment*. Berikut adalah gambaran arsitektur foldernya:

```text
cafescope/
├── apps/                       # Direktori utama untuk semua service NestJS
│   ├── api-gateway/            # Aplikasi Gateway (Pintu masuk HTTP)
│   ├── cafe-service/           # Microservice untuk kelola data cafe
│   ├── community-service/      # Microservice untuk ulasan & check-in
│   ├── discovery-service/      # Microservice agregator untuk fungsi search
│   ├── notification-service/   # Microservice untuk push notification & email
│   └── user-service/           # Microservice untuk kelola pengguna
├── packages/                   # (Opsional) Tempat menyimpan kode yang dibagikan antar service
│   ├── database/               # (Rekomendasi) Berisi schema Prisma Client agar bisa di-import oleh service
│   └── shared-types/           # (Rekomendasi) Berisi DTO, Interface, atau Enum yang dipakai bersama
├── docker-compose.yml          # Konfigurasi container untuk menjalankan 3 database lokal (PostgreSQL & PostGIS)
├── package.json                # Daftar dependency global dan kumpulan perintah (scripts) Turbo
├── pnpm-workspace.yaml         # Konfigurasi workspace agar pnpm mengenali folder apps/ dan packages/
├── turbo.json                  # Konfigurasi pipeline build & dev dari Turborepo
└── README.md                   # Dokumentasi proyek (file ini)

```

## 🛠 Prasyarat Sistem

Sebelum menjalankan proyek ini, pastikan sistem kamu sudah terinstal perangkat lunak berikut:

1. **Node.js** (v18 atau lebih baru)
2. **pnpm** (Package manager, instal via `npm i -g pnpm`)
3. **Docker & Docker Compose** (Untuk menjalankan ketiga database secara lokal)

## 🚀 Tata Cara Instalasi

Ikuti langkah-langkah berikut untuk menginisialisasi *environment* pengembangan di komputer lokal kamu:

1. **Clone Repositori (Jika belum)**
```bash
git clone <url-repo-cafescope>
cd cafescope
```


2. **Install Dependensi**
Gunakan `pnpm` di direktori *root* untuk menginstal seluruh dependensi aplikasi dan *packages*.
```bash
pnpm install
```


3. **Jalankan Infrastruktur Database (Docker)**
Nyalakan kontainer PostgreSQL dan PostGIS. Perintah ini akan berjalan di *background* (`-d`).
```bash
docker-compose up -d
```


*Catatan: Pastikan port `5432`, `5433`, dan `5434` tidak sedang digunakan oleh aplikasi lain.*

## 🏃‍♂️ Cara Menjalankan Aplikasi

Berkat **Turborepo**, kamu memiliki fleksibilitas untuk menjalankan seluruh *service* sekaligus atau hanya *service* tertentu saja yang sedang kamu kembangkan.

### Opsi 1: Menjalankan SEMUA Service (Disarankan)

Gunakan perintah ini di direktori *root* untuk menyalakan API Gateway dan ke-5 Microservices secara paralel.

```bash
pnpm dev
```

> Turborepo akan mengeksekusi *script* `start:dev` ke seluruh aplikasi yang ada di dalam folder `apps/`.

### Opsi 2: Menjalankan PER Service (Spesifik)

Jika kamu hanya ingin fokus mengembangkan satu *service* tanpa harus menyalakan semuanya (misal komputer sedang berat), kamu bisa memanfaatkan *flag* `--filter` dari pnpm.

Jalankan perintah ini di direktori *root*:

**Menyalakan hanya API Gateway:**

```bash
pnpm --filter api-gateway dev
```

**Menyalakan hanya User Service:**

```bash
pnpm --filter user-service dev
```

*(Ganti `user-service` dengan nama folder aplikasi lain di dalam `apps/` sesuai kebutuhan, seperti `cafe-service`, `discovery-service`, dll).*

## 🌐 Referensi Port & Database

Berikut adalah daftar konfigurasi port lokal agar mudah diakses saat *development*:

| Aplikasi / Service | Tipe Akses | Port Lokal | Terhubung ke DB |
| --- | --- | --- | --- |
| **API Gateway** | HTTP (REST) | `3030` | - |
| **User Service** | TCP (Internal) | `3031` | `user-db` (Port: 5432) |
| **Cafe Service** | TCP (Internal) | `3032` | `cafe-db` (PostGIS - Port: 5433) |
| **Discovery Service** | TCP (Internal) | `3033` | - |
| **Community Service** | TCP (Internal) | `3034` | `community-db` (Port: 5434) |
| **Notification Svc** | TCP (Internal) | `3035` | - |

Untuk menguji apakah Gateway sudah terhubung dengan Microservice secara TCP, jalankan seluruh service (`pnpm dev`) lalu akses *endpoint* test berikut di browser atau Postman:
`GET http://localhost:3030/users/ping`
