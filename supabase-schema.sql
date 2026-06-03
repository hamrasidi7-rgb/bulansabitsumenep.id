-- ============================================================
-- SUPABASE SCHEMA — bulansabitsumenep.id
-- Portal Kesehatan & Kemanusiaan PMI Kabupaten Sumenep
-- Jalankan file ini di: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ============================================================
-- 1. TABEL: admin_users
-- ============================================================
CREATE TABLE IF NOT EXISTS public.admin_users (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL UNIQUE,
  nama        TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('super_admin', 'editor', 'journalist', 'volunteer_coordinator')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin users: baca data sendiri"
  ON public.admin_users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admin users: super admin bisa baca semua"
  ON public.admin_users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );


-- ============================================================
-- 2. TABEL: statistik (1 baris)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.statistik (
  id                      SERIAL PRIMARY KEY,
  kantong_darah_tersedia  INTEGER NOT NULL DEFAULT 0,
  pendonor_bulan_ini      INTEGER NOT NULL DEFAULT 0,
  total_artikel           INTEGER NOT NULL DEFAULT 0,
  total_dokter            INTEGER NOT NULL DEFAULT 0,
  relawan_aktif           INTEGER NOT NULL DEFAULT 0,
  updated_at              TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.statistik ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Statistik: publik bisa baca"
  ON public.statistik FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Statistik: admin bisa ubah"
  ON public.statistik FOR ALL
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));


-- ============================================================
-- 3. TABEL: stok_darah
-- ============================================================
CREATE TABLE IF NOT EXISTS public.stok_darah (
  id              SERIAL PRIMARY KEY,
  golongan        TEXT NOT NULL UNIQUE CHECK (golongan IN ('A', 'B', 'AB', 'O')),
  jumlah_kantong  INTEGER NOT NULL DEFAULT 0,
  status          TEXT NOT NULL DEFAULT 'Normal' CHECK (status IN ('Normal', 'Menipis', 'Prioritas')),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.stok_darah ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Stok darah: publik bisa baca"
  ON public.stok_darah FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Stok darah: admin bisa ubah"
  ON public.stok_darah FOR ALL
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));


-- ============================================================
-- 4. TABEL: kontributor
-- ============================================================
CREATE TABLE IF NOT EXISTS public.kontributor (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nama             TEXT NOT NULL,
  inisial          TEXT NOT NULL,
  gelar            TEXT,
  spesialisasi     TEXT[] DEFAULT '{}',
  instansi         TEXT,
  peran            TEXT NOT NULL CHECK (peran IN ('Dokter Spesialis', 'Dokter Umum', 'Perawat', 'Bidan', 'Psikolog', 'Ahli Gizi', 'Apoteker')),
  jumlah_artikel   INTEGER DEFAULT 0,
  rating           NUMERIC(3,1) DEFAULT 5.0,
  foto_url         TEXT,
  warna_avatar     TEXT DEFAULT 'from-red-500 to-red-700',
  terverifikasi    BOOLEAN DEFAULT true,
  urutan           INTEGER DEFAULT 0,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.kontributor ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kontributor: publik bisa baca"
  ON public.kontributor FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Kontributor: admin bisa ubah"
  ON public.kontributor FOR ALL
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));


-- ============================================================
-- 5. TABEL: jadwal_donor
-- ============================================================
CREATE TABLE IF NOT EXISTS public.jadwal_donor (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  judul           TEXT NOT NULL,
  penyelenggara   TEXT,
  lokasi          TEXT NOT NULL,
  alamat          TEXT,
  tanggal         DATE NOT NULL,
  waktu_mulai     TIME NOT NULL,
  waktu_selesai   TIME NOT NULL,
  total_slot      INTEGER NOT NULL DEFAULT 50,
  terdaftar       INTEGER NOT NULL DEFAULT 0,
  mendesak        BOOLEAN DEFAULT false,
  status          TEXT NOT NULL DEFAULT 'aktif' CHECK (status IN ('aktif', 'selesai', 'dibatalkan')),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.jadwal_donor ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Jadwal donor: publik bisa baca"
  ON public.jadwal_donor FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Jadwal donor: admin bisa ubah"
  ON public.jadwal_donor FOR ALL
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));


