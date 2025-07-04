import type { PrayerTimes } from "./types";

export async function getLocation(kota: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MY_QURAN_URL}/sholat/kota/cari/${kota}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch prayer times");
    }

    let data = await response.json();
    if (!response.status || data.data.length === 0) {
      console.warn(`Lokasi tidak ditemukan`);
      return null;
    }

    return data.data[0];
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    throw error;
  }
}

export async function getPrayerTimes(kota: string): Promise<PrayerTimes> {
  try {
    const today = new Date().toISOString().split("T")[0];
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MY_QURAN_URL}/sholat/jadwal/${kota}/${today}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch prayer times");
    }

    const data = await response.json();

    return {
      id: data.data.id,
      lokasi: data.data.lokasi,
      daerah: data.data.daerah,
      jadwal: data.data.jadwal,
    };
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    throw error;
  }
}
