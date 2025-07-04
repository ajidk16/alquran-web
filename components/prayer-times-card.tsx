"use client";

import { useEffect, useState } from "react";
import { Clock, MapPin, RefreshCw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuranStore } from "@/lib/store";
import { getPrayerTimes } from "@/lib/prayer-api";
import type { PrayerTimes } from "@/lib/types";

export function PrayerTimesCard() {
  const { settings, prayerTimes, setPrayerTimes } = useQuranStore();
  const [loading, setLoading] = useState(false);
  const [nextPrayer, setNextPrayer] = useState<{
    name: string;
    time: string;
  } | null>(null);

  const prayerNames = {
    imsak: "imsak",
    subuh: "subuh",
    terbit: "terbit",
    dhuha: "dhuha",
    dzuhur: "dzuhur",
    ashar: "ashar",
    maghrib: "maghrib",
    isya: "isya",
  };

  const loadPrayerTimes = async () => {
    setLoading(true);
    try {
      const times = await getPrayerTimes("1221");

      setPrayerTimes(times);
    } catch (error) {
      console.error("Failed to load prayer times:", error);
    } finally {
      setLoading(false);
    }
  };

  const findNextPrayer = (times: PrayerTimes) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const prayers = [
      { name: "Subuh", time: times.jadwal.subuh },
      { name: "Dzuhur", time: times.jadwal.dzuhur },
      { name: "Ashar", time: times.jadwal.ashar },
      { name: "Maghrib", time: times.jadwal.maghrib },
      { name: "Isya", time: times.jadwal.isya },
    ];

    for (const prayer of prayers) {
      const [hours, minutes] = prayer.time.split(":").map(Number);
      const prayerTime = hours * 60 + minutes;

      if (prayerTime > currentTime) {
        return prayer;
      }
    }

    // If no prayer found today, return tomorrow's Fajr
    return { name: "Subuh", time: times.jadwal.imsak };
  };

  useEffect(() => {
    if (!prayerTimes) {
      loadPrayerTimes();
    }
  }, []);

  useEffect(() => {
    if (prayerTimes) {
      setNextPrayer(findNextPrayer(prayerTimes));
    }
  }, [prayerTimes]);

  if (!prayerTimes) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Jadwal Sholat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Button onClick={loadPrayerTimes} disabled={loading}>
              {loading ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Clock className="mr-2 h-4 w-4" />
              )}
              {loading ? "Memuat..." : "Muat Jadwal Sholat"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Jadwal Sholat
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {settings.location.city}, {settings.location.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {nextPrayer && (
          <div className="p-4 bg-primary/10 rounded-lg">
            <div className="text-sm text-muted-foreground">
              Sholat Selanjutnya
            </div>
            <div className="text-lg font-semibold text-primary">
              {nextPrayer.name} - {nextPrayer.time}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-3">
          {Object.entries(prayerNames).map(([key, name]) => (
            <div
              key={key}
              className="flex items-center justify-between py-2 border-b last:border-b-0"
            >
              <span className="font-medium capitalize">{name}</span>
              <Badge variant="outline" className="font-mono">
                {prayerTimes.jadwal[key as keyof typeof prayerTimes.jadwal]}
              </Badge>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-muted-foreground">
            {prayerTimes.jadwal.tanggal}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={loadPrayerTimes}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
