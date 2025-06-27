import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getSurahDetail } from "@/lib/api"
import { AyatItem } from "@/components/ayat-item"
import { SurahDetailSkeleton } from "@/components/loading-skeleton"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"

interface SurahPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: SurahPageProps): Promise<Metadata> {
  try {
    const surahId = Number.parseInt(params.id)
    if (isNaN(surahId) || surahId < 1 || surahId > 114) {
      return {
        title: "Surah Tidak Ditemukan",
      }
    }

    const surah = await getSurahDetail(surahId)

    return {
      title: `Surah ${surah.namaLatin} (${surah.nama}) - Al-Quran Digital`,
      description: `Baca Surah ${surah.namaLatin} lengkap dengan ${surah.jumlahAyat} ayat, terjemahan bahasa Indonesia, dan audio murattal. ${surah.arti}`,
      keywords: `Surah ${surah.namaLatin}, ${surah.nama}, Al-Quran, ${surah.arti}`,
      openGraph: {
        title: `Surah ${surah.namaLatin} (${surah.nama})`,
        description: `${surah.arti} - ${surah.jumlahAyat} ayat, ${surah.tempatTurun}`,
      },
    }
  } catch {
    return {
      title: "Surah Tidak Ditemukan",
    }
  }
}

async function SurahDetailWrapper({ id }: { id: number }) {
  try {
    const surah = await getSurahDetail(id)

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold">{surah.namaLatin}</CardTitle>
              <div className="text-4xl font-arabic">{surah.nama}</div>
              <CardDescription className="text-lg">{surah.arti}</CardDescription>
            </div>
            <div className="flex items-center justify-center space-x-4 pt-4">
              <Badge variant="secondary" className="text-sm">
                {surah.jumlahAyat} Ayat
              </Badge>
              <Badge variant="outline" className="text-sm">
                {surah.tempatTurun}
              </Badge>
              <Badge variant="outline" className="text-sm">
                Surah ke-{surah.nomor}
              </Badge>
            </div>
          </CardHeader>
          {surah.deskripsi && (
            <CardContent>
              <div
                className="text-sm text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: surah.deskripsi }}
              />
            </CardContent>
          )}
        </Card>

        <div className="space-y-4">
          {surah.ayat.map((ayat) => (
            <AyatItem key={ayat.nomorAyat} ayat={ayat} surahNumber={surah.nomor} surahName={surah.namaLatin} />
          ))}
        </div>
      </div>
    )
  } catch (error) {
    throw new Error(`Gagal memuat Surah ${id}`)
  }
}

export default function SurahPage({ params }: SurahPageProps) {
  const surahId = Number.parseInt(params.id)

  if (isNaN(surahId) || surahId < 1 || surahId > 114) {
    notFound()
  }

  return (
    <Suspense fallback={<SurahDetailSkeleton />}>
      <SurahDetailWrapper id={surahId} />
    </Suspense>
  )
}
