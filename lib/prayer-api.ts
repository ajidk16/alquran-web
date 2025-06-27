import type { PrayerTimes } from "./types"

const PRAYER_API_BASE = "https://api.aladhan.com/v1"

export async function getPrayerTimes(city = "Jakarta", country = "Indonesia", method = 2): Promise<PrayerTimes> {
  try {
    const today = new Date().toISOString().split("T")[0]
    const response = await fetch(
      `${PRAYER_API_BASE}/timingsByCity/${today}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch prayer times")
    }

    const data = await response.json()

    return {
      date: data.data.date.readable,
      timings: {
        Fajr: data.data.timings.Fajr.split(" ")[0],
        Dhuhr: data.data.timings.Dhuhr.split(" ")[0],
        Asr: data.data.timings.Asr.split(" ")[0],
        Maghrib: data.data.timings.Maghrib.split(" ")[0],
        Isha: data.data.timings.Isha.split(" ")[0],
        Sunrise: data.data.timings.Sunrise.split(" ")[0],
        Sunset: data.data.timings.Sunset.split(" ")[0],
      },
      meta: {
        timezone: data.data.meta.timezone,
      },
    }
  } catch (error) {
    console.error("Error fetching prayer times:", error)
    throw error
  }
}
