import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BookmarkedVerse, Jadwal, PrayerTimes } from "./types";

interface UserSettings {
  location: {
    id?: string;
    lokasi?: string;
    city?: string;
    state?: string;
    country?: string;
  };
  alarmSound: string;
  prayerMethod: number;
  notifications: {
    enabled: boolean;
    beforeMinutes: number;
  };
  fontSize: string;
  arabicFont: string;
  showTafsir: boolean;
  tafsirLanguage: string;
}

interface QuranStore {
  // Theme
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;

  // Bookmarks
  bookmarks: BookmarkedVerse[];
  addBookmark: (verse: BookmarkedVerse) => void;
  removeBookmark: (surahNumber: number, verseNumber: number) => void;
  isBookmarked: (surahNumber: number, verseNumber: number) => boolean;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Audio
  currentAudio: HTMLAudioElement | null;
  setCurrentAudio: (audio: HTMLAudioElement | null) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;

  // Settings
  settings: UserSettings;
  updateSettings: (settings: Partial<UserSettings>) => void;

  // Prayer Times
  prayerTimes: PrayerTimes | null;
  setPrayerTimes: (times: PrayerTimes) => void;

  // Daily Duas
  selectedDuaCategory: string;
  setSelectedDuaCategory: (category: string) => void;

  // Tafsir
  showTafsir: boolean;
  setShowTafsir: (show: boolean) => void;
}

export const useQuranStore = create<QuranStore>()(
  persist(
    (set, get) => ({
      // Theme
      theme: "light",
      setTheme: (theme) => set({ theme }),

      // Bookmarks
      bookmarks: [],
      addBookmark: (verse) => {
        const bookmarks = get().bookmarks;
        const exists = bookmarks.some(
          (b) =>
            b.surahNumber === verse.surahNumber &&
            b.verseNumber === verse.verseNumber
        );
        if (!exists) {
          set({ bookmarks: [...bookmarks, verse] });
        }
      },
      removeBookmark: (surahNumber, verseNumber) => {
        const bookmarks = get().bookmarks.filter(
          (b) =>
            !(b.surahNumber === surahNumber && b.verseNumber === verseNumber)
        );
        set({ bookmarks });
      },
      isBookmarked: (surahNumber, verseNumber) => {
        return get().bookmarks.some(
          (b) => b.surahNumber === surahNumber && b.verseNumber === verseNumber
        );
      },

      // Search
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),

      // Audio
      currentAudio: null,
      setCurrentAudio: (audio) => set({ currentAudio: audio }),
      isPlaying: false,
      setIsPlaying: (playing) => set({ isPlaying: playing }),

      // Settings
      settings: {
        location: {
          city: "",
          state: "",
          country: "Indonesia",
        },
        alarmSound: "adzan.mp3",
        prayerMethod: 2, // Islamic Society of North America
        notifications: {
          enabled: false,
          beforeMinutes: 10,
        },
        fontSize: "medium",
        arabicFont: "amiri",
        showTafsir: true,
        tafsirLanguage: "id",
      },
      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },

      // Prayer Times
      prayerTimes: null,
      setPrayerTimes: (times) => set({ prayerTimes: times }),

      // Daily Duas
      selectedDuaCategory: "morning",
      setSelectedDuaCategory: (category) =>
        set({ selectedDuaCategory: category }),

      // Tafsir
      showTafsir: true,
      setShowTafsir: (show) => set({ showTafsir: show }),
    }),
    {
      name: "quran-store",
      partialize: (state) => ({
        theme: state.theme,
        bookmarks: state.bookmarks,
        prayerTimes: state.prayerTimes,
        settings: state.settings,
        selectedDuaCategory: state.selectedDuaCategory,
        showTafsir: state.showTafsir,
      }),
    }
  )
);