-- ============================================================
-- 6. TABEL: berita
-- ============================================================
CREATE TABLE IF NOT EXISTS public.berita (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  judul           TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  kategori        TEXT NOT NULL DEFAULT 'Umum',
  ringkasan       TEXT,
  konten          TEXT,
  gambar_url      TEXT,
  gambar_caption  TEXT,
  gambar_kredit   TEXT,
  penulis         TEXT DEFAULT 'Redaksi PMI Sumenep',
  tanggal_terbit  DATE NOT NULL DEFAULT CURRENT_DATE,
  status          TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'publish')),
  trending        BOOLEAN DEFAULT false,
  terverifikasi   BOOLEAN DEFAULT true,
  waktu_baca      INTEGER DEFAULT 3,
  kanal_sebaran   TEXT[] DEFAULT '{}',
  link_facebook   TEXT,
  link_instagram  TEXT,
  link_x          TEXT,
  link_tiktok     TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_berita_status  ON public.berita(status);
CREATE INDEX idx_berita_slug    ON public.berita(slug);
CREATE INDEX idx_berita_tanggal ON public.berita(tanggal_terbit DESC);

ALTER TABLE public.berita ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Berita: publik hanya baca yang publish"
  ON public.berita FOR SELECT TO anon, authenticated
  USING (status = 'publish');

CREATE POLICY "Berita: admin bisa baca semua"
  ON public.berita FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

CREATE POLICY "Berita: admin bisa ubah"
  ON public.berita FOR INSERT, UPDATE, DELETE
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));


-- ============================================================
-- 7. TABEL: aksi_kemanusiaan
-- ============================================================
CREATE TABLE IF NOT EXISTS public.aksi_kemanusiaan (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  judul           TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  kategori        TEXT NOT NULL DEFAULT 'Kegiatan PMI',
  ringkasan       TEXT,
  konten          TEXT,
  gambar_url      TEXT,
  gambar_caption  TEXT,
  gambar_kredit   TEXT,
  lokasi          TEXT,
  tanggal         DATE NOT NULL DEFAULT CURRENT_DATE,
  dampak_label    TEXT,
  kanal_sebaran   TEXT[] DEFAULT '{}',
  link_facebook   TEXT,
  link_instagram  TEXT,
  link_x          TEXT,
  link_tiktok     TEXT,
  status          TEXT NOT NULL DEFAULT 'publish' CHECK (status IN ('draft', 'publish')),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_aksi_status  ON public.aksi_kemanusiaan(status);
CREATE INDEX idx_aksi_slug    ON public.aksi_kemanusiaan(slug);
CREATE INDEX idx_aksi_tanggal ON public.aksi_kemanusiaan(tanggal DESC);

ALTER TABLE public.aksi_kemanusiaan ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Aksi: publik hanya baca yang publish"
  ON public.aksi_kemanusiaan FOR SELECT TO anon, authenticated
  USING (status = 'publish');

CREATE POLICY "Aksi: admin bisa baca semua"
  ON public.aksi_kemanusiaan FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

CREATE POLICY "Aksi: admin bisa ubah"
  ON public.aksi_kemanusiaan FOR INSERT, UPDATE, DELETE
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));


-- ============================================================
-- AUTO-UPDATE updated_at trigger
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_berita_updated_at
  BEFORE UPDATE ON public.berita
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_aksi_updated_at
  BEFORE UPDATE ON public.aksi_kemanusiaan
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================
-- SEED DATA
-- ============================================================

-- Statistik awal
INSERT INTO public.statistik
  (kantong_darah_tersedia, pendonor_bulan_ini, total_artikel, total_dokter, relawan_aktif)
VALUES
  (342, 128, 287, 64, 513)
ON CONFLICT DO NOTHING;

-- Stok darah awal
INSERT INTO public.stok_darah (golongan, jumlah_kantong, status) VALUES
  ('A',  87,  'Normal'),
  ('B',  23,  'Menipis'),
  ('AB',  8,  'Prioritas'),
  ('O',  112, 'Normal')
ON CONFLICT (golongan) DO NOTHING;

