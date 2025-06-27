"use client"

import Link from "next/link"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useQuranStore } from "@/lib/store"
import { ScrollArea } from "@/components/ui/scroll-area"

export function BookmarksList() {
  const { bookmarks, removeBookmark } = useQuranStore()

  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-muted-foreground">Belum ada ayat yang di-bookmark</p>
        <p className="text-sm text-muted-foreground mt-2">Klik ikon bookmark pada ayat untuk menyimpannya</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[400px] mt-4">
      <div className="space-y-4">
        {bookmarks.map((bookmark) => (
          <div key={`${bookmark.surahNumber}-${bookmark.verseNumber}`} className="border rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <Link
                href={`/surah/${bookmark.surahNumber}#ayat-${bookmark.verseNumber}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                {bookmark.surahName} - Ayat {bookmark.verseNumber}
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeBookmark(bookmark.surahNumber, bookmark.verseNumber)}
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-right font-arabic text-lg leading-relaxed">{bookmark.arabicText}</p>
            <p className="text-sm text-muted-foreground">{bookmark.translation}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
