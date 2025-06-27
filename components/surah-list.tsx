"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Surah } from "@/lib/types"
import { useQuranStore } from "@/lib/store"
import { useMemo } from "react"

interface SurahListProps {
  surahs: Surah[]
}

export function SurahList({ surahs }: SurahListProps) {
  const { searchQuery } = useQuranStore()

  const filteredSurahs = useMemo(() => {
    if (!searchQuery) return surahs

    return surahs.filter(
      (surah) =>
        surah.namaLatin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.nama.includes(searchQuery) ||
        surah.arti.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [surahs, searchQuery])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredSurahs.map((surah) => (
        <Link key={surah.nomor} href={`/surah/${surah.nomor}`}>
          <Card className="h-full transition-all hover:shadow-md hover:scale-[1.02] animate-fade-in">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-sm font-bold">{surah.nomor}</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{surah.namaLatin}</CardTitle>
                    <p className="text-sm text-muted-foreground">{surah.arti}</p>
                  </div>
                </div>
                <div className="text-right font-arabic text-xl">{surah.nama}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{surah.jumlahAyat} Ayat</Badge>
                <Badge variant="outline">{surah.tempatTurun}</Badge>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