-- Kontributor
INSERT INTO public.kontributor (nama, inisial, gelar, spesialisasi, instansi, peran, jumlah_artikel, rating, warna_avatar) VALUES
  ('dr. Fatima Zahra',    'FZ', 'Sp.A',  ARRAY['Tumbuh Kembang','Imunisasi','Gizi Anak'],       'RSUD dr. H. Moh. Anwar Sumenep',    'Dokter Spesialis', 24, 4.9, 'from-blue-500 to-blue-700'),
  ('dr. Budi Santoso',    'BS', NULL,    ARRAY['Penyakit Dalam','Kesehatan Umum','Hipertensi'],  'Puskesmas Sumenep Kota',             'Dokter Umum',      18, 4.8, 'from-green-500 to-green-700'),
  ('dr. Siti Aminah',     'SA', 'Sp.OG', ARRAY['Kehamilan','Persalinan','Kesehatan Reproduksi'],'RSUD dr. H. Moh. Anwar Sumenep',    'Dokter Spesialis', 31, 4.9, 'from-rose-500 to-rose-700'),
  ('Ns. Rina Fitriana',   'RF', 'S.Kep', ARRAY['Keperawatan','Kesehatan Komunitas','P3K'],      'Puskesmas Kalianget',                'Perawat',          12, 4.7, 'from-teal-500 to-teal-700'),
  ('Psikolog Dewi Lestari','DL','M.Psi', ARRAY['Kesehatan Mental','Depresi','Kecemasan'],       'Klinik Kesehatan Mental Sumenep',    'Psikolog',         15, 4.8, 'from-purple-500 to-purple-700'),
  ('dr. Agus Prasetyo',   'AP', 'Sp.JP', ARRAY['Jantung','Pembuluh Darah','Hipertensi'],        'RSUD dr. H. Moh. Anwar Sumenep',    'Dokter Spesialis', 20, 5.0, 'from-red-500 to-red-700');

-- Jadwal Donor
INSERT INTO public.jadwal_donor (judul, penyelenggara, lokasi, alamat, tanggal, waktu_mulai, waktu_selesai, total_slot, terdaftar, mendesak) VALUES
  ('Donor Darah RSUD Moh. Anwar',   'PMI Sumenep & RSUD',   'RSUD dr. H. Moh. Anwar',  'Jl. Jend. Sudirman No. 1, Sumenep', '2025-06-08', '08:00', '12:00', 50,  38, false),
  ('Gebyar Donor Darah Komunitas',  'PMI Sumenep',           'Alun-alun Sumenep',        'Jl. Trunojoyo, Sumenep',            '2025-06-15', '07:30', '11:30', 150, 67, true),
  ('Donor Darah Puskesmas Kalianget','PMI & Puskesmas',      'Puskesmas Kalianget',      'Jl. Raya Kalianget, Sumenep',       '2025-06-18', '09:00', '13:00', 30,  12, false),
  ('Donor Darah Mahasiswa UNIBA',   'PMI & UNIBA',           'Universitas Bakti Indonesia','Jl. Raya Bata-bata, Sumenep',     '2025-06-26', '08:00', '12:00', 80,  45, false);

-- Berita
INSERT INTO public.berita (judul, slug, kategori, ringkasan, gambar_url, penulis, tanggal_terbit, status, trending, waktu_baca, kanal_sebaran) VALUES
  (
    'PMI Sumenep Luncurkan Platform Digital Donor Darah untuk Masyarakat',
    'pmi-sumenep-luncurkan-platform-digital-donor-darah',
    'PMI & Kemanusiaan',
    'PMI Kabupaten Sumenep resmi meluncurkan platform digital untuk memudahkan proses pendaftaran donor darah dan pemantauan stok darah secara real-time.',
    'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&h=500&fit=crop',
    'Redaksi PMI Sumenep',
    '2025-06-03',
    'publish',
    true,
    3,
    ARRAY['Facebook','Instagram','WhatsApp']
  ),
  (
    'Kasus DBD di Sumenep Turun 40% Berkat Program Jumantik Terpadu',
    'kasus-dbd-sumenep-turun-40-persen',
    'Kesehatan Masyarakat',
    'Dinas Kesehatan Sumenep mencatat penurunan signifikan kasus demam berdarah dengue berkat kolaborasi program Juru Pemantau Jentik lintas sektor.',
    'https://images.unsplash.com/photo-1584118624012-df056829fbd0?w=800&h=500&fit=crop',
    'Redaksi PMI Sumenep',
    '2025-06-01',
    'publish',
    true,
    4,
    ARRAY['Facebook','Instagram']
  ),
  (
    'RSUD Sumenep Buka Layanan Klinik Gizi Terpadu Gratis untuk Balita',
    'rsud-sumenep-klinik-gizi-gratis-balita',
    'Rumah Sakit',
    'RSUD dr. H. Moh. Anwar Sumenep membuka layanan klinik gizi terpadu yang dapat diakses gratis oleh balita dari keluarga kurang mampu.',
    'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=500&fit=crop',
    'Redaksi PMI Sumenep',
    '2025-05-29',
    'publish',
    false,
    3,
    ARRAY['Facebook']
  ),
  (
    'Program Skrining Hipertensi Gratis di 27 Puskesmas se-Kabupaten Sumenep',
    'skrining-hipertensi-gratis-27-puskesmas-sumenep',
    'Puskesmas',
    'Dinas Kesehatan Sumenep meluncurkan program skrining hipertensi gratis yang menjangkau 27 puskesmas seluruh kecamatan.',
    'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=500&fit=crop',
    'Redaksi PMI Sumenep',
    '2025-05-27',
    'publish',
    false,
    5,
    ARRAY['Facebook','WhatsApp']
  );

