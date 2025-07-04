import type { ApiResponse, Surah, SurahDetail, TafsirDetail } from "./types";

const BASE_URL = "https://equran.id/api/v2";

export async function getSurahs(): Promise<Surah[]> {
  try {
    const response = await fetch(`${BASE_URL}/surat`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch surahs");
    }

    const data: ApiResponse<Surah[]> = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching surahs:", error);
    throw error;
  }
}

export async function getSurahDetail(id: number): Promise<SurahDetail> {
  try {
    const response = await fetch(`${BASE_URL}/surat/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch surah ${id}`);
    }

    const data: ApiResponse<SurahDetail> = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching surah ${id}:`, error);
    throw error;
  }
}

export async function getTafsirDetail(id: number): Promise<TafsirDetail> {
  try {
    const response = await fetch(`${BASE_URL}/tafsir/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch surah ${id}`);
    }

    const data: ApiResponse<TafsirDetail> = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching surah ${id}:`, error);
    throw error;
  }
}
