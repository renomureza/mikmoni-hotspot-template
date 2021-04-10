# Ramadhan | Mikmoni Template Login Hotspot

<p align="center">
<img src="https://raw.githubusercontent.com/renomureza/mikmoni-hotspot-template/master/ramadhan.png" />
</p>

Template login hotspot RouterOS ini dirancang untuk pelanggan mikmoni, meskipun demikian pengguna umum juga bisa menggunakan template ini, namun mungkin perlu beberapa penyesuaian.

Template ini juga dibuat agar lebih mudah diatur oleh pengguna awam, pengguna hanya perlu mengubah beberapa nilai untuk menyesuaikan halaman login.

## Konfigurasi

Buka file `config.js` di folder `js`, ubah sesuai kebutuhan.

### Mengaktifkan/Menonaktifkan Metode Login

Untuk mengaktifkan metode login, ubah bagian metode login di dalam blok `loginMethod` menjadi `true`, untuk menonaktifkan ubah menjadi `false`.

Untuk menentukan default metode login, dimana ketika pengguna membuka halaman login dan metode ini yang akan ditampil terlebih dahulu, ubah bagian `default` ke metode yang diinginkan (`member`, `voucher`, `qrCode`) pasti metode tersebut disetel ke `true`.

Contoh di bawah ini akan mengaktifkan metode login Member dan Voucher, QR Code dimatikan, sementara metode login defaultnya disetel menggunakan voucher.

```javascript
//...
loginMethod: {
  member: true,
  voucher: true,
  qrCode: false,
  default: "voucher", // member, voucher, qrCode
}
//...
```

### QR Code Scanner

Jika Anda mengaktifkan metode login `qrCode` masukkan URL tempat pengguna memindai QR Code voucher, jika tidak abaikan.

```javascript
 // ...
  qrCodeScannerURL: "https://mikmoni.com/qrcode-scanner",
 // ..
```

Pengguna tentunya harus bisa mengunjungi URL/domain tersebut meskipun mereka belum login, oleh karena itu silahkan buka Terminal di Winbox kemudian copy paste kode di bawah kemudian enter.

```
/ip hotspot walled-garden ip add action=accept comment="Mikmoni" disabled=no dst-host=mikmoni.com
```

**Apa Artinya Perintah di Atas?**

Pengguna hotspot termasuk yang tidak login akan bisa mengakses situs yang ditujukan pada nilai `dst-host` dalam hal ini `mikmoni.com` termasuk subdomainnya.

Selain bisa dimanfaatkan untuk tujuan pemindaian QR Code, fitur ini juga bisa berguna jika Anda ingin menyematkan video/audio berukuran besar untuk menghiasi halaman login, alih-alih menyimpannya di penyimpanan RouterOS yang dapat mempersempit ruang penyimpanan, Anda bisa menyematkan video/audio ke halaman login melalui URL.

**Aktifkan HTTP PAP**

Agar metode login melalui QR Code ini dapat berjalan dengan baik kita perlu mengaktifkan HTTP PAP di RouterOS.

1. Buka **Winbox**
2. **IP**
3. **Hotspot**
4. **Server Profile**
5. _pilih server profile yang digunakan_
6. **Login**
7. ✔ **HTTP PAP**

### Mengaktifkan Pemeriksa Expired Voucher

Secara default beberapa informasi yang ditampilkan pada halaman status dihitung dalam satu sesi, misalnya nilai Uptime, ketika pengguna keluar itu akan dihitung mulai dari awal lagi.

Oleh karena itu mikmoni menyediakan route/URL khusus untuk memeriksa informasi voucher tanpa batas sesi termasuk masa aktif (expired), URL ini bisa kita dapat melalui halaman dashboard daftar Router.

URL ini akan mengembalikan data pengguna hotspot dalam format JSON:

```json
{
  "data": {
    ".id": "*5",
    "server": "hotspot1",
    "name": "OD32N",
    "password": "5DQMQ",
    "mac-address": "XX:XX:XX:XX:XX:XX",
    "profile": "1Hari",
    "uptime": "22s",
    "bytes-in": "23937",
    "bytes-out": "24147",
    "packets-in": "186",
    "packets-out": "156",
    "dynamic": "false",
    "disabled": "false",
    "comment": "apr/04/2021 20:25:02"
  }
}
```

Di template ini kita hanya menggunakan masa aktif voucher yang diambil dari nilai comment, namun Anda bisa memanfaatkan data yang dikembalikan untuk menampilkan data yang lain di halaman status jika dibutuhkan.

Mari kita lihat pada file `config.js`:

```javascript
//...
expiredChecker: {
  active: false,
  URL: "https://example.com/v1/expired",
  token: "69ee773d4xxxxxxxx:00628cdxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
}
//...
```

Jika Anda tidak memerlukan fitur ini, atur nilai `active` menjadi `false` dan abaikan bagian yang lain. Namun jika Anda ingin mengaktifkan fitur ini, atur nilainya menjadi `true`.

Ubah nilai `URL` dan `token` dengan nilai yang digenerate dari halaman daftar Router.

Sama seperti QR Code Scanner, Ini juga memerlukan konfigurasi Walled Garden karena nantinya pengguna akan mengirim permintaan ke luar. Jika Anda sebelumnya sudah menjalankan perintah di bawah di Terminal Winbox tidak perlu lagi menjalankan perintah ini, kalau belum silahkan salin dan tempelkan.

Perintahnya sama seperti QR Code Scanner, biar Anda tidak perlu scroll saya sisipkan lagi:

```
/ip hotspot walled-garden ip add action=accept comment="Mikmoni" disabled=no dst-host=mikmoni.com
```

### Atur Lokasi untuk Menghitung Waktu Sholat/Imsak

Nilai `latitude` dan `longtitude` atur sesuai dengan lokasi Anda saat ini, cari di sini: [https://github.com/benangmerah/wilayah/blob/master/datasources/daftar-nama-daerah.csv](https://github.com/benangmerah/wilayah/blob/master/datasources/daftar-nama-daerah.csv)

Jika tidak diubah, default-nya akan menggunakan Provinsi DKI Jakarta.

```javascript
// ...
prayTime: {
    latitude: -6.211544,
    longtitude: 106.845172,
}
//....
```