-- Aksi Kemanusiaan
INSERT INTO public.aksi_kemanusiaan (judul, slug, kategori, ringkasan, gambar_url, lokasi, tanggal, dampak_label, status, kanal_sebaran) VALUES
  (
    '1.200 Kantong Darah Terkumpul dalam Gebyar Donor Darah Ramadan',
    'gebyar-donor-darah-ramadan-2025',
    'Donor Darah',
    'PMI Sumenep berhasil mengumpulkan 1.200 kantong darah dalam kegiatan donor darah massal bulan Ramadan yang melibatkan komunitas, instansi, dan pesantren se-Sumenep.',
    'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&h=500&fit=crop',
    'Gedung PMI Sumenep',
    '2025-05-28',
    '1.200 kantong · 400+ peserta',
    'publish',
    ARRAY['Facebook','Instagram','WhatsApp']
  ),
  (
    'Respon Cepat PMI Pasca Banjir di Kecamatan Rubaru',
    'respon-banjir-rubaru-2025',
    'Bantuan Bencana',
    'Tim relawan PMI Sumenep bergerak cepat memberikan bantuan logistik, evakuasi, dan layanan kesehatan darurat kepada 450 keluarga terdampak banjir di Rubaru.',
    'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=500&fit=crop',
    'Kecamatan Rubaru, Sumenep',
    '2025-05-20',
    '450 keluarga terbantu · 60 relawan',
    'publish',
    ARRAY['Facebook','Instagram']
  ),
  (
    'Pelatihan P3K dan Disaster Management untuk 200 Relawan Baru',
    'pelatihan-p3k-relawan-baru-2025',
    'Kegiatan Relawan',
    'PMI Sumenep meluluskan 200 relawan baru yang telah mengikuti pelatihan pertolongan pertama dan manajemen bencana selama 3 hari penuh.',
    'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=500&fit=crop',
    'Markas PMI Sumenep',
    '2025-05-15',
    '200 relawan lulus · 3 hari pelatihan',
    'publish',
    ARRAY['Facebook','Instagram','WhatsApp']
  ),
  (
    'Layanan Ambulans Gratis: 340 Perjalanan dalam Satu Tahun',
    'ambulans-gratis-340-perjalanan-2025',
    'Ambulans Sosial',
    'Program ambulans sosial PMI Sumenep telah membantu 340 pasien kurang mampu mendapatkan akses layanan kesehatan tanpa biaya transportasi.',
    'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=500&fit=crop',
    'Seluruh Kabupaten Sumenep',
    '2025-05-10',
    '340 pasien terbantu gratis',
    'publish',
    ARRAY['Facebook','WhatsApp']
  );


-- ============================================================
-- STORAGE BUCKET
-- Jalankan ini TERPISAH di Supabase Dashboard → Storage
-- (atau lewat SQL di bawah)
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Policy storage: publik bisa baca
CREATE POLICY "Storage media: publik bisa baca"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'media');

-- Policy storage: admin bisa upload & hapus
CREATE POLICY "Storage media: admin bisa upload"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'media' AND
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Storage media: admin bisa hapus"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'media' AND
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
  );


-- ============================================================
-- CATATAN: CARA MEMBUAT ADMIN PERTAMA
-- ============================================================
-- Setelah skema ini dijalankan:
--
-- 1. Buka Supabase Dashboard → Authentication → Users → "Add user"
-- 2. Isi email & password untuk akun admin Anda
-- 3. Salin UUID yang muncul di kolom "id"
-- 4. Jalankan query ini di SQL Editor (ganti nilai UUID & email):
--
-- INSERT INTO public.admin_users (id, email, nama, role)
-- VALUES (
--   'UUID-DARI-LANGKAH-3-DI-SINI',
--   'admin@bulansabitsumenep.id',
--   'Administrator',
--   'super_admin'
-- );
--
-- ============================================================
