import { getTafsirDetail } from "./api";
import type { TafsirVerse } from "./types";

// Sample tafsir data - in real app, this would come from an API
export const getTafsir = async (
  surahNumber: number,
  ayahNumber: number
): Promise<TafsirVerse | null> => {
  const data = await getTafsirDetail(surahNumber);

  // This is sample data - replace with actual API call
  const sampleTafsir =
    data?.tafsir?.find((item) => item.ayat === ayahNumber) || null;

  // console.log("sample tafsir", sampleTafsir);

  return sampleTafsir;
};
