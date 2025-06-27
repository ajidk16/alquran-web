import { Suspense } from "react"
import { getSurahs } from "@/lib/api"
import { SurahList } from "@/components/surah-list"
import { SurahListSkeleton } from "@/components/loading-skeleton"
import type { Metadata } from "next"
import { PrayerTimesCard } from "@/components/prayer-times-card"

export const metadata: Metadata = {
  title: "Al-Quran Digital - Daftar Surah",
  description: "Daftar lengkap 114 surah dalam Al-Quran dengan terjemahan bahasa Indonesia",
}

async function SurahListWrapper() {
  try {
    const surahs = await getSurahs()
    return <SurahList surahs={surahs} />
  } catch (error) {
    throw new Error("Gagal memuat daftar surah")
  }
}

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Al-Quran Digital</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Baca Al-Quran online dengan terjemahan bahasa Indonesia, fitur bookmark, dan audio murattal
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Suspense fallback={<SurahListSkeleton />}>
            <SurahListWrapper />
          </Suspense>
        </div>
        <div className="space-y-6">
          <PrayerTimesCard />
        </div>
      </div>
    </div>
  )
}
