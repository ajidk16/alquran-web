"use client"

import { useState } from "react"
import { Play, Pause, Bookmark, BookmarkCheck, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useQuranStore } from "@/lib/store"
import type { Ayat } from "@/lib/types"
import { TafsirSection } from "./tafsir-section"

interface AyatItemProps {
  ayat: Ayat
  surahNumber: number
  surahName: string
}

export function AyatItem({ ayat, surahNumber, surahName }: AyatItemProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const { toast } = useToast()
  const { addBookmark, removeBookmark, isBookmarked } = useQuranStore()

  const bookmarked = isBookmarked(surahNumber, ayat.nomorAyat)

  const handlePlayAudio = () => {
    if (ayat.audio && Object.keys(ayat.audio).length > 0) {
      const audioUrl = Object.values(ayat.audio)[0]

      if (audio) {
        if (isPlaying) {
          audio.pause()
          setIsPlaying(false)
        } else {
          audio.play()
          setIsPlaying(true)
        }
      } else {
        const newAudio = new Audio(audioUrl)
        newAudio.addEventListener("ended", () => setIsPlaying(false))
        newAudio.addEventListener("error", () => {
          toast({
            title: "Error",
            description: "Gagal memutar audio",
            variant: "destructive",
          })
          setIsPlaying(false)
        })
        newAudio.play()
        setAudio(newAudio)
        setIsPlaying(true)
      }
    }
  }

  const handleBookmark = () => {
    if (bookmarked) {
      removeBookmark(surahNumber, ayat.nomorAyat)
      toast({
        title: "Bookmark dihapus",
        description: `Ayat ${ayat.nomorAyat} telah dihapus dari bookmark`,
      })
    } else {
      addBookmark({
        surahNumber,
        surahName,
        verseNumber: ayat.nomorAyat,
        arabicText: ayat.teksArab,
        translation: ayat.teksIndonesia,
        timestamp: Date.now(),
      })
      toast({
        title: "Bookmark ditambahkan",
        description: `Ayat ${ayat.nomorAyat} telah ditambahkan ke bookmark`,
      })
    }
  }

  const handleCopy = () => {
    const text = `${ayat.teksArab}\n\n${ayat.teksIndonesia}\n\n(QS. ${surahName} : ${ayat.nomorAyat})`
    navigator.clipboard.writeText(text)
    toast({
      title: "Disalin",
      description: "Ayat telah disalin ke clipboard",
    })
  }

  return (
    <Card id={`ayat-${ayat.nomorAyat}`} className="animate-fade-in">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="verse-number">{ayat.nomorAyat}</div>
            <div className="flex items-center space-x-2">
              {ayat.audio && Object.keys(ayat.audio).length > 0 && (
                <Button variant="ghost" size="icon" onClick={handlePlayAudio} className="h-8 w-8">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={handleCopy} className="h-8 w-8">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleBookmark} className="h-8 w-8">
                {bookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="text-right">
            <p className="font-arabic text-2xl leading-relaxed mb-4">{ayat.teksArab}</p>
            <p className="text-sm text-muted-foreground italic mb-2">{ayat.teksLatin}</p>
            <p className="text-base leading-relaxed mb-4">{ayat.teksIndonesia}</p>

            {/* Add Tafsir Section */}
            <TafsirSection surahNumber={surahNumber} ayahNumber={ayat.nomorAyat} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
