# Music Player Website

Website musik player dengan desain minimalist yang bisa memutar lagu Barasuara "Terbuang Dalam Waktu".

## Fitur

- **Halaman Welcome**: Desain minimalist dengan elemen lingkaran oranye
- **Music Player**: Interface pemutar musik yang lengkap dengan:
  - Album art placeholder
  - Informasi lagu (judul dan album)
  - Progress bar yang dinamis
  - Kontrol musik (play/pause, rewind, fast forward, skip)
  - Navigasi dengan panah oranye

## File yang Dibutuhkan

1. **index.html** - Halaman welcome dengan tombol NEXT
2. **style.css** - Styling untuk halaman welcome
3. **music-player.html** - Halaman musik player
4. **music-player.css** - Styling untuk musik player
5. **music-player.js** - JavaScript untuk fungsi musik player
6. **barasuara-terbuang-dalam-waktu.mp3** - File audio lagu (harus ditambahkan manual)

## Cara Penggunaan

1. **Setup Audio**: Letakkan file MP3 lagu Barasuara "Terbuang Dalam Waktu" dengan nama `barasuara-terbuang-dalam-waktu.mp3` di folder yang sama
2. **Buka Website**: Buka `index.html` di browser
3. **Navigasi**: Klik tombol "NEXT" untuk masuk ke halaman musik player
4. **Kontrol Musik**:
   - Klik tombol play (▶) untuk memulai/menghentikan musik
   - Gunakan progress bar untuk seek ke posisi tertentu
   - Tombol rewind (⏪) untuk mundur 10 detik
   - Tombol skip backward (⏮) untuk mundur 1 menit
   - Tombol skip forward (⏭) untuk maju 1 menit
   - Tombol fast forward (⏩) untuk maju 10 detik

## Keyboard Shortcuts

- **Spacebar**: Play/Pause
- **Arrow Left**: Skip backward (1 menit)
- **Arrow Right**: Skip forward (1 menit)
- **Arrow Up**: Volume up
- **Arrow Down**: Volume down

## Responsive Design

Website sudah responsive untuk berbagai ukuran layar:
- Desktop: Layout penuh dengan semua elemen
- Tablet: Penyesuaian ukuran dan spacing
- Mobile: Layout yang dioptimalkan untuk layar kecil

## Teknologi

- HTML5
- CSS3 dengan Flexbox dan Grid
- JavaScript ES6+ dengan Class-based architecture
- HTML5 Audio API untuk pemutaran musik

## Catatan

- Pastikan browser mendukung HTML5 Audio API
- File audio harus dalam format MP3
- Progress bar akan update secara real-time saat musik diputar
- Semua kontrol musik berfungsi penuh dengan visual feedback 