"use client";

import { useEffect, useState, useRef } from "react";
import { Clock, MapPin, RefreshCw, Volume2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuranStore } from "@/lib/store";
import LocationDirection from "./shared/Location";
import { Button } from "./ui/button";
import { getPrayerTimes } from "@/lib/prayer-api";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const subtractMinutes = (
  timeStr: string,
  minutesToSubtract: number
): string => {
  if (!timeStr || !timeStr.includes(":")) return "";
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  date.setMinutes(date.getMinutes() - minutesToSubtract);

  const newHours = String(date.getHours()).padStart(2, "0");
  const newMinutes = String(date.getMinutes()).padStart(2, "0");

  return `${newHours}:${newMinutes}`;
};

export function PrayerTimesCard() {
  const { settings, prayerTimes, setPrayerTimes, updateSettings } =
    useQuranStore();
  const [loading, setLoading] = useState(false);
  const [nextPrayer, setNextPrayer] = useState<{
    name: string;
    time: string;
  } | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playedAlarms, setPlayedAlarms] = useState<Set<string>>(new Set());

  const audioOptions = [
    { value: "adzan.mp3", label: "Adzan (Default)" },
    { value: "adzan_makkah.mp3", label: "Adzan Makkah" },
    { value: "notification_simple.mp3", label: "Notifikasi Singkat" },
    { value: "no_sound.mp3", label: "Tanpa Suara" },
  ];

  const prayerNames = {
    imsak: "Imsak",
    subuh: "Subuh",
    terbit: "Terbit",
    dhuha: "Dhuha",
    dzuhur: "Dzuhur",
    ashar: "Ashar",
    maghrib: "Maghrib",
    isya: "Isya",
  };

  useEffect(() => {
    const soundFile = settings.alarmSound || "adzan.mp3";
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(`/audio/${soundFile}`);
    audioRef.current.load();
  }, [settings.alarmSound]);

  const loadPrayerTimes = async () => {
    if (!settings.location.id) return;
    setLoading(true);

    audioRef.current?.play().catch(() => {});
    audioRef.current?.pause();

    try {
      const times = await getPrayerTimes(settings.location.id);
      setPrayerTimes(times);
      setPlayedAlarms(new Set());
    } catch (error) {
      console.error("Failed to load prayer times:", error);
    } finally {
      setLoading(false);
    }
  };

  const findNextPrayer = () => {
    if (!prayerTimes) return;
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    const prayerOrder = ["subuh", "dzuhur", "ashar", "maghrib", "isya"];
    for (const key of prayerOrder) {
      const prayer = {
        name: prayerNames[key as keyof typeof prayerNames],
        time: prayerTimes.jadwal[key as keyof typeof prayerTimes.jadwal],
      };
      if (prayer.time > currentTime) {
        setNextPrayer(prayer);
        return;
      }
    }
    setNextPrayer({ name: "Subuh", time: prayerTimes.jadwal.subuh });
  };

  useEffect(() => {
    if (!prayerTimes && settings.location.id) {
      loadPrayerTimes();
    }
  }, [settings.location.id]);

  useEffect(() => {
    if (!prayerTimes) return;
    findNextPrayer();
    const intervalId = setInterval(findNextPrayer, 60000);
    return () => clearInterval(intervalId);
  }, [prayerTimes]);

  useEffect(() => {
    if (!prayerTimes || settings.alarmSound === "no_sound.mp3") return;

    const checkAndPlayAlarm = () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;

      const prayerOrderForAlarm = [
        "subuh",
        "dzuhur",
        "ashar",
        "maghrib",
        "isya",
      ];

      for (const key of prayerOrderForAlarm) {
        const prayerName = prayerNames[key as keyof typeof prayerNames];
        const prayerTime =
          prayerTimes.jadwal[key as keyof typeof prayerTimes.jadwal];

        const alarmTime = subtractMinutes(prayerTime, 5);

        if (alarmTime === currentTime && !playedAlarms.has(prayerName)) {
          audioRef.current
            ?.play()
            .catch((e) => console.error("Gagal memutar audio:", e));
          setPlayedAlarms((prev) => new Set(prev).add(prayerName));
          break;
        }
      }
    };

    const alarmIntervalId = setInterval(checkAndPlayAlarm, 30000);

    return () => clearInterval(alarmIntervalId);
  }, [prayerTimes, playedAlarms, settings.alarmSound]);

  const handleAudioChange = (newValue: string) => {
    updateSettings({ alarmSound: newValue });
  };

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
            <LocationDirection />
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
          {settings.location.city},{" "}
          {settings.location.country?.toLocaleUpperCase()}
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

        <div className="space-y-2 pt-4 border-t">
          <Label
            htmlFor="alarm-sound"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Volume2 className="h-4 w-4" />
            Suara Alarm (5 Menit Sebelum)
          </Label>
          <Select
            value={settings.alarmSound || "adzan.mp3"}
            onValueChange={handleAudioChange}
          >
            <SelectTrigger id="alarm-sound" className="w-full">
              <SelectValue placeholder="Pilih suara alarm..." />
            </SelectTrigger>
            <SelectContent>
              {audioOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
