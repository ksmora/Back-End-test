# Sistem Peminjaman Buku

Sistem ini dibangun menggunakan **Express.js** dan **MongoDB** untuk mengelola peminjaman buku

## Fitur Utama

1. **Peminjaman Buku**:
   - Anggota dapat meminjam maksimal 2 buku.
   - Buku yang dipinjam tidak boleh sedang dipinjam oleh anggota lain.
   - Anggota tidak sedang dalam masa penalti.

2. **Pengembalian Buku**:
   - Buku yang dikembalikan harus merupakan buku yang telah dipinjam oleh anggota tersebut.
   - Jika buku dikembalikan lebih dari 7 hari, anggota akan dikenakan penalti selama 3 hari.

3. **Cek Buku**:
   - Menampilkan semua buku dan jumlah stok yang tersedia.
   - Buku yang sedang dipinjam tidak dihitung dalam stok yang tersedia.

4. **Cek Anggota**:
   - Menampilkan semua anggota yang terdaftar.
   - Menunjukkan jumlah buku yang sedang dipinjam oleh setiap anggota.

## Alur Kerja

- **Peminjaman Buku**:
  1. Anggota memilih buku yang tersedia.
  2. Sistem memeriksa syarat peminjaman.
  3. Buku dapat dipinjam jika semua syarat terpenuhi.

- **Pengembalian Buku**:
  1. Anggota mengembalikan buku yang dipinjam.
  2. Sistem memeriksa apakah buku dipinjam oleh anggota.
  3. Penalti diberikan jika pengembalian melebihi 7 hari.

## Teknologi yang Digunakan

- **Express.js**: Framework backend untuk API.
- **MongoDB**: Database NoSQL untuk menyimpan data.
- **Swagger**: Dokumentasi API.

## Instalasi

1. Clone repository ini.
2. Masuk ke folder Book_API
2. Install dependencies dengan `npm install`.
3. Jalankan server dengan `npm start`. / node server.js

## Penggunaan

- Gunakan Postman atau Swagger UI untuk menguji endpoint API.
- Pastikan MongoDB berjalan sebelum memulai aplikasi.

## Credits
Eigen Dev, @eigen3dev : https://github.com/eigen3dev
