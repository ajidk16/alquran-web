import type { DailyDua } from "./types"

export const dailyDuas: DailyDua[] = [
  // Morning Duas
  {
    id: "morning-1",
    title: "Doa Bangun Tidur",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: "Alhamdulillahil-ladzii ahyaanaa ba'da maa amaatanaa wa ilaihin-nusyuur",
    translation:
      "Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami dan kepada-Nya kami akan dibangkitkan.",
    category: "morning",
    reference: "HR. Bukhari",
  },
  {
    id: "morning-2",
    title: "Doa Pagi Hari",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    transliteration:
      "Ashbahnaa wa ashbahal-mulku lillaahi walhamdulillaahi laa ilaaha illallaahu wahdahu laa syariika lah",
    translation:
      "Kami telah memasuki waktu pagi dan kerajaan hanya milik Allah, segala puji bagi Allah. Tidak ada Tuhan selain Allah Yang Maha Esa, tidak ada sekutu bagi-Nya.",
    category: "morning",
    reference: "HR. Muslim",
  },

  // Evening Duas
  {
    id: "evening-1",
    title: "Doa Petang Hari",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    transliteration: "Amsainaa wa amsal-mulku lillaahi walhamdulillaahi laa ilaaha illallaahu wahdahu laa syariika lah",
    translation:
      "Kami telah memasuki waktu petang dan kerajaan hanya milik Allah, segala puji bagi Allah. Tidak ada Tuhan selain Allah Yang Maha Esa, tidak ada sekutu bagi-Nya.",
    category: "evening",
    reference: "HR. Muslim",
  },

  // Before Eating
  {
    id: "eating-1",
    title: "Doa Sebelum Makan",
    arabic: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
    transliteration: "Bismillaahi wa 'alaa barakatillaah",
    translation: "Dengan nama Allah dan atas berkah Allah.",
    category: "eating",
    reference: "HR. Abu Dawud",
  },
  {
    id: "eating-2",
    title: "Doa Sesudah Makan",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    transliteration: "Alhamdulillahil-ladzii ath'amanaa wa saqaanaa wa ja'alanaa muslimiin",
    translation:
      "Segala puji bagi Allah yang telah memberi kami makan dan minum serta menjadikan kami orang-orang muslim.",
    category: "eating",
    reference: "HR. Abu Dawud",
  },

  // Travel Duas
  {
    id: "travel-1",
    title: "Doa Bepergian",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
    transliteration:
      "Subhaanalladhii sakhkhara lanaa haadzaa wa maa kunnaa lahu muqriniin wa innaa ilaa rabbinaa lamunqalibuum",
    translation:
      "Maha Suci Allah yang telah menundukkan semua ini bagi kami padahal kami sebelumnya tidak mampu menguasainya, dan sesungguhnya kami akan kembali kepada Tuhan kami.",
    category: "travel",
    reference: "QS. Az-Zukhruf: 13-14",
  },

  // Sleep Duas
  {
    id: "sleep-1",
    title: "Doa Sebelum Tidur",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allaahumma amuutu wa ahyaa",
    translation: "Dengan nama-Mu ya Allah, aku mati dan aku hidup.",
    category: "sleep",
    reference: "HR. Bukhari",
  },
]

export const duaCategories = [
  { id: "morning", name: "Pagi Hari", icon: "☀️" },
  { id: "evening", name: "Petang Hari", icon: "🌅" },
  { id: "eating", name: "Makan & Minum", icon: "🍽️" },
  { id: "travel", name: "Bepergian", icon: "✈️" },
  { id: "sleep", name: "Tidur", icon: "🌙" },
]
