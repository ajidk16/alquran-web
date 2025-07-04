export interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull?: {
    [key: string]: string;
  };
}

export interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio?: {
    [key: string]: string;
  };
}

export interface SurahDetail extends Surah {
  ayat: Ayat[];
}

export interface Tafsir {
  ayat: number;
  teks: string;
}

export interface TafsirDetail extends Surah {
  tafsir: Tafsir[];
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface BookmarkedVerse {
  surahNumber: number;
  surahName: string;
  verseNumber: number;
  arabicText: string;
  translation: string;
  timestamp: number;
}

// Add new interfaces for the additional features

export type Jadwal = {
  tanggal: string;
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
  date: string;
};

export interface PrayerTimes {
  id: number;
  lokasi: string;
  daerah: string;
  jadwal: Jadwal;
}

export interface DailyDua {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  category: string;
  reference?: string;
}

export interface UserSettings {
  location: {
    city: string;
    country: string;
    latitude?: number;
    longitude?: number;
  };
  prayerMethod: number;
  notifications: {
    enabled: boolean;
    beforeMinutes: number;
  };
  fontSize: "small" | "medium" | "large";
  arabicFont: "amiri" | "uthmanic";
  showTafsir: boolean;
  tafsirLanguage: "id" | "en";
}

export interface TafsirVerse {
  ayat: number;
  teks: string;
  author?: string;
  source?: string;
}
