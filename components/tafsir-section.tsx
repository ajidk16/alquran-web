"use client";

import { useState, useEffect } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getTafsir } from "@/lib/tafsir-data";
import type { TafsirVerse } from "@/lib/types";

interface TafsirSectionProps {
  surahNumber: number;
  ayahNumber: number;
}

export function TafsirSection({ surahNumber, ayahNumber }: TafsirSectionProps) {
  const [tafsir, setTafsir] = useState<TafsirVerse | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadTafsir = async () => {
    setLoading(true);
    try {
      const tafsirData = await getTafsir(surahNumber, ayahNumber);
      setTafsir(tafsirData);
    } catch (error) {
      console.error("Failed to load tafsir:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !tafsir) {
      loadTafsir();
    }
  }, [isOpen, surahNumber, ayahNumber]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between p-0 h-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>Lihat Tafsir</span>
          </div>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Tafsir Ayat {ayahNumber}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            ) : tafsir ? (
              <div className="space-y-3">
                <p className="text-sm leading-relaxed text-justify">{tafsir.teks}</p>
                <div className="text-xs text-muted-foreground border-t pt-2">
                  <span className="font-medium">Sumber:</span> {tafsir.source}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Tafsir untuk ayat ini belum tersedia.
              </p>
            )}
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}
